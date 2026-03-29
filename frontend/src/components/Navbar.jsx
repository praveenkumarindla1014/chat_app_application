import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Menu } from "lucide-react";
import { useUIStore } from "../store/useUIStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { isMobile, toggleSidebar } = useUIStore();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar-premium fixed w-full top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {authUser && isMobile && (
            <button
              onClick={toggleSidebar}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/8"
            >
              <Menu className="w-5 h-5 text-slate-300" />
            </button>
          )}

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white">
              Chatty
            </span>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1.5">
          <Link
            to="/settings"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200
              ${isActive("/settings")
                ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/25"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/6"
              }`}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link
                to="/profile"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive("/profile")
                    ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/6"
                  }`}
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-rose-400/80 hover:text-rose-300 hover:bg-rose-500/10 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;