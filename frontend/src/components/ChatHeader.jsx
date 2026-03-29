import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, typingUsers } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);
  const isTyping = typingUsers[selectedUser._id];

  const avatarGrad = `linear-gradient(135deg, hsl(${(selectedUser.fullName.charCodeAt(0) * 7) % 360}, 70%, 45%), hsl(${(selectedUser.fullName.charCodeAt(0) * 13) % 360}, 60%, 35%))`;

  return (
    <div
      className="px-4 py-3 sticky top-0 z-10 flex items-center justify-between"
      style={{
        background: "rgba(8, 13, 26, 0.95)",
        borderBottom: "1px solid rgba(99, 102, 241, 0.12)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
            style={{ background: avatarGrad }}
          >
            {selectedUser.profilePic || selectedUser.profilePicture ? (
              <img
                src={selectedUser.profilePic || selectedUser.profilePicture}
                alt={selectedUser.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              selectedUser.fullName.charAt(0).toUpperCase()
            )}
          </div>
          {isOnline && (
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2"
              style={{ borderColor: "rgba(8, 13, 26, 0.95)" }}
            />
          )}
        </div>

        <div className="text-left">
          <h3 className="font-bold text-sm text-slate-100 leading-tight">
            {selectedUser.fullName}
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            {isTyping ? (
              <span className="text-xs text-indigo-400 font-medium italic flex items-center gap-1.5">
                <span className="flex gap-0.5">
                  <span className="w-1 h-1 bg-indigo-400 rounded-full typing-dot" />
                  <span className="w-1 h-1 bg-indigo-400 rounded-full typing-dot" />
                  <span className="w-1 h-1 bg-indigo-400 rounded-full typing-dot" />
                </span>
                typing...
              </span>
            ) : (
              <span className={`text-xs font-medium flex items-center gap-1 ${isOnline ? "text-emerald-400" : "text-slate-600"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-emerald-400 online-glow" : "bg-slate-700"}`} />
                {isOnline ? "Online" : "Offline"}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => setSelectedUser(null)}
        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-rose-500/15 text-slate-500 hover:text-rose-400"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ChatHeader;