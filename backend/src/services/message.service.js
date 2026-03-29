import { messageRepository } from "../repositories/message.repository.js";
import { userRepository } from "../repositories/user.repository.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const messageService = {
  async getUsersForSidebar(loggedInUserId) {
    return userRepository.getAllExcept(loggedInUserId);
  },

  async getMessages(userId1, userId2, { page = 1, limit = 50 } = {}) {
    const [messages, total] = await Promise.all([
      messageRepository.findConversation(userId1, userId2, { page, limit }),
      messageRepository.countConversation(userId1, userId2),
    ]);

    // Mark messages from the other user as read
    await messageRepository.markAsRead(userId2, userId1);

    return {
      messages: messages.reverse(), // Oldest first for display
      total,
      page,
      hasMore: page * limit < total,
    };
  },

  async sendMessage(senderId, receiverId, { text, image }) {
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await messageRepository.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // Real-time delivery via Socket.io
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return newMessage;
  },
};
