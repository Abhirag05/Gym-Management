const app = require('../src/app');

const PORT = process.env.PORT || 3004;

// For Vercel, we export the app directly
module.exports = app;

// For local development
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Gym Management API running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}
