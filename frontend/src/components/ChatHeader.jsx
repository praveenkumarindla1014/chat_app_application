import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-4 border-b border-base-300 bg-base-100/50 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-2xl relative shadow-sm border border-base-300">
              <img 
                src={selectedUser.profilePic || selectedUser.profilePicture || "/avatar.png"} 
                alt={selectedUser.fullName}
                className="object-cover"
              />
            </div>
          </div>

          {/* User info */}
          <div className="text-left">
            <h3 className="font-bold text-base-content/90 leading-tight">{selectedUser.fullName}</h3>
            <div className="flex items-center gap-1.5">
              <span className={`size-2 rounded-full ${onlineUsers.includes(selectedUser._id) ? "bg-success animate-pulse" : "bg-base-content/20"}`} />
              <p className="text-sm text-base-content/50 font-medium">
                {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="btn btn-sm btn-ghost btn-circle hover:bg-error/10 hover:text-error transition-all"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;