import { messageService } from "../services/message.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getUserForSidebar = asyncHandler(async (req, res) => {
  const users = await messageService.getUsersForSidebar(req.user._id);
  res.status(200).json(users);
});

export const getMessages = asyncHandler(async (req, res) => {
  const { id: userToChatId } = req.params;
  const { page = 1, limit = 50 } = req.query;

  const result = await messageService.getMessages(req.user._id, userToChatId, {
    page: parseInt(page),
    limit: parseInt(limit),
  });

  res.status(200).json(result);
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { id: receiverId } = req.params;
  const newMessage = await messageService.sendMessage(
    req.user._id,
    receiverId,
    req.body
  );
  res.status(201).json(newMessage);
});
