import { motion, AnimatePresence } from "framer-motion";

/** Animated badge for unread message count */
const Badge = ({ count = 0, className = "" }) => {
  if (count <= 0) return null;

  return (
    <AnimatePresence>
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className={`
          inline-flex items-center justify-center
          min-w-[1.25rem] h-5 px-1.5 
          text-[11px] font-bold leading-none
          bg-primary text-primary-content 
          rounded-full shadow-lg shadow-primary/30
          ${className}
        `}
      >
        {count > 99 ? "99+" : count}
      </motion.span>
    </AnimatePresence>
  );
};

export default Badge;
