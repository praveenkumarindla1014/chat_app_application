import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen auth-bg flex">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="blob-1 absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[100px]" />
        <div className="blob-2 absolute bottom-[-10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>

      {/* Left visual panel */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 relative overflow-hidden px-12">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-indigo-900/20" />
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-center max-w-sm"
        >
          <div className="mb-10 relative">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-violet-500/30 mb-6">
              <UserPlus className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-400/40">
              <span className="text-xs font-bold text-emerald-900">✓</span>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
            Join our community
          </h2>
          <p className="text-slate-400 leading-relaxed mb-8">
            Connect with friends, share moments, and stay in touch with your loved ones.
          </p>

          <div className="space-y-3">
            {[
              { icon: "🚀", label: "Free forever" },
              { icon: "🔒", label: "End-to-end secure" },
              { icon: "⚡", label: "Real-time messaging" },
              { icon: "🌐", label: "Available everywhere" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-left px-4 py-2.5 rounded-xl bg-white/4 border border-white/6">
                <span className="text-lg">{icon}</span>
                <span className="text-sm font-medium text-slate-300">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right: Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 sm:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 1.02, 0.73, 1] }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              whileHover={{ rotate: 8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/30 mb-4"
            >
              <MessageSquare className="w-7 h-7 text-white" />
            </motion.div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1.5">
              Create your account
            </h1>
            <p className="text-slate-400 font-medium text-sm">
              Get started for free today
            </p>
          </div>

          {/* Card */}
          <div className="glass-card p-8 space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User style={{ width: '1.125rem', height: '1.125rem' }} className="text-indigo-400/60" />
                  </div>
                  <input
                    id="signup-name"
                    type="text"
                    className="input-premium"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail style={{ width: '1.125rem', height: '1.125rem' }} className="text-indigo-400/60" />
                  </div>
                  <input
                    id="signup-email"
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
                    <Lock style={{ width: '1.125rem', height: '1.125rem' }} className="text-indigo-400/60" />
                  </div>
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    className="input-premium pr-12"
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-indigo-400 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword
                      ? <EyeOff style={{ width: '1.125rem', height: '1.125rem' }} />
                      : <Eye style={{ width: '1.125rem', height: '1.125rem' }} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                id="signup-submit"
                className="btn-premium mt-2"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </>
                )}
              </motion.button>
            </form>

            <div className="pt-4 border-t border-white/5 text-center">
              <p className="text-slate-500 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors underline-offset-4 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;