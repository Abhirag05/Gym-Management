// OrdersPage.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, List, ListItem, Divider, Chip, ListItemAvatar, Avatar, Button, IconButton } from '@mui/material';
import { LocalShipping, CheckCircle, AccessTime, ArrowBack, ShoppingBag } from '@mui/icons-material';
import axios from 'axios';
import { useContext } from 'react';
import { GymContext } from '../../context/GymContext';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { backendURL } = useContext(GymContext);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(backendURL+`/orders/${user.id}`, {
          withCredentials: true
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };
    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed": return <CheckCircle color="success" />;
      case "Processing": return <AccessTime color="warning" />;
      default: return <LocalShipping color="info" />;
    }
  };

  return (
    <Box p={3}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <IconButton 
          onClick={() => navigate('/user/gymstore')}
          sx={{ 
            color: '#ff416c',
            '&:hover': {
              backgroundColor: 'rgba(255, 65, 108, 0.1)'
            }
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" sx={{color:'white', flexGrow: 1}}>
          My Orders
        </Typography>
        <Button
          variant="contained"
          startIcon={<ShoppingBag />}
          onClick={() => navigate('/user/gymstore')}
          sx={{
            background: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
            borderRadius: '50px',
            px: 3,
            py: 1,
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': {
              background: 'linear-gradient(45deg, #ff4b2b, #ff416c)',
            }
          }}
        >
          Back to Store
        </Button>
      </Box>
      
      {orders.length === 0 ? (
        <Typography>No orders yet</Typography>
      ) : (
        <List>
          {orders.map(order => (
            <Paper key={order._id} sx={{ mb: 2, p: 2 }}>
              <Box display="flex" justifyContent="space-between">
                <Typography>
                  <strong>Order #{order._id.slice(-6).toUpperCase()}</strong>
                </Typography>
                <Chip 
                  label={order.status} 
                  icon={getStatusIcon(order.status)}
                />
              </Box>
              
              <Typography variant="caption" color="text.secondary">
                {new Date(order.createdAt).toLocaleString()}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              {order.items.map((item, i) => (
                <ListItem key={i} sx={{ px: 0 }}>
                  <Box width="100%" display="flex" justifyContent="space-between">
                  <ListItemAvatar>
                      <Avatar 
                        variant="square"
                        src={`${backendURL}${item.imageUrl?.startsWith('/') ? item.imageUrl : '/' + item.imageUrl}`} 
                        alt={item.name}
                        sx={{ width: 60, height: 60, mr: 2 }}
                      />
                    </ListItemAvatar>
                    <Typography>
                     {item.name} × {item.quantity}
                    </Typography>
                    <Typography>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
              
              <Typography variant="subtitle1" align="right" mt={1}>
                Total: ${order.total.toFixed(2)}
              </Typography>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
};

export default OrdersPage;