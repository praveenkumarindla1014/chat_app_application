import { motion } from "framer-motion";

/** Animated typing indicator — 3 bouncing dots */
const TypingIndicator = ({ userName = "Someone" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="flex items-center gap-2 px-4 py-2"
    >
      <div className="bg-base-200 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2 border border-base-300">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-primary rounded-full typing-dot" />
          <span className="w-2 h-2 bg-primary rounded-full typing-dot" />
          <span className="w-2 h-2 bg-primary rounded-full typing-dot" />
        </div>
        <span className="text-xs text-base-content/50 font-medium italic ml-1">
          {userName} is typing...
        </span>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
