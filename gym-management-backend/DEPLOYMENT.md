# Deployment Guide for Vercel

## 🚀 Quick Deploy Steps

### 1. Prepare Environment Variables
Copy your current `.env` values to Vercel:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Your JWT secret key
- `NODE_ENV=production`
- `FRONTEND_URL` - Your frontend Vercel URL

### 2. Deploy Backend to Vercel

```bash
# Navigate to backend directory
cd gym-management-backend

# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel --prod
```

### 3. Update Frontend Environment

After backend deployment, update your frontend `.env`:
```env
VITE_BACKEND_URL=https://your-backend-domain.vercel.app
```

### 4. Deploy Frontend

```bash
# Navigate to frontend directory
cd ../gym_frontend

# Deploy
vercel --prod
```

## 🔧 Vercel Configuration

The `vercel.json` is configured for:
- Serverless function deployment
- Static file serving for uploads
- Proper routing for all API endpoints

## 📝 Post-Deployment Checklist

- [ ] Backend deployed successfully
- [ ] Environment variables set in Vercel dashboard
- [ ] Frontend updated with new backend URL
- [ ] Frontend deployed successfully
- [ ] Test all API endpoints
- [ ] Verify file uploads work
- [ ] Check authentication flow

## 🐛 Common Issues

**CORS Errors**: Update `FRONTEND_URL` in backend environment variables

**Database Connection**: Verify `MONGODB_URI` is correct

**File Uploads**: Ensure uploads directory exists and is accessible

**Authentication**: Check `JWT_SECRET` is set correctly
