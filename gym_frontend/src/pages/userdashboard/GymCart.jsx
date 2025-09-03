import React from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Paper,
  Container,
  Avatar,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ShoppingCart,
  Delete,
  LocalShipping,
  VerifiedUser,
  ArrowBack
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const GymCart = ({ cart, removeFromCart, checkout }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const getTotal = () => 
    cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toFixed(2);

  const getCartCount = () => 
    cart.reduce((count, item) => count + (item.quantity || 1), 0);

  const handleCheckout = () => {
    checkout();
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ 
      py: isMobile ? 2 : 4,
      px: isMobile ? 1 : 3
    }}>
      <Paper elevation={2} sx={{
        p: isMobile ? 2 : 3,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 2 : 0
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => navigate('/')}>
              <ArrowBack />
            </IconButton>
            <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ 
              fontWeight: 600,
              textAlign: isMobile ? 'center' : 'left'
            }}>
              Your Shopping Cart
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShoppingCart fontSize="large" />
            <Typography variant="h6">
              ({getCartCount()} {getCartCount() === 1 ? 'item' : 'items'})
            </Typography>
          </Box>
        </Box>

        {cart.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            p: 4,
            backgroundColor: theme.palette.action.hover,
            borderRadius: 1
          }}>
            <ShoppingCart sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom>Your cart is empty</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Looks like you haven't added anything to your cart yet
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/')}
              sx={{
                fontWeight: 600,
                px: 4,
                py: 1.5
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <>
            <List sx={{ 
              maxHeight: 500, 
              overflow: 'auto',
              mb: 3,
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
              {cart.map((item) => (
                <React.Fragment key={item.cartId}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={() => removeFromCart(item.cartId)}
                        aria-label="remove"
                      >
                        <Delete />
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
                      src={item.imageUrl?.startsWith('http') ? item.imageUrl : `${backendURL}${item.imageUrl?.startsWith('/') ? item.imageUrl : '/' + item.imageUrl}`}
                      alt={item.name} 
                      sx={{ 
                        width: isMobile ? 48 : 64, 
                        height: isMobile ? 48 : 64, 
                        mr: isMobile ? 2 : 3,
                        borderRadius: 1
                      }}
                    />
                    <ListItemText 
                      primary={
                        <Typography variant={isMobile ? 'body1' : 'h6'} fontWeight={500}>
                          {item.name}
                        </Typography>
                      } 
                      secondary={
                        <>
                          <Typography variant="body1" color="primary" fontWeight={600}>
                            ${item.price} {item.quantity > 1 && `× ${item.quantity}`}
                          </Typography>
                          {item.brand && (
                            <Typography variant="body2" color="text.secondary">
                              Brand: {item.brand}
                            </Typography>
                          )}
                        </>
                      } 
                      sx={{ mr: 2 }}
                    />
                  </ListItem>
                  <Divider sx={{ my: 2 }} />
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ 
              backgroundColor: theme.palette.action.hover,
              p: 3,
              borderRadius: 1,
              mb: 3
            }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                mb: 2
              }}>
                <Typography variant="h6">Subtotal:</Typography>
                <Typography variant="h6" fontWeight={700}>${getTotal()}</Typography>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                mb: 2
              }}>
                <Typography variant="h6">Pickup:</Typography>
                <Typography variant="h6" color="success.main" fontWeight={700}>FREE</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between'
              }}>
                <Typography variant="h5" fontWeight={700}>Total:</Typography>
                <Typography variant="h5" fontWeight={700}>${getTotal()}</Typography>
              </Box>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              gap: isMobile ? 1 : 2,
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                size="large"
                onClick={() => navigate('/')}
                sx={{
                  fontWeight: 600,
                  py: 1.5,
                  borderRadius: 1,
                }}
              >
                Continue Shopping
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                startIcon={<LocalShipping />}
                onClick={handleCheckout}
                sx={{
                  fontWeight: 600,
                  py: 1.5,
                  borderRadius: 1,
                }}
              >
                Checkout Now
              </Button>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: isMobile ? 'flex-start' : 'center', 
              mt: 3,
              color: 'text.secondary',
              p: isMobile ? 1.5 : 2,
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
              borderRadius: 1,
              flexDirection: isMobile ? 'column' : 'row',
              textAlign: isMobile ? 'center' : 'left'
            }}>
              <VerifiedUser fontSize={isMobile ? 'medium' : 'large'} sx={{ 
                mr: isMobile ? 0 : 2, 
                mb: isMobile ? 1 : 0,
                color: theme.palette.success.main 
              }} />
              <Box>
                <Typography variant="body1" fontWeight={500}>
                  Secure Checkout
                </Typography>
                <Typography variant="body2">
                  Your items will be available for pickup at the gym tomorrow morning
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default GymCart;