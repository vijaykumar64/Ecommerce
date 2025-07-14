const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set('strictQuery', false); 
mongoose.set('bufferCommands', false);

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://vijaykumar:vijaykumar@cluster0.g8vfxsy.mongodb.net/project1?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
    });

    console.log(` MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(` MongoDB connection error: ${error.message}`);
    throw error; 
  }
};

module.exports = connectDatabase;
