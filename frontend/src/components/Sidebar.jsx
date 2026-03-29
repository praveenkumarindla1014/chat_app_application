import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useUIStore } from "../store/useUIStore";
import { useDebounce } from "../hooks/useDebounce";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import Avatar from "./atoms/Avatar";
import Badge from "./atoms/Badge";
import SearchBar from "./molecules/SearchBar";
import { Users, UserCheck, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
    unreadCounts,
  } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { isMobile, isSidebarOpen, setSidebarOpen, searchQuery, setSearchQuery } = useUIStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.fullName.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesOnline = showOnlineOnly ? onlineUsers.includes(user._id) : true;
    return matchesSearch && matchesOnline;
  });

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    if (isMobile) setSidebarOpen(false);
  };

  if (isUsersLoading) return <SidebarSkeleton />;
  if (isMobile && !isSidebarOpen) return null;

  const onlineCount = Math.max(0, (onlineUsers.length || 1) - 1);

  return (
    <>
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <motion.aside
        initial={isMobile ? { x: -320 } : false}
        animate={{ x: 0 }}
        exit={{ x: -320 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`
          h-full flex flex-col
          ${isMobile ? "fixed left-0 top-0 w-80 z-40 pt-16 shadow-2xl" : "w-20 lg:w-80"}
        `}
        style={{
          background: "rgba(8, 13, 26, 0.95)",
          borderRight: "1px solid rgba(99, 102, 241, 0.12)",
        }}
      >
        {/* Header */}
        <div className="p-4 space-y-3" style={{ borderBottom: "1px solid rgba(99, 102, 241, 0.1)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/15 flex items-center justify-center">
                <Users className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="font-bold text-sm hidden lg:block text-slate-200 tracking-tight">
                Contacts
              </span>
            </div>
            <span className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {onlineCount} online
            </span>
          </div>

          {/* Search */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-indigo-400/50" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search contacts..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(99,102,241,0.15)",
                  color: "#e2e8f0",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(99,102,241,0.45)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(99,102,241,0.15)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Online filter */}
          <div className="hidden lg:flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2 group">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="checkbox checkbox-xs checkbox-primary"
              />
              <span className="text-xs font-medium text-slate-500 group-hover:text-slate-300 transition-colors flex items-center gap-1">
                <UserCheck className="w-3 h-3" />
                Online only
              </span>
            </label>
          </div>
        </div>

        {/* User List */}
        <div className="overflow-y-auto flex-1 py-1">
          <AnimatePresence>
            {filteredUsers.map((user, idx) => {
              const isOnline = onlineUsers.includes(user._id);
              const isSelected = selectedUser?._id === user._id;

              return (
                <motion.button
                  key={user._id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={() => handleSelectUser(user)}
                  className="w-full p-3 flex items-center gap-3 transition-all duration-200 group relative"
                  style={{
                    background: isSelected
                      ? "rgba(99, 102, 241, 0.12)"
                      : "transparent",
                    borderRight: isSelected
                      ? "3px solid #6366f1"
                      : "3px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center font-bold text-sm text-white"
                      style={{
                        background: `linear-gradient(135deg, hsl(${(user.fullName.charCodeAt(0) * 7) % 360}, 70%, 45%), hsl(${(user.fullName.charCodeAt(0) * 13) % 360}, 60%, 35%))`,
                      }}
                    >
                      {user.profilePic || user.profilePicture ? (
                        <img
                          src={user.profilePic || user.profilePicture}
                          alt={user.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        user.fullName.charAt(0).toUpperCase()
                      )}
                    </div>
                    {isOnline && (
                      <span
                        className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 bg-emerald-400"
                        style={{ borderColor: "rgba(8, 13, 26, 0.95)" }}
                      />
                    )}
                  </div>

                  <div className="hidden lg:block text-left min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm truncate text-slate-100">
                        {user.fullName}
                      </span>
                      <Badge count={unreadCounts[user._id] || 0} />
                    </div>
                    <div className="text-xs font-medium mt-0.5">
                      {isOnline ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-emerald-400" />
                          Online
                        </span>
                      ) : (
                        <span className="text-slate-600">Offline</span>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12 flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                <Users className="w-7 h-7 text-indigo-400/40" />
              </div>
              <p className="text-sm font-medium text-slate-600">
                {searchQuery ? "No matching contacts" : "No users found"}
              </p>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;