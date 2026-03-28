import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOB_URI);
        console.log("MongoDB connected successfully:${conn.connection.host}");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }

};  
      