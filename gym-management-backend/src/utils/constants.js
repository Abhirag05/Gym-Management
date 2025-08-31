// API response messages
const MESSAGES = {
  SUCCESS: {
    USER_REGISTERED: 'User registered successfully',
    LOGIN_SUCCESS: 'Login successful',
    LOGOUT_SUCCESS: 'Logged out successfully',
    PROFILE_UPDATED: 'Profile updated successfully',
    ADMISSION_SUCCESS: 'Admission successful',
    ADMISSION_UPDATED: 'Admission updated successfully',
    ADMISSION_DELETED: 'Admission deleted successfully',
    CONTACT_SENT: 'Message sent successfully',
    CONTACT_DELETED: 'Message deleted successfully',
    PRODUCT_ADDED: 'Product added successfully',
    PRODUCT_UPDATED: 'Product updated successfully',
    PRODUCT_DELETED: 'Product deleted successfully',
    CART_ITEM_ADDED: 'Item added to cart',
    CART_ITEM_REMOVED: 'Item removed from cart',
    CART_CLEARED: 'Cart cleared successfully',
    ORDER_PLACED: 'Order placed successfully',
    ORDER_STATUS_UPDATED: 'Order status updated'
  },
  ERROR: {
    USER_NOT_FOUND: 'User not found',
    EMAIL_EXISTS: 'Email already exists',
    INCORRECT_PASSWORD: 'Incorrect password',
    UNAUTHORIZED: 'Access denied. No token provided.',
    INVALID_TOKEN: 'Invalid token',
    ADMIN_REQUIRED: 'Access denied. Admin privileges required.',
    ADMISSION_NOT_FOUND: 'Admission not found',
    CONTACT_NOT_FOUND: 'Contact message not found',
    PRODUCT_NOT_FOUND: 'Product not found',
    CART_NOT_FOUND: 'Cart not found',
    ORDER_NOT_FOUND: 'Order not found',
    NO_IMAGE_UPLOADED: 'No image uploaded',
    INVALID_FILE_TYPE: 'Only images are allowed',
    FILE_TOO_LARGE: 'File too large. Maximum size is 2MB',
    VALIDATION_ERROR: 'Validation Error',
    SERVER_ERROR: 'Internal Server Error'
  }
};

// HTTP status codes
const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

module.exports = {
  MESSAGES,
  STATUS_CODES
};
