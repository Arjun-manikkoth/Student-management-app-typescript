
import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://localhost:27017/student");
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Cannot connect to the database", error);
  }
};

export default connectDB;
