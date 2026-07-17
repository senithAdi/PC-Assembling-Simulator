import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection string. Falls back to a local instance; set MONGODB_URI
// in server/.env to point at MongoDB Atlas or another host.
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pc_simulator';

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅  MongoDB connected successfully');
  } catch (err) {
    console.error('❌  MongoDB connection error:', err.message);
    process.exit(1);
  }
}

export default mongoose;
