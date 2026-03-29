import Message from "../models/message.model.js";

export const messageRepository = {
  create: (data) => new Message(data).save(),

  findConversation: (userId1, userId2, { page = 1, limit = 50 } = {}) =>
    Message.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),

  countConversation: (userId1, userId2) =>
    Message.countDocuments({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    }),

  markAsRead: (senderId, receiverId) =>
    Message.updateMany(
      { senderId, receiverId, status: { $ne: "read" } },
      { $set: { status: "read" }, $addToSet: { readBy: receiverId } }
    ),
};
