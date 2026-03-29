import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-300">
      <div className="border-b border-base-300 w-full p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-primary">
          <Users className="size-6 shrink-0" />
          <span className="font-bold text-lg hidden lg:block tracking-tight text-base-content">Contacts</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2 group">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-xs checkbox-primary"
            />
            <span className="text-sm font-medium text-base-content/70 group-hover:text-base-content transition-colors">Only show online</span>
          </label>
          <span className="text-xs text-zinc-500 font-medium badge badge-sm">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-4 flex items-center gap-4
              hover:bg-base-200 transition-all duration-200 group
              ${selectedUser?._id === user._id ? "bg-base-200/80 border-r-4 border-primary" : "border-r-4 border-transparent"}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-2xl shadow-sm group-hover:scale-105 transition-transform duration-200"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3.5 bg-green-500 
                  rounded-full ring-2 ring-base-100"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-bold truncate text-base-content/90">{user.fullName}</div>
              <div className="text-sm text-base-content/50 font-medium">
                {onlineUsers.includes(user._id) ? (
                  <span className="text-success flex items-center gap-1">
                    <span className="size-1.5 bg-success rounded-full animate-pulse" />
                    Online
                  </span>
                ) : (
                  "Offline"
                )}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-8 flex flex-col items-center gap-2">
            <Users className="size-10 opacity-20" />
            <p className="font-medium">No online users</p>
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;