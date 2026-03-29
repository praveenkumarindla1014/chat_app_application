import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Shield, ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilepic: base64Image });
    };
  };

  const avatarSrc = selectedImg || authUser.profilePic || authUser.profilePicture;
  const initials = authUser.fullName?.charAt(0).toUpperCase() || "?";
  const avatarGrad = `linear-gradient(135deg, hsl(${(authUser.fullName?.charCodeAt(0) * 7) % 360}, 70%, 40%), hsl(${(authUser.fullName?.charCodeAt(0) * 13) % 360}, 60%, 30%))`;

  return (
    <div className="min-h-screen pt-20 pb-12 px-4" style={{ background: "#060b18" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-lg mx-auto space-y-6"
      >
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to chats
        </Link>

        {/* Header */}
        <div className="text-center space-y-1.5">
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Your Profile
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Manage your account and personal details
          </p>
        </div>

        {/* Main Card */}
        <div
          className="p-8 rounded-2xl"
          style={{
            background: "rgba(13, 21, 38, 0.8)",
            border: "1px solid rgba(99, 102, 241, 0.15)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          }}
        >
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="relative group">
              <div
                className="w-28 h-28 rounded-full overflow-hidden flex items-center justify-center font-bold text-3xl text-white shadow-xl"
                style={{
                  background: avatarSrc ? undefined : avatarGrad,
                  boxShadow: "0 0 40px rgba(99, 102, 241, 0.2)",
                }}
              >
                {avatarSrc ? (
                  <img src={avatarSrc} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  initials
                )}
              </div>

              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-full opacity-30 blur-xl -z-10"
                style={{ background: "rgba(99, 102, 241, 0.4)" }}
              />

              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-1 right-1 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all
                  ${isUpdatingProfile ? "animate-pulse opacity-50 pointer-events-none" : "hover:scale-110 active:scale-95"}
                `}
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 4px 12px rgba(99, 102, 241, 0.5)",
                }}
              >
                {isUpdatingProfile
                  ? <Loader2 className="w-4 h-4 text-white animate-spin" />
                  : <Camera className="w-4 h-4 text-white" />
                }
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              {isUpdatingProfile ? "Uploading photo..." : "Click the camera icon to update"}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
                <User className="w-3.5 h-3.5" />
                Full Name
              </label>
              <div
                className="px-4 py-3 rounded-xl text-slate-200 font-medium text-sm"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {authUser?.fullName}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
                <Mail className="w-3.5 h-3.5" />
                Email Address
              </label>
              <div
                className="px-4 py-3 rounded-xl text-slate-200 font-medium text-sm"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {authUser?.email}
              </div>
            </div>
          </div>
        </div>

        {/* Account Info Card */}
        <div
          className="p-6 rounded-2xl"
          style={{
            background: "rgba(13, 21, 38, 0.8)",
            border: "1px solid rgba(99, 102, 241, 0.12)",
          }}
        >
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Account Information
          </h2>

          <div className="space-y-4 text-sm">
            <div
              className="flex items-center justify-between pb-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="text-slate-500 flex items-center gap-2 font-medium">
                <Calendar className="w-4 h-4" />
                Member Since
              </span>
              <span className="text-slate-300 font-semibold">
                {authUser.createdAt?.split("T")[0] || "Just now"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 flex items-center gap-2 font-medium">
                <Shield className="w-4 h-4" />
                Account Status
              </span>
              <span
                className="px-3 py-1 text-xs font-bold tracking-wide rounded-full"
                style={{
                  background: "rgba(16, 185, 129, 0.1)",
                  color: "#10b981",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                }}
              >
                ACTIVE
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;