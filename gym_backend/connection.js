import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
