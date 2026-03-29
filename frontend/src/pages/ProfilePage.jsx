import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, ShieldCheck } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#0d1627] to-[#0a0f1c] pt-24 pb-12 px-4 text-slate-200">
      <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="text-center space-y-2 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
          <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">Your Profile</h1>
          <p className="text-blue-200/60 font-medium tracking-wide">Manage your account and personal details</p>
        </div>

        {/* Main Card */}
        <div className="bg-[#11192b]/80 backdrop-blur-xl border border-blue-900/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-5 mb-10 relative z-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <img
                src={selectedImg || authUser.profilePic || authUser.profilePicture || "/avatar.png"}
                alt="Profile"
                className="relative size-24 md:size-28 rounded-full object-cover border-2 border-slate-700 shadow-xl group-hover:border-blue-500 transition-colors duration-300"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-blue-600 hover:bg-blue-500 shadow-lg 
                  p-2.5 rounded-full cursor-pointer 
                  transition-all duration-300 hover:scale-110 active:scale-95
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none opacity-50" : ""}
                `}
              >
                <Camera className="size-4 text-white" />
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
            <p className="text-sm text-blue-200/50 font-medium">
              {isUpdatingProfile ? "Uploading your new look..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Details Form */}
          <div className="space-y-6 relative z-10">
            <div className="space-y-2 group">
              <div className="text-xs font-bold text-blue-300/70 uppercase tracking-widest flex items-center gap-2 ml-1">
                <User className="size-3.5" />
                Full Name
              </div>
              <div className="px-5 py-3.5 bg-[#0a0f1c]/50 rounded-xl border border-slate-800/60 text-slate-300 font-medium shadow-inner group-hover:border-blue-900/50 transition-colors">
                {authUser?.fullName}
              </div>
            </div>

            <div className="space-y-2 group">
              <div className="text-xs font-bold text-blue-300/70 uppercase tracking-widest flex items-center gap-2 ml-1">
                <Mail className="size-3.5" />
                Email Address
              </div>
              <div className="px-5 py-3.5 bg-[#0a0f1c]/50 rounded-xl border border-slate-800/60 text-slate-300 font-medium shadow-inner group-hover:border-blue-900/50 transition-colors">
                {authUser?.email}
              </div>
            </div>
          </div>
        </div>

        {/* Account Meta Info */}
        <div className="bg-[#11192b]/50 backdrop-blur-md border border-slate-800/40 rounded-2xl p-6 shadow-lg">
          <h2 className="text-sm font-bold text-blue-200/80 uppercase tracking-widest mb-4 flex items-center gap-2">
            <ShieldCheck className="size-4" />
            Account Information
          </h2>
          <div className="space-y-4 text-sm font-medium">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
              <span className="text-slate-400 flex items-center gap-2"><Calendar className="size-4" /> Member Since</span>
              <span className="text-slate-200">{authUser.createdAt?.split("T")[0] || "Just now"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-2"><ShieldCheck className="size-4" /> Account Status</span>
              <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-bold tracking-wide">
                ACTIVE
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;