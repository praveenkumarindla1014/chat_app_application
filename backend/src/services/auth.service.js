import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/user.repository.js";
import { generateToken } from "../lib/utils.js";
import { ApiError } from "../utils/ApiError.js";
import cloudinary from "../lib/cloudinary.js";

export const authService = {
  async signup({ fullName, email, password }, res) {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw ApiError.badRequest("User already exists with this email");
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userRepository.create({
      fullName,
      email,
      password: hashedPassword,
    });

    generateToken(newUser._id, res);

    return {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePicture: newUser.profilePicture,
    };
  },

  async login({ email, password }, res) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw ApiError.badRequest("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw ApiError.badRequest("Invalid email or password");
    }

    generateToken(user._id, res);

    return {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePicture: user.profilePicture,
    };
  },

  async updateProfile(userId, { profilepic }) {
    const uploadResponse = await cloudinary.uploader.upload(profilepic);
    const updatedUser = await userRepository.updateProfile(userId, {
      profilePicture: uploadResponse.secure_url,
    });
    return updatedUser;
  },

  async checkAuth(user) {
    if (!user) {
      throw ApiError.unauthorized();
    }
    return {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
    };
  },
};
