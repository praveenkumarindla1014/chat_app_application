import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, Zap } from "lucide-react";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen auth-bg flex">
      {/* ── Animated background blobs ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="blob-1 absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[100px]" />
        <div className="blob-2 absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-violet-600/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-600/5 blur-[80px]" />
      </div>

      {/* ── Left: Form ── */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 sm:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 1.02, 0.73, 1] }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <motion.div
              whileHover={{ rotate: 8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/30 mb-5"
            >
              <MessageSquare className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
              Welcome back
            </h1>
            <p className="text-slate-400 font-medium text-sm">
              Sign in to continue chatting
            </p>
          </div>

          {/* Card */}
          <div className="glass-card p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4.5 w-4.5 text-indigo-400/60" style={{ width: '1.125rem', height: '1.125rem' }} />
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    className="input-premium"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="text-indigo-400/60" style={{ width: '1.125rem', height: '1.125rem' }} />
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    className="input-premium pr-12"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-indigo-400 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff style={{ width: '1.125rem', height: '1.125rem' }} /> : <Eye style={{ width: '1.125rem', height: '1.125rem' }} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                id="login-submit"
                className="btn-premium mt-2"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </motion.button>
            </form>

            <div className="pt-4 border-t border-white/5 text-center">
              <p className="text-slate-500 text-sm">
                New to Chatty?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors underline-offset-4 hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Right: Visual Panel ── */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 relative overflow-hidden px-12">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-violet-900/20" />
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-center max-w-sm"
        >
          <div className="grid grid-cols-3 gap-3 mb-10">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.06, type: "spring", stiffness: 200 }}
                className={`aspect-square rounded-2xl border border-indigo-500/15 flex items-center justify-center
                  ${i % 3 === 0 ? "bg-indigo-500/10" : i % 3 === 1 ? "bg-violet-500/8" : "bg-blue-500/8"}
                  ${i % 2 === 0 ? "animate-pulse" : ""}
                `}
                style={{ animationDelay: `${i * 0.3}s`, animationDuration: `${2 + (i % 3)}s` }}
              />
            ))}
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
            Connect with the world
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Join thousands of people sharing ideas, laughter, and real moments in real-time.
          </p>

          <div className="mt-8 flex items-center justify-center gap-6">
            {["⚡ Real-time", "🔒 Secure", "🎨 Beautiful"].map((feature) => (
              <span key={feature} className="text-xs font-semibold text-slate-500 px-3 py-1.5 rounded-full bg-white/5 border border-white/8">
                {feature}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;