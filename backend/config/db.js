import mongoose from "mongoose";

const connectDB = async (MONGO_URI) => {
  try {
    await mongoose.connect('mongodb+srv://vijaykumar:vijaykumar@e-commerce.0dvhr.mongodb.net/?retryWrites=true&w=majority&appName=E-commerce');
    console.log(`Successfully connected to mongoDB`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
