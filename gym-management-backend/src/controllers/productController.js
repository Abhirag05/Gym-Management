const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

const productController = {
  // Create new product
  createProduct: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'gym-products',
        transformation: [
          { width: 500, height: 500, crop: 'limit' },
          { quality: 'auto' }
        ]
      });

      const productData = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        stock: req.body.stock,
        brand: req.body.brand,
        flavors: req.body.flavors ? JSON.parse(req.body.flavors) : [],
        sizes: req.body.sizes ? JSON.parse(req.body.sizes) : [],
        imageUrl: result.secure_url,
        cloudinaryPublicId: result.public_id
      };

      const newProduct = new Product(productData);
      await newProduct.save();

      res.status(201).json({
        message: "Product added successfully",
        product: newProduct
      });
    } catch (error) {
      console.error("Product creation error:", error);
      res.status(500).json({ 
        message: "Failed to add product",
        error: error.message
      });
    }
  },

  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      
      // Filter out products with base64 images in production
      const filteredProducts = products.filter(product => {
        // In production, only show products with Cloudinary URLs
        if (process.env.NODE_ENV === 'production') {
          return product.imageUrl && !product.imageUrl.startsWith('data:');
        }
        // In development, show all products
        return true;
      });
      
      res.json(filteredProducts);
    } catch (error) {
      console.error('Get products error:', error);
      res.status(500).json({ message: "Error fetching products", error: error.message });
    }
  },

  // Get product by ID
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ 
        message: "Error fetching product details",
        error: error.message
      });
    }
  },

  // Update product
  updateProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const updateData = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        stock: req.body.stock,
        brand: req.body.brand,
        flavors: req.body.flavors ? JSON.parse(req.body.flavors) : [],
        sizes: req.body.sizes ? JSON.parse(req.body.sizes) : []
      };

      // Handle image update if new image is provided
      if (req.file) {
        // Delete old image from Cloudinary if exists
        if (product.cloudinaryPublicId) {
          await cloudinary.uploader.destroy(product.cloudinaryPublicId);
        }

        // Upload new image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'gym-products',
          transformation: [
            { width: 500, height: 500, crop: 'limit' },
            { quality: 'auto' }
          ]
        });

        updateData.imageUrl = result.secure_url;
        updateData.cloudinaryPublicId = result.public_id;
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      res.json({
        message: "Product updated successfully",
        product: updatedProduct
      });
    } catch (error) {
      console.error("Product update error:", error);
      res.status(500).json({ 
        message: "Failed to update product",
        error: error.message
      });
    }
  },

  // Delete product
  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Delete image from Cloudinary if exists
      if (product.cloudinaryPublicId) {
        await cloudinary.uploader.destroy(product.cloudinaryPublicId);
      }

      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error('Delete product error:', error);
      res.status(500).json({ message: "Delete failed", error: error.message });
    }
  }
};

module.exports = productController;
