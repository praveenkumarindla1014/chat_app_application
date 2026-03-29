import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const NoChatSelected = () => {
  return (
    <div
      className="w-full flex flex-1 flex-col items-center justify-center p-16"
      style={{ background: "rgba(6, 11, 24, 0.8)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md text-center space-y-6"
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
              className="w-24 h-24 rounded-3xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))",
                border: "1px solid rgba(99,102,241,0.2)",
                boxShadow: "0 0 40px rgba(99,102,241,0.15)",
              }}
            >
              <MessageSquare className="w-12 h-12 text-indigo-400" />
            </motion.div>
            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full -z-10" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Welcome to{" "}
            <span
              className="gradient-text"
              style={{
                background: "linear-gradient(135deg, #6366f1, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Chatty!
            </span>
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed text-sm">
            Stay connected with your friends and family in real-time.
            <br />
            Select a contact from the sidebar to start chatting.
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {[
            { icon: "⚡", label: "Real-time" },
            { icon: "🖼️", label: "Image sharing" },
            { icon: "🟢", label: "Online status" },
            { icon: "🔒", label: "Secure" },
          ].map(({ icon, label }) => (
            <span
              key={label}
              className="text-xs font-medium px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(99,102,241,0.15)",
                color: "#64748b",
              }}
            >
              {icon} {label}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default NoChatSelected;