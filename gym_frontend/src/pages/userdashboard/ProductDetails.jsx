import { useParams } from 'react-router-dom'; 
import { useState, useEffect } from 'react'; 
import { 
  Button, CircularProgress, Typography, Paper, Box, CardMedia, Container, 
  IconButton, TextField, styled, useMediaQuery, useTheme, Badge, Chip, 
  Rating, Divider, Alert, Breadcrumbs, Link, Snackbar 
} from '@mui/material'; 
import axios from 'axios'; 
import { Search, ShoppingCart, Close, Favorite, FavoriteBorder, Share } from '@mui/icons-material';

const ProfessionalHeaderBox = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderBottom: `1px solid ${theme.palette.divider}`,
  width: '100%'
}));

const ProductImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '400px',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.default,
  '&:hover': {
    boxShadow: theme.shadows[4]
  }
}));

const ProductDetails = () => {
  const { productId } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(backendURL+`/viewproducts/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      await axios.post(backendURL+"/cart", { 
        userId: user.id, 
        productId: product._id, 
        quantity: 1 
      });
      showSnackbar(`${product.name} added to cart`, 'success');
    } catch (error) {
      showSnackbar('Failed to add item to cart', 'error');
    }
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    showSnackbar(
      isFavorite ? 'Removed from favorites' : 'Added to favorites', 
      isFavorite ? 'info' : 'success'
    );
  };

  const handleShareClick = () => {
    showSnackbar('Share link copied to clipboard', 'info');
    // Actual share functionality would go here
  };
  

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <CircularProgress size={60} />
    </Box>
  );

  if (error) return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Alert severity="error" sx={{ mb: 3 }}>
        Error loading product: {error}
      </Alert>
      <Button variant="contained" onClick={() => window.location.reload()}>
        Retry
      </Button>
    </Container>
  );

  if (!product) return (
    <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>Product not found</Typography>
      <Typography color="text.secondary">
        The product you're looking for doesn't exist or may have been removed.
      </Typography>
    </Container>
  );

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <ProfessionalHeaderBox>
        <Container maxWidth="xl">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3
          }}>
            <Box>
              <Typography variant="h3" sx={{ 
                fontWeight: 700,
                mb: 1,
                lineHeight: 1.2
              }}>
                {product.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating value={4.5} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  (24 reviews)
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                aria-label="share" 
                sx={{ backgroundColor: theme.palette.action.hover }}
                onClick={handleShareClick}
              >
                <Share />
              </IconButton>
              <IconButton 
                aria-label="add to favorites"
                onClick={handleFavoriteClick}
                sx={{ backgroundColor: theme.palette.action.hover }}
              >
                {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
            </Box>
          </Box>
        </Container>
      </ProfessionalHeaderBox>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={0} sx={{ 
          p: 4, 
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper
        }}>
          <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={6}>
            <Box flex={1}>
              <ProductImageContainer>
                <CardMedia
                  component="img"
                  image={backendURL+`${product.imageUrl}`}
                  alt={product.name}
                  sx={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.03)'
                    }
                  }}
                />
              </ProductImageContainer>
            </Box>
            
            <Box flex={1} sx={{ pt: isMobile ? 4 : 0 }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 600,
                mb: 2,
                color: theme.palette.text.primary
              }}>
                ${product.price.toFixed(2)}
              </Typography> 
              <Typography variant="body1" paragraph sx={{ 
                mb: 3,
                color: theme.palette.text.secondary,
                lineHeight: 1.7
              }}>
                {product.description}
              </Typography>
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Product Details
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Brand: {product.brand || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {product.category || 'N/A'}
                </Typography>
                {product.flavors && (
                  <Typography variant="body2" color="text.secondary">
                    Flavors: {product.flavors.join(', ')}
                  </Typography>
                )}
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleAddToCart}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: 'none'
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => {
                    showSnackbar('Order placed successfully!');
                  }}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: 'none'
                  }}
                >
                  Buy Now
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
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
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductDetails;