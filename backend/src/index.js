import express from "express";

import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import copkieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import messageRoutes from "./routes/message.route.js";

import cookieParser from "cookie-parser";
dotenv.config()
const app = express();


const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(copkieParser());


app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/message",messageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB()
});


