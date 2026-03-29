import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import MessageBubble from "./molecules/MessageBubble";
import DateSeparator from "./molecules/DateSeparator";
import TypingIndicator from "./molecules/TypingIndicator";
import { useAuthStore } from "../store/useAuthStore";
import { formatDateSeparator, isSameDay } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    typingUsers,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 200);
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const isTyping = typingUsers[selectedUser._id];

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto" style={{ background: "rgba(6, 11, 24, 0.9)" }}>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative" style={{ background: "rgba(6, 11, 24, 0.9)" }}>
      <ChatHeader />

      {/* Messages Area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-1"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(99, 102, 241, 0.08)",
                border: "1px solid rgba(99, 102, 241, 0.15)",
              }}
            >
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-slate-600 text-sm font-medium">
              No messages yet. Say hi to {selectedUser.fullName}!
            </p>
          </div>
        ) : (
          messages.map((message, index) => {
            const prevMessage = messages[index - 1];
            const showDateSeparator =
              !prevMessage || !isSameDay(prevMessage.createdAt, message.createdAt);
            const isSender = message.senderId === authUser._id;

            return (
              <div key={message._id}>
                {showDateSeparator && (
                  <DateSeparator date={formatDateSeparator(message.createdAt)} />
                )}
                <MessageBubble
                  message={message}
                  isSender={isSender}
                  avatarSrc={
                    isSender
                      ? authUser.profilePic || authUser.profilePicture
                      : selectedUser.profilePic || selectedUser.profilePicture
                  }
                />
              </div>
            );
          })
        )}

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && <TypingIndicator userName={selectedUser.fullName} />}
        </AnimatePresence>

        <div ref={messageEndRef} />
      </div>

      {/* Scroll to Bottom Button */}
      <AnimatePresence>
        {showScrollBtn && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToBottom}
            className="absolute bottom-24 right-6 w-9 h-9 rounded-full flex items-center justify-center shadow-xl transition-all"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
            }}
          >
            <ChevronDown className="w-4 h-4 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;