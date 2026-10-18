import mongoose from 'mongoose';

export let isDbConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    isDbConnected = true;
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    isDbConnected = false;
    console.log(`ℹ️ MongoDB Atlas connection note (${error.message}). Using client dataset fallback.`);
  }
};

export default connectDB;
