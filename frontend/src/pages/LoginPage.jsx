import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-base-100">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5">
        <div className="w-full max-w-md space-y-8 bg-base-100 p-8 rounded-2xl shadow-xl border border-primary/10 backdrop-blur-sm">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-all duration-300 transform group-hover:rotate-12 shadow-inner"
              >
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-extrabold mt-4 tracking-tight">Welcome Back</h1>
              <p className="text-base-content/60">Ready to start chatting again?</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email ADDRESS</span>
              </label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within/input:text-primary">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10 bg-base-200/50 focus:bg-base-100 transition-all duration-200 focus:ring-2 focus:ring-primary/20`}
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within/input:text-primary">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 bg-base-200/50 focus:bg-base-100 transition-all duration-200 focus:ring-2 focus:ring-primary/20`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/40 hover:text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full h-12 shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all" 
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center pt-4 border-t border-base-200">
            <p className="text-base-content/60">
              New to our platform?{" "}
              <Link to="/signup" className="link link-primary font-semibold no-underline hover:underline decoration-2 underline-offset-4">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Connect with the world"}
        subtitle={"Join thousands of users sharing messages, ideas, and laughter in real-time."}
      />
    </div>
  );
};
export default LoginPage;