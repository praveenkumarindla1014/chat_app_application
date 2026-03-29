import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useTypingIndicator } from "../hooks/useTypingIndicator";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const { sendMessage, selectedUser } = useChatStore();
  const { startTyping, stopTyping } = useTypingIndicator(selectedUser?._id);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      stopTyping();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
    startTyping();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const hasContent = text.trim() || imagePreview;

  return (
    <div
      className="p-3 sm:p-4"
      style={{
        borderTop: "1px solid rgba(99, 102, 241, 0.12)",
        background: "rgba(8, 13, 26, 0.95)",
      }}
    >
      {/* Image Preview */}
      <AnimatePresence>
        {imagePreview && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-3 flex items-center gap-3"
          >
            <div className="relative group">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-xl"
                style={{ border: "2px solid rgba(99, 102, 241, 0.3)" }}
              />
              <button
                onClick={removeImage}
                type="button"
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <span className="text-xs text-slate-600 font-medium">Ready to send</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Row */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        {/* Main input container */}
        <div
          className="flex-1 flex items-center gap-1 rounded-2xl px-2 py-1.5 transition-all"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(99, 102, 241, 0.15)",
          }}
          onFocus={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "rgba(99, 102, 241, 0.45)";
            el.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
          }}
          onBlur={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "rgba(99, 102, 241, 0.15)";
            el.style.boxShadow = "none";
          }}
        >
          {/* Image upload button */}
          <button
            type="button"
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
            style={{ color: imagePreview ? "#6366f1" : "#475569" }}
            onClick={() => fileInputRef.current?.click()}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#6366f1"; e.currentTarget.style.background = "rgba(99,102,241,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = imagePreview ? "#6366f1" : "#475569"; e.currentTarget.style.background = "transparent"; }}
          >
            <Image className="w-4.5 h-4.5" style={{ width: "1.125rem", height: "1.125rem" }} />
          </button>

          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none ring-0 text-sm"
            style={{ color: "#e2e8f0" }}
            placeholder="Type a message..."
            value={text}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>

        {/* Send button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={!hasContent}
          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all"
          style={{
            background: hasContent
              ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
              : "rgba(255,255,255,0.05)",
            color: hasContent ? "white" : "#374151",
            boxShadow: hasContent ? "0 4px 15px rgba(99, 102, 241, 0.35)" : "none",
            cursor: hasContent ? "pointer" : "not-allowed",
          }}
        >
          <Send className="w-4 h-4 ml-0.5" />
        </motion.button>
      </form>
    </div>
  );
};

export default MessageInput;