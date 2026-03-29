import { useState, useCallback, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";

/**
 * Manages typing indicator — emits typing/stopTyping socket events
 * with automatic timeout after 2 seconds of inactivity.
 */
export function useTypingIndicator(receiverId) {
  const socket = useAuthStore((s) => s.socket);
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef(null);

  const startTyping = useCallback(() => {
    if (!isTyping && socket) {
      setIsTyping(true);
      socket.emit("typing", { receiverId });
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket?.emit("stopTyping", { receiverId });
    }, 2000);
  }, [socket, receiverId, isTyping]);

  const stopTyping = useCallback(() => {
    clearTimeout(timeoutRef.current);
    if (isTyping && socket) {
      setIsTyping(false);
      socket.emit("stopTyping", { receiverId });
    }
  }, [socket, receiverId, isTyping]);

  return { startTyping, stopTyping, isTyping };
}
