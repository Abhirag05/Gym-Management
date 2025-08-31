# Gym Management System - Backend API

A professional, scalable backend API for gym management system built with Node.js, Express, and MongoDB. Optimized for Vercel deployment.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Profile management with avatar uploads
- **Admission Management**: Gym membership applications and approvals
- **Contact System**: Contact form submissions and management
- **Product Management**: Gym products (supplements, accessories, apparel)
- **Shopping Cart**: Add/remove items, quantity management
- **Order Management**: Checkout system and order tracking
- **File Uploads**: Image handling for products and avatars
- **Professional Structure**: Clean separation of concerns with controllers, routes, middleware

## 📁 Project Structure

```
gym-management-backend/
├── api/
│   └── index.js              # Vercel entry point
├── src/
│   ├── config/
│   │   ├── database.js       # MongoDB connection
│   │   └── jwt.js           # JWT configuration
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── admissionController.js
│   │   ├── contactController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── middleware/          # Custom middleware
│   │   ├── auth.js         # Authentication middleware
│   │   ├── upload.js       # File upload middleware
│   │   └── errorHandler.js # Error handling
│   ├── models/             # Database models
│   │   ├── User.js
│   │   ├── Admission.js
│   │   ├── Contact.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── admissions.js
│   │   ├── contacts.js
│   │   ├── products.js
│   │   ├── carts.js
│   │   ├── orders.js
│   │   └── legacy.js       # Backward compatibility
│   ├── utils/              # Utility functions
│   │   └── fileUpload.js
│   └── app.js              # Express app configuration
├── uploads/                # File uploads directory
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
├── vercel.json           # Vercel configuration
└── README.md
```

## 🛠 Installation & Setup

### 1. Clone and Install Dependencies

```bash
cd gym-management-backend
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and configure:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gym-management
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
PORT=3004
```

### 3. Local Development

```bash
npm run dev
```

The API will be available at `http://localhost:3004`

## 🚀 Deployment to Vercel

### 1. Install Vercel CLI

```bash
npm i -g vercel
```

### 2. Deploy

```bash
vercel --prod
```

### 3. Set Environment Variables

In Vercel dashboard, add your environment variables:
- `MONGODB_URI`
- `JWT_SECRET`
- `NODE_ENV=production`
- `FRONTEND_URL`

## 📚 API Documentation

### Authentication Endpoints

- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout

### User Management

- `GET /view` - Get all users (Admin)
- `GET /profile/:email` - Get user profile
- `PUT /profile/:email` - Update user profile

### Admissions

- `POST /admission` - Create admission
- `GET /viewadmission` - Get all admissions (Admin)
- `GET /viewadmission/:id` - Get admission by ID
- `PUT /updateadmission/:id` - Update admission
- `DELETE /deleteadmission/:id` - Delete admission

### Products

- `POST /products` - Create product (Admin)
- `GET /viewproducts` - Get all products
- `GET /viewproducts/:id` - Get product by ID
- `PUT /products/:id` - Update product (Admin)
- `DELETE /products/:id` - Delete product (Admin)

### Shopping Cart

- `POST /cart` - Add to cart
- `GET /getcart/:userId` - Get user cart
- `DELETE /removefromcart/:userId/:cartItemId` - Remove from cart
- `DELETE /clearcart/:userId` - Clear cart

### Orders

- `POST /checkout` - Create order from cart
- `GET /orders/:userId` - Get user orders
- `GET /vieworders` - Get all orders (Admin)

### Contact

- `POST /contact` - Submit contact form
- `GET /viewcontact` - Get all contacts (Admin)
- `DELETE /dltmsg/:id` - Delete contact message

## 🔧 Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File uploads
- **CORS** - Cross-origin requests
- **Vercel** - Deployment platform

## 🔒 Security Features

- JWT-based authentication
- Role-based access control (Admin/User)
- Input validation and sanitization
- File upload restrictions
- CORS configuration
- Environment variable protection

## 📝 Notes

- All routes support both new API structure (`/api/*`) and legacy endpoints for backward compatibility
- File uploads are handled with 2MB size limit and image-only restriction
- Error handling middleware provides consistent error responses
- Database connections are optimized for serverless deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License - see LICENSE file for details
