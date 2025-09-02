// OrdersPage.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, List, ListItem, Divider, Chip, ListItemAvatar, Avatar } from '@mui/material';
import { LocalShipping, CheckCircle, AccessTime } from '@mui/icons-material';
import axios from 'axios';
import { useContext } from 'react';
import { GymContext } from '../../context/GymContext';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { backendURL } = useContext(GymContext);
  const user = JSON.parse(localStorage.getItem('user'));

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
      <Typography variant="h4" gutterBottom sx={{color:'white'}}> My Orders</Typography>
      
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
                        src={backendURL+`${item.imageUrl}`} 
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