const express=require('express')
const cors=require('cors')
require("./connection") 
const UserModel=require("./models/users")
const AdmissionModel = require('./models/admissions')
const ContactModel = require("./models/contact"); 
const ProductModel = require("./models/products"); 
const CartModel = require("./models/carts"); 
const OrderModel = require("./models/orders"); 
const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'), false);
    }
  }
});
var app=express()

app.use(express.json({ limit: '10mb' }));
app.use(cors())
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).send('Something broke!');
});
//user authentication
  app.post("/register",async(req,res)=>{
    try {
        await UserModel(req.body).save() 
        res.send({message:"data added"})
    } catch (error) {
        console.log(error)
    }
    
})
//user authorization
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      if (user.password !== password) {
        return res.status(400).json({ message: 'Incorrect password' });
      }
      let avatar = null;
    if (user.avatar && user.avatar.data) {
      avatar = `data:${user.avatar.contentType};base64,${user.avatar.data.toString('base64')}`;
    }
      res.json({
        message: 'Login successful',
        user: {
          id: user._id,
          name:user.name,
          email:user.email,
          password:user.password,
          isAdmin: user.isAdmin,
          avatar: avatar
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  //viewing registered users
  app.get("/view", async (req, res) => {
    try {
        const data = await UserModel.find();
        res.send(data);
    } catch (error) {
        console.error(error);
    }
});
//storing admission details
app.post("/admission", async (req, res) => {
  try {
    const newAdmission = new AdmissionModel(req.body);
    const savedAdmission = await newAdmission.save();

    res.json({
      message: "Admission successful",
      admission: savedAdmission, // 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
});
//viewing admission details on the admin page
app.get("/viewadmission", async (req, res) => {
  try {
      const data = await AdmissionModel.find();
      res.send(data);
  } catch (error) {
      console.error(error);
  }
});

//  View admission by ID (used for edit autofill)
app.get("/viewadmission/:id", async (req, res) => {
  try {
    const admission = await AdmissionModel.findById(req.params.id);
    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }
    res.json(admission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Update admission (used on edit submit)
app.put("/updateadmission/:id", async (req, res) => {
  try {
    const updated = await AdmissionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Admission updated", updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed", error });
  }
});
// Update admission on user (used on change plansubmit)
app.put("/changeadmission/:id", async (req, res) => {
  try {
    const updated = await AdmissionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Admission updated", updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed", error });
  }
});

app.get("/getAdmissionByEmail/:email", async (req, res) => {
  try {
    const admission = await AdmissionModel.findOne({ email: req.params.email });

    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    res.json(admission); // 👈 Send the admission info back
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});
//Storing contact informations
app.post("/contact", async (req, res) => {
  try {
    const newContact = new ContactModel(req.body);
    const savedContact = await newContact.save();

    res.json({
      message: "message sended successful",
      contact: savedContact, // ✅ This sends data back to frontend
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
});
//viewing contact details on the admin page
app.get("/viewcontact", async (req, res) => {
  try {
      const data = await ContactModel.find();
      res.send(data);
  } catch (error) {
      console.error(error);
  }
});

//delete messages from adminpage
app.delete("/dltmsg/:id", async (req, res) => {
  try {
      const data = await ContactModel.findByIdAndDelete(req.params.id); // fetch employee data to delete
      res.send({Message:"Deleted successfully!!!"}); // send data to client
  } catch (error) {
      console.error(error);
  }
});


//delete admission details from adminpage and user page
app.delete("/deleteadmission/:id", async (req, res) => {
  try {
      const data = await AdmissionModel.findByIdAndDelete(req.params.id); // fetch employee data to delete
      res.send({Message:"Deleted successfully!!!"}); // send data to client
  } catch (error) {
      console.error(error);
  }
});

// Get user profile by email
app.get('/profile/:email', async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User  not found' });
    }

    // Return profile data without password
    const profileData = {
      name: user.name,
      email: user.email,
      age: user.age,
      weight: user.weight,
      height: user.height,
      joinDate: user.joinDate
    };

    // Include avatar data if it exists
    if (user.avatar && user.avatar.data) {
      profileData.avatar = user.avatar.data.toString('base64');
      profileData.avatarContentType = user.avatar.contentType;
    }

    res.json(profileData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
// In your server.js - Update the PUT /profile/:email endpoint
app.put('/profile/:email', upload.single('avatar'), async (req, res) => {
  try {
    const { age, weight, height } = req.body;
    const updateData = { age, weight, height };
    
    if (req.file) {
      updateData.avatar = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }
    
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: req.params.email },
      { $set: updateData },
      { new: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Prepare response data
    const responseData = {
      name: updatedUser.name,
      email: updatedUser.email,
      age: updatedUser.age,
      weight: updatedUser.weight,
      height: updatedUser.height,
      joinDate: updatedUser.joinDate
    };
    
    // Include avatar data if it exists
    if (updatedUser.avatar && updatedUser.avatar.data) {
      responseData.avatar = updatedUser.avatar.data.toString('base64');
      responseData.avatarContentType = updatedUser.avatar.contentType;
    }
    
    res.json({ 
      message: 'Profile updated successfully',
      user: responseData
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


//storing product details
// Product routes
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const uploads = multer({ 
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'), false);
    }
  }
});

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadDir));

// Updated products endpoint
app.post("/products", uploads.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const productData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      stock: req.body.stock,
      brand: req.body.brand,
      flavors: req.body.flavors ? JSON.parse(req.body.flavors) : [],
      sizes: req.body.sizes ? JSON.parse(req.body.sizes) : [],
      imageUrl: `/uploads/${req.file.filename}`
    };

    const newProduct = new ProductModel(productData);
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
});

// View all products
app.get("/viewproducts", async (req, res) => {
  try {
    const product = await ProductModel.find();
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products", error });
  }
});
//delete product
app.delete("/products/:id", async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed", error });
  }
});
//view product details
app.get("/viewproducts/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.send(product); // ✅ Send only one product
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

//adding cart details
// Update your backend cart route
app.post('/cart', async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;

    // Find existing cart for user
    let cart = await CartModel.findOne({ userId });

    if (cart) {
      // Check if product already exists in cart
      const existingItem = cart.items.find(item => 
        item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += Number(quantity);
      } else {
        cart.items.push({ productId, quantity });
      }
    } else {
      // Create new cart
      cart = new CartModel({
        userId,
        items: [{ productId, quantity }]
      });
    }

    await cart.save();
    res.status(201).json({ message: 'Item added to cart', cart });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});


// Getting cart details
// Fix the getcart endpoint (in server.js)
app.get('/getcart/:userId', async (req, res) => {
  try {
    // Use the correct model name (CartModel instead of cart)
    const cart = await CartModel.findOne({ userId: req.params.userId })
                          .populate('items.productId');
    
    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    // Format the response properly
    res.status(200).json({
      items: cart.items.map(item => ({
        _id: item._id,
        productId: {
          _id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          imageUrl: item.productId.imageUrl,
          // include other product fields you need
        },
        quantity: item.quantity
      }))
    });
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ 
      message: 'Failed to fetch cart',
      error: err.message 
    });
  }
});

//remove product details from cart
app.delete('/removefromcart/:userId/:cartItemId', async (req, res) => {
  const { userId, cartItemId } = req.params;

  try {
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the item by its _id
    cart.items = cart.items.filter(item => item._id.toString() !== cartItemId);

    await cart.save();

    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Clear all items from the user's cart
app.delete('/clearcart/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Clear items array
    cart.items = [];
    await cart.save();

    res.status(200).json({ message: 'Cart cleared successfully', cart });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Server error while clearing cart' });
  }
});

//adding orderdetails
// Create a proper order from cart
app.post('/checkout', async (req, res) => {
  try {
    const { userId } = req.body;

    // 1. Get user's cart
    const cart = await CartModel.findOne({ userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // 2. Prepare order data
    const orderItems = cart.items.map(item => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      quantity: item.quantity,
      imageUrl: item.productId.imageUrl
    }));

    const total = cart.items.reduce((sum, item) => 
      sum + (item.productId.price * item.quantity), 0);

    // 3. Create order
    const order = new OrderModel({
      userId,
      items: orderItems,
      total,
      status: "Placed"
    });

    await order.save();

    // 4. Clear cart
    await CartModel.findOneAndUpdate(
      { userId },
      { $set: { items: [] } }
    );

    res.status(201).json({ 
      message: 'Order placed successfully',
      order 
    });

  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ message: 'Checkout failed', error });
  }
});

// Get user's orders
app.get('/orders/:userId', async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.params.userId })
      .sort({ createdAt: -1 }); // Newest first
    
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
});
// View all orders
app.get("/vieworders", async (req, res) => {
  try {
    const order = await OrderModel.find();
    res.send(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

app.listen(3004,()=>{
    console.log("Connected")
})
