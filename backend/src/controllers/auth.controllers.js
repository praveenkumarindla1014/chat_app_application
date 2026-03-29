import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


// ✅ SIGNUP
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "User already exists with this email" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // ✅ Save once
    await newUser.save();

    // ✅ Generate token
    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      message: "User created successfully",
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Correct query
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password" });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password" });
    }

    // ✅ Generate token
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      message: "Login successful",
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ LOGOUT
export const logout = (req, res) => {
  try {
    // clear cookie (if using JWT cookies)
    res.cookie("jwt", "", { maxAge: 0 });

    res.status(200).json({
      message: "Logged out successfully",
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
    try{
      const { profilepic } = req.body;
   const userId = req.user._id;


   if(!profilepic){
    return res.status(400).json({ message: "Profile picture is required" });
   }

   const uploadResponse = await cloudinary.uploader.upload(profilepic);
  const updatedUser = await User.findByIdAndUpdate(userId, { profilePicture: uploadResponse.secure_url }, { new: true }).select("-password");
  
  res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }




    
};


export const checkAuth = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePicture: user.profilePicture,
    });
  }



    catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
