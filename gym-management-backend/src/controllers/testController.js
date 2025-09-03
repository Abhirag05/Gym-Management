const cloudinary = require('../config/cloudinary');
const Product = require('../models/Product');

// Test Cloudinary connection
const testCloudinary = async (req, res) => {
  try {
    // Test Cloudinary configuration
    const result = await cloudinary.api.ping();
    
    // Count products with base64 images
    const base64Products = await Product.countDocuments({
      imageUrl: { $regex: '^data:' }
    });
    
    // Count products with Cloudinary images
    const cloudinaryProducts = await Product.countDocuments({
      imageUrl: { $not: { $regex: '^data:' } }
    });
    
    res.json({
      cloudinaryStatus: 'Connected',
      cloudinaryConfig: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Missing',
        apiKey: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing',
        apiSecret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing'
      },
      products: {
        withBase64Images: base64Products,
        withCloudinaryImages: cloudinaryProducts,
        total: base64Products + cloudinaryProducts
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Cloudinary connection failed',
      message: error.message,
      cloudinaryConfig: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Missing',
        apiKey: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing',
        apiSecret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing'
      }
    });
  }
};

// Get products with base64 images (for debugging)
const getBase64Products = async (req, res) => {
  try {
    const products = await Product.find({
      imageUrl: { $regex: '^data:' }
    }).select('name imageUrl createdAt');
    
    res.json({
      count: products.length,
      products: products.map(p => ({
        id: p._id,
        name: p.name,
        hasBase64Image: p.imageUrl.startsWith('data:'),
        createdAt: p.createdAt
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  testCloudinary,
  getBase64Products
};
