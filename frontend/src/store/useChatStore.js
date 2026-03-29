import { create } from "zustand";
import toast from "react-hot-toast";
import { messageApi } from "../api/message.api";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // Typing indicators
  typingUsers: {},

  // Pagination
  hasMoreMessages: true,
  currentPage: 1,

  // Unread counts
  unreadCounts: {},

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const { data } = await messageApi.getUsers();
      set({ users: data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId, page = 1) => {
    set({ isMessagesLoading: page === 1 });
    try {
      const { data } = await messageApi.getMessages(userId, {
        page,
        limit: 50,
      });

      const msgs = data.messages || data;
      const hasMore = data.hasMore ?? false;

      set((state) => ({
        messages: page === 1 ? msgs : [...msgs, ...state.messages],
        hasMoreMessages: hasMore,
        currentPage: page,
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  loadMoreMessages: async () => {
    const { selectedUser, currentPage, hasMoreMessages, isMessagesLoading } =
      get();
    if (!hasMoreMessages || !selectedUser || isMessagesLoading) return;
    await get().getMessages(selectedUser._id, currentPage + 1);
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const { data } = await messageApi.sendMessage(
        selectedUser._id,
        messageData
      );
      set({ messages: [...messages, data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) {
        // Increment unread count for other users
        set((state) => ({
          unreadCounts: {
            ...state.unreadCounts,
            [newMessage.senderId]:
              (state.unreadCounts[newMessage.senderId] || 0) + 1,
          },
        }));
        return;
      }
      set({ messages: [...get().messages, newMessage] });
    });

    // Typing indicators
    socket.on("userTyping", ({ senderId }) => {
      if (senderId === selectedUser._id) {
        set((state) => ({
          typingUsers: { ...state.typingUsers, [senderId]: true },
        }));
      }
    });

    socket.on("userStoppedTyping", ({ senderId }) => {
      set((state) => {
        const updated = { ...state.typingUsers };
        delete updated[senderId];
        return { typingUsers: updated };
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
    socket.off("userTyping");
    socket.off("userStoppedTyping");
  },

  setSelectedUser: (selectedUser) => {
    set((state) => {
      const updatedCounts = { ...state.unreadCounts };
      if (selectedUser?._id) {
        delete updatedCounts[selectedUser._id];
      }
      return {
        selectedUser,
        messages: [],
        hasMoreMessages: true,
        currentPage: 1,
        typingUsers: {},
        unreadCounts: updatedCounts,
      };
    });
  },
}));