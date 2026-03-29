import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Available", "Busy", "Away", "Offline"],
      default: "Available",
    },
    statusMessage: {
      type: String,
      default: "",
      maxlength: 140,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Indexes
userSchema.index({ fullName: "text" });

const User = mongoose.model("User", userSchema);
export default User;
