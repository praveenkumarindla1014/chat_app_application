import User from "../models/user.model.js";

export const userRepository = {
  findByEmail: (email) => User.findOne({ email }),

  findById: (id) => User.findById(id).select("-password"),

  create: (data) => new User(data).save(),

  updateProfile: (id, data) =>
    User.findByIdAndUpdate(id, data, { new: true }).select("-password"),

  getAllExcept: (id) =>
    User.find({ _id: { $ne: id } }).select(
      "fullName email profilePicture lastSeen status statusMessage"
    ),

  updateLastSeen: (id) =>
    User.findByIdAndUpdate(id, { lastSeen: new Date(), isOnline: false }),

  setOnline: (id) =>
    User.findByIdAndUpdate(id, { isOnline: true, lastSeen: new Date() }),
};
