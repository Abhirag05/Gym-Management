const mongoose = require('mongoose');
const cloudinary = require('../config/cloudinary');
const Product = require('../models/Product');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || process.env.DB_URL);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Convert base64 to buffer and upload to Cloudinary
const uploadBase64ToCloudinary = async (base64String, productName) => {
  try {
    // Upload base64 string directly to Cloudinary
    const result = await cloudinary.uploader.upload(base64String, {
      folder: 'gym-products',
      public_id: `product_${Date.now()}_${productName.replace(/[^a-zA-Z0-9]/g, '_')}`,
      transformation: [
        { width: 500, height: 500, crop: 'limit' },
        { quality: 'auto' }
      ]
    });
    
    return {
      imageUrl: result.secure_url,
      cloudinaryPublicId: result.public_id
    };
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error);
    throw error;
  }
};

// Migrate products with base64 images to Cloudinary
const migrateProducts = async () => {
  try {
    console.log('🔍 Finding products with base64 images...');
    
    // Find products with base64 images
    const productsToMigrate = await Product.find({
      imageUrl: { $regex: '^data:' }
    });
    
    console.log(`📦 Found ${productsToMigrate.length} products to migrate`);
    
    if (productsToMigrate.length === 0) {
      console.log('✅ No products need migration');
      return;
    }
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const product of productsToMigrate) {
      try {
        console.log(`📤 Migrating: ${product.name}`);
        
        // Upload to Cloudinary
        const { imageUrl, cloudinaryPublicId } = await uploadBase64ToCloudinary(
          product.imageUrl, 
          product.name
        );
        
        // Update product with new Cloudinary URL
        await Product.findByIdAndUpdate(product._id, {
          imageUrl,
          cloudinaryPublicId
        });
        
        console.log(`✅ Migrated: ${product.name}`);
        successCount++;
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`❌ Failed to migrate ${product.name}:`, error.message);
        errorCount++;
      }
    }
    
    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully migrated: ${successCount} products`);
    console.log(`❌ Failed to migrate: ${errorCount} products`);
    
  } catch (error) {
    console.error('❌ Migration error:', error);
  }
};

// Run migration
const runMigration = async () => {
  console.log('🚀 Starting product migration to Cloudinary...\n');
  
  await connectDB();
  await migrateProducts();
  
  console.log('\n🎉 Migration completed!');
  process.exit(0);
};

// Handle errors
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Run if called directly
if (require.main === module) {
  runMigration();
}

module.exports = { migrateProducts };
