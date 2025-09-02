import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Badge,
  IconButton,
  Snackbar,
  Alert,
  TextField,
  Rating,
  Avatar,
  Container,
  Skeleton,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  CircularProgress
} from '@mui/material';
import {
  ShoppingCart,
  Delete,
  LocalShipping,
  VerifiedUser,
  Favorite,
  FavoriteBorder,
  Search,
  Close,
  FilterList,
  Margin
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { GymContext } from '../../context/GymContext';

// Custom styled components
const HeaderBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #2e2e2e 50%, #1a1a1a 75%, #000000 100%)`,
  color: theme.palette.common.white,
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  boxShadow: theme.shadows[4]
}));

const ProductCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6]
  }
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const GymStore = () => {
   const{backendURL} = useContext(GymContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(backendURL+'/viewproducts');
        const productsWithDefaults = response.data.map(product => ({
          ...product,
          rating: product.rating || 4.5,
          stock: product.stock || 10,
          flavors: product.flavors || [],
          sizes: product.sizes || []
        }));
        setProducts(productsWithDefaults);
        setFilteredProducts(productsWithDefaults);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch cart details when user toggles cart view or when cart updates
  useEffect(() => {
    const fetchCart = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return;

      try {
        setCartLoading(true);
        const res = await axios.get(backendURL+`/getcart/${user.id}`, {
          withCredentials: true
        });
        setCartItems(res.data.items || []);
      } catch (err) {
        console.error('Error fetching cart:', err);
        showSnackbar('Failed to load cart', 'error');
      } finally {
        setCartLoading(false);
      }
    };

    if (showCart) {
      fetchCart();
    }
  }, [showCart]);

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Filter products based on search term and category
  useEffect(() => {
    let result = products;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) ||
        (product.description && product.description.toLowerCase().includes(term)) ||
        (product.brand && product.brand.toLowerCase().includes(term))
      );
    }
    
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchTerm, products]);

  const addToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      showSnackbar('Please login to add items to cart', 'error');
      return;
    }
  
    try {
      await axios.post(backendURL+'/cart', {
        userId: user.id,
        productId: product._id,
        quantity: 1
      }, {
        withCredentials: true
      });
      
      const res = await axios.get(backendURL+`/getcart/${user.id}`);
      setCartItems(res.data.items || []);
      
      showSnackbar(`${product.name} added to cart`, 'success');
    } catch (err) {
      showSnackbar('Failed to add item to cart', 'error');
    }
  };

  const removeFromCart = async (cartItemId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    try {
      await axios.delete(backendURL+`/removefromcart/${user.id}/${cartItemId}`, {
        withCredentials: true
      });
      showSnackbar('Item removed from cart', 'info');
      const res = await axios.get(backendURL+`/getcart/${user.id}`);
      setCartItems(res.data.items || []);
    } catch (err) {
      showSnackbar('Failed to remove item from cart', 'error');
    }
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      showSnackbar('Removed from wishlist', 'info');
    } else {
      setWishlist([...wishlist, productId]);
      showSnackbar('Added to wishlist', 'success');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.productId.price * item.quantity);
    }, 0).toFixed(2);
  };

  const checkout = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    showSnackbar('Please login to checkout', 'error');
    return;
  }

  try {
    setCartLoading(true);
    const response = await axios.post(`${backendURL}/checkout`, {
      userId: user.id
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    showSnackbar('Order placed successfully!', 'success');
    setCartItems([]);
    setShowCart(false); // Close cart after successful checkout
  } catch (err) {
    console.error('Checkout error:', err);
    showSnackbar('Failed to place order', 'error');
    if (err.response) {
      console.error('Server response:', err.response.data);
    }
  } finally {
    setCartLoading(false);
  }
};

  const categories = [
    { id: 'all', name: 'All Products', image: '/p.webp' },
    { id: 'supplements', name: 'Supplements', image: '/sup.webp' },
    { id: 'accessories', name: 'Accessories', image: '/acc.jpg' },
    { id: 'wearings', name: 'Apparel', image: '/wea.webp' }
  ];

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[...Array(6)].map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Skeleton variant="rectangular" height={200} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        textAlign: 'center',
        p: 3
      }}>
        <Alert severity="error" sx={{ maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>Error loading products</Typography>
          <Typography>{error}</Typography>
          <Button 
            variant="contained" 
            sx={{ mt: 2 }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
    }}>
      {/* Header Section */}
      <HeaderBox>
        <Container maxWidth="xl">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
            py: 1
          }}>
            <Box>
              <Typography variant="h4" sx={{ 
                fontWeight: 600,
                textShadow: '1px 1px 3px rgba(0,0,0,0.2)'
              }}>
                Gym Store
              </Typography>
              <Typography variant="h6" sx={{ 
                mb: 1,
                fontWeight: 400,
              }}>
                Premium supplements, gear, and apparel 
              </Typography>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 2,
              width: isMobile ? '100%' : 'auto',
              flexGrow: isMobile ? 1 : 0.5,
              maxWidth: isMobile ? '100%' : 600,
              minWidth: isMobile ? 'auto' : 300,
            }}>
              <Paper 
                component="form" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  width: '100%',
                  height: '40px',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: theme.shadows[1],
                  '&:hover': {
                    boxShadow: theme.shadows[2]
                  },
                  flexGrow: 1
                }}
              >
                <IconButton sx={{ 
                  px: isMobile ? 1 : 2,
                  color: 'text.secondary' 
                }} aria-label="search">
                  <Search />
                </IconButton>
                <TextField
                  fullWidth
                  placeholder="Search products..."
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{ 
                    sx: {
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                      height: '40px',
                      padding: 0,
                      '& input': {
                        padding: 0,
                        height: '40px',
                        lineHeight: '40px',
                        boxSizing: 'border-box',
                        fontSize: isMobile ? '0.875rem' : '1rem'
                      }
                    }
                  }}
                />
                {searchTerm && (
                  <IconButton 
                    onClick={() => setSearchTerm('')}
                    sx={{ 
                      color: 'text.secondary', 
                      mr: isMobile ? 0.5 : 1
                    }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                )}
              </Paper>
              
              <IconButton 
                color="inherit" 
                onClick={() => setShowCart(!showCart)}
                sx={{ 
                  p: isMobile ? 1 : 1.5,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  },
                  flexShrink: 0
                }}
              >
                <StyledBadge badgeContent={getCartCount()} color="secondary">
                  <ShoppingCart />
                </StyledBadge>
              </IconButton>
              <LocalMallIcon onClick={() => navigate('/user/orders')}/>
            </Box>
          </Box>
        </Container>
      </HeaderBox>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Category Cards */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Grid container spacing={3} sx={{ maxWidth: '100%', width: 'fit-content', px: 2 }}>
            {categories.map((cat) => (
              <Grid key={cat.id}>
                <Card
                  onClick={() => setSelectedCategory(cat.id)}
                  sx={{
                    cursor: 'pointer',
                    height: 150,
                    width: 200,
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: selectedCategory === cat.id ? 4 : 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="100%"
                    image={cat.image}
                    alt={cat.name}
                    sx={{
                      filter: selectedCategory === cat.id ? 'brightness(100%)' : 'brightness(80%)',
                      transition: 'filter 0.3s ease'
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      bgcolor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      p: 2,
                      textAlign: 'center'
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {cat.name}
                    </Typography>
                    {selectedCategory === cat.id && (
                      <Typography variant="caption">
                        {filteredProducts.length} items
                      </Typography>
                    )}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Main Content - Products or Cart based on state */}
        {showCart ? (
          <Paper elevation={2} sx={{ 
            p: 3,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: 2
            }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>Your Cart</Typography>
              <Button 
                variant="outlined" 
                onClick={() => setShowCart(false)}
                startIcon={<Close />}
              >
                Back to Products
              </Button>
            </Box>
            
            {cartLoading ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>Loading your cart...</Typography>
              </Box>
            ) : cartItems.length === 0 ? (
              <Box sx={{ 
                textAlign: 'center', 
                p: 2,
                backgroundColor: theme.palette.action.hover,
                borderRadius: 1
              }}>
                <Typography variant="body1">Your cart is empty</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Add some products to get started
                </Typography>
              </Box>
            ) : (
              <>
                <List sx={{ 
                  maxHeight: 400, 
                  overflow: 'auto',
                  mb: 2,
                  '&::-webkit-scrollbar': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: theme.palette.action.hover,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: theme.palette.text.secondary,
                    borderRadius: '3px',
                  }
                }}>
                  {cartItems.map((item) => (
                    <React.Fragment key={item._id}>
                      <ListItem
                        secondaryAction={
                          <IconButton
                            edge="end"
                            color="error"
                            onClick={() => removeFromCart(item._id)}
                            size="small"
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        }
                        sx={{
                          px: 0,
                          '&:hover': {
                            backgroundColor: 'transparent'
                          }
                        }}
                      >
                        <Avatar 
                          src={backendURL+`${item.productId.imageUrl}`}
                          alt={item.productId.name} 
                          sx={{ 
                            width: 48, 
                            height: 48, 
                            mr: 2,
                            borderRadius: 1
                          }}
                        />
                        <ListItemText 
                          primary={
                            <Typography variant="body2" fontWeight={500} noWrap>
                              {item.productId.name}
                            </Typography>
                          } 
                          secondary={
                            <>
                              <Typography variant="body2" color="primary" fontWeight={600}>
                                ${item.productId.price} x {item.quantity}
                              </Typography>
                              <Typography variant="body2" color="primary" fontWeight={600}>
                                Total: ${(item.productId.price * item.quantity).toFixed(2)}
                              </Typography>
                            </>
                          } 
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
                <Box sx={{ 
                  backgroundColor: theme.palette.action.hover,
                  p: 2,
                  borderRadius: 1,
                  mb: 2
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    mb: 1
                  }}>
                    <Typography variant="body2">Subtotal:</Typography>
                    <Typography variant="body2" fontWeight={600}>${getTotal()}</Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    mb: 1
                  }}>
                    <Typography variant="body2">Pickup:</Typography>
                    <Typography variant="body2" color="success.main" fontWeight={600}>FREE</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between'
                  }}>
                    <Typography variant="body1" fontWeight={700}>Total:</Typography>
                    <Typography variant="body1" fontWeight={700}>${getTotal()}</Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  startIcon={<LocalShipping />}
                  onClick={checkout}
                  sx={{
                    fontWeight: 600,
                    py: 1.5,
                    borderRadius: 1,
                    textTransform: 'none'
                  }}
                >
                  Checkout Now
                </Button>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mt: 2,
                  color: 'text.secondary'
                }}>
                  <VerifiedUser fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="caption">
                    Available for pickup next morning at the gym
                  </Typography>
                </Box>
              </>
            )}
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {/* Product Grid */}
            <Grid size={{ xs: 12, md: 9 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
              }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
                </Typography>
              </Box>

              {filteredProducts.length > 0 ? (
                <Grid container spacing={3}>
                  {filteredProducts.map(product => (
                    <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={product._id} sx={{height:'540px',width:'auto'}}>
                      <ProductCard>
                        <Box sx={{ position: 'relative', pt: '100%', }}>
                          <CardMedia
                            component="img"
                            image={backendURL+`${product.imageUrl}`}
                            alt={product.name}
                            sx={{ 
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '200px',
                              height: '200px',
                              objectFit: 'contain',
                              p: 2,
                              backgroundColor: theme.palette.background.paper
                            }}
                          />
                          <IconButton 
                            sx={{ 
                              position: 'absolute', 
                              top: 8, 
                              right: 8,
                              color: wishlist.includes(product._id) ? theme.palette.error.main : theme.palette.text.secondary,
                              backgroundColor: 'rgba(255,255,255,0.8)',
                              '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.9)'
                              }
                            }}
                            onClick={() => toggleWishlist(product._id)}
                          >
                            {wishlist.includes(product._id) ? <Favorite /> : <FavoriteBorder />}
                          </IconButton>
                          {product.stock <= 5 && product.stock > 0 && (
                            <Chip 
                              label={`Only ${product.stock} left!`} 
                              color="warning" 
                              size="small"
                              sx={{ 
                                position: 'absolute', 
                                bottom: 8, 
                                left: 8,
                                fontWeight: 600
                              }}
                            />
                          )}
                          {product.stock === 0 && (
                            <Chip 
                              label="Out of stock" 
                              color="error" 
                              size="small"
                              sx={{ 
                                position: 'absolute', 
                                bottom: 8, 
                                left: 8,
                                fontWeight: 600
                              }}
                            />
                          )}
                        </Box>
                        <Link to={`/user/gymstore/${product._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            {product.name}
                          </Typography>
                          {product.brand && (
                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                              by {product.brand}
                            </Typography>
                          )}
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Rating value={product.rating} precision={0.1} readOnly size="small" />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                              {product.rating} ({Math.floor(Math.random() * 100) + 1} reviews)
                            </Typography>
                          </Box>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ 
                              mb: 2,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {product.description}
                          </Typography>
                          {product.flavors && product.flavors.length > 0 && (
                            <Box sx={{ mb: 1 }}>
                              <Typography variant="caption" fontWeight={500}>Flavors: </Typography>
                              {product.flavors.map(flavor => (
                                <Chip 
                                  key={flavor} 
                                  label={flavor} 
                                  size="small" 
                                  sx={{ 
                                    mr: 0.5, 
                                    mb: 0.5,
                                    fontSize: '0.65rem'
                                  }} 
                                />
                              ))}
                            </Box>
                          )}
                          {product.sizes && product.sizes.length > 0 && (
                            <Box sx={{ mb: 1 }}>
                              <Typography variant="caption" fontWeight={500}>Sizes: </Typography>
                              {product.sizes.map(size => (
                                <Chip 
                                  key={size} 
                                  label={size} 
                                  size="small" 
                                  sx={{ 
                                    mr: 0.5, 
                                    mb: 0.5,
                                    fontSize: '0.65rem'
                                  }} 
                                />
                              ))}
                            </Box>
                          )}
                        </CardContent>
                        </Link>
                        <Box sx={{ 
                          p: 2, 
                          borderTop: `1px solid ${theme.palette.divider}`,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <Typography variant="h6"  fontWeight={600} sx={{color:'#ff416c'}}>
                            ${product.price}
                          </Typography>
                          
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                            sx={{
                              fontWeight: 600,
                              textTransform: 'none',
                              borderRadius: 1,
                              background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                            }}
                          >
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                          </Button>
                          
                        </Box>
                      </ProductCard>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    No products found
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    Try adjusting your search or filter criteria
                  </Typography>
                  <Button 
                    variant="outlined" 
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchTerm('');
                    }}
                  >
                    Clear filters
                  </Button>
                </Paper>
              )}
            </Grid>
          </Grid>
        )}
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          sx={{ 
            width: '100%',
            boxShadow: theme.shadows[4],
            alignItems: 'center'
          }}
          iconMapping={{
            success: <VerifiedUser fontSize="inherit" />,
            error: <Close fontSize="inherit" />,
            warning: <Close fontSize="inherit" />,
            info: <Close fontSize="inherit" />
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GymStore;