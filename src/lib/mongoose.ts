import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected || mongoose.connections[0]?.readyState === 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};
