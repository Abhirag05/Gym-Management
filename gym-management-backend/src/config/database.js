const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Load environment variables
    require('dotenv').config();
    
    const mongoUri = process.env.MONGODB_URI || process.env.DB_URL || process.env.MONGO_URL;
    
    if (!mongoUri || mongoUri === 'undefined') {
      console.warn('⚠️  No MongoDB URI found. Database connection skipped for testing.');
      console.log('Available env vars:', Object.keys(process.env).filter(key => key.includes('MONGO') || key.includes('DB')));
      return;
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      console.warn('⚠️  Continuing without database connection for development...');
    }
  }
};

module.exports = connectDB;
