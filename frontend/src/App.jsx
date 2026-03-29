import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useUIStore } from "./store/useUIStore";
import { useMediaQuery } from "./hooks/useMediaQuery";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

const FullPageSpinner = () => (
  <div
    className="flex items-center justify-center h-screen"
    style={{ background: "#0a0f1e" }}
  >
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/30 animate-pulse">
        <Loader className="w-7 h-7 text-white animate-spin" />
      </div>
      <p className="text-slate-500 text-sm font-medium">Loading Chatty...</p>
    </div>
  </div>
);

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  const { setMobile } = useUIStore();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile, setMobile]);

  if (isCheckingAuth && !authUser) {
    return <FullPageSpinner />;
  }

  return (
    <div data-theme={theme} className="min-h-screen" style={{ background: "#0a0f1e", color: "#e2e8f0" }}>
      <Navbar />

      <AnimatePresence mode="wait">
        <Suspense fallback={<FullPageSpinner />}>
          <motion.main
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Routes>
              <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
              <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
              <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
            </Routes>
          </motion.main>
        </Suspense>
      </AnimatePresence>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            background: "rgba(13, 21, 38, 0.95)",
            color: "#e2e8f0",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            borderRadius: "0.875rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          },
          success: {
            iconTheme: { primary: "#10b981", secondary: "#0a0f1e" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#0a0f1e" },
          },
        }}
      />
    </div>
  );
};

export default App;