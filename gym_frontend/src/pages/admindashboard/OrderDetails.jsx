import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`http://localhost:3004/vieworders`);
                setOrders(res.data);
            } catch (err) {
                console.error('Error fetching orders:', err);
            }
        };
        fetchOrders();
    }, []);

    return (
        <Box sx={{ 
            mt: 4, 
            px: { xs: 2, sm: 3 },
            width: '100%',
            overflow: 'hidden'
        }}>
            <Typography
                variant={isSmallScreen ? 'h5' : 'h4'}
                gutterBottom
                sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    mb: 3,
                    textAlign: 'left',
                }}
            >
                Order Details
            </Typography>

            <Paper
                elevation={6}
                sx={{
                    backgroundColor: '#1f1f1f',
                    padding: { xs: 1, sm: 3 },
                    borderRadius: 2,
                    width: '100%',
                    overflowX: 'auto',
                }}
            >
                <TableContainer sx={{ maxWidth: '100%' }}>
                    <Table sx={{ minWidth: isSmallScreen ? 600 : 'auto' }}>
                        <TableHead>
                            <TableRow
                                sx={{
                                    background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                                }}
                            >
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', py: isSmallScreen ? 1 : 2 }}>
                                    Order ID
                                </TableCell>
                                {!isMediumScreen && (
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold', py: isSmallScreen ? 1 : 2 }}>
                                        Products
                                    </TableCell>
                                )}
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', py: isSmallScreen ? 1 : 2 }}>
                                    Image
                                </TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', py: isSmallScreen ? 1 : 2 }}>
                                    Price
                                </TableCell>
                                {!isSmallScreen && (
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold', py: isSmallScreen ? 1 : 2 }}>
                                        Quantity
                                    </TableCell>
                                )}
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', py: isSmallScreen ? 1 : 2 }}>
                                    Status
                                </TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', py: isSmallScreen ? 1 : 2 }}>
                                    Order Date
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ color: 'gray' }}>
                                        No orders found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                orders.map((order) => (
                                    order.items.map((item, index) => (
                                        <TableRow
                                            key={`${order._id}-${index}`}
                                            hover
                                            sx={{
                                                '&:hover': { backgroundColor: '#2a2a2a' },
                                            }}
                                        >
                                            <TableCell sx={{ color: 'white', py: isSmallScreen ? 1 : 2 }}>
                                                {order._id.slice(-6).toUpperCase()}
                                            </TableCell>
                                            {!isMediumScreen && (
                                                <TableCell sx={{ color: 'white', py: isSmallScreen ? 1 : 2 }}>
                                                    {item.name}
                                                </TableCell>
                                            )}
                                            <TableCell sx={{ color: 'white', py: isSmallScreen ? 1 : 2 }}>
                                                {item.imageUrl && (
                                                    <img 
                                                    src={`http://localhost:3004${item.imageUrl}`} 
                                                        alt={item.name} 
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', py: isSmallScreen ? 1 : 2 }}>
                                                ${item.price.toFixed(2)}
                                            </TableCell>
                                            {!isSmallScreen && (
                                                <TableCell sx={{ color: 'white', py: isSmallScreen ? 1 : 2 }}>
                                                    {item.quantity}
                                                </TableCell>
                                            )}
                                            <TableCell sx={{ color: 'white', py: isSmallScreen ? 1 : 2 }}>
                                                {order.status}
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', py: isSmallScreen ? 1 : 2 }}>
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}

export default OrderDetails;