import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GymContext } from '../../context/GymContext';

const Products = () => {
  const{backendURL} = useContext(GymContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(backendURL+'/viewproducts');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(backendURL+`/products/${id}`);
      fetchProducts(); // Refresh the list after deletion
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/addproduct/${id}`);
  };

  if (loading) return <Typography>Loading products...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

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
        Product Details
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
                  Title
                </TableCell>
                {!isMediumScreen && (
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', py: isSmallScreen ? 1 : 2 }}>
                    Price
                  </TableCell>
                )}
                <TableCell sx={{ color: 'white', fontWeight: 'bold', py: isSmallScreen ? 1 : 2 }}>
                  Description
                </TableCell>
                {!isSmallScreen && (
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', py: isSmallScreen ? 1 : 2 }}>
                    Category
                  </TableCell>
                )}
                <TableCell sx={{ color: 'white', fontWeight: 'bold', py: isSmallScreen ? 1 : 2 }}>
                  Image
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', py: isSmallScreen ? 1 : 2 }}>
                  Stock
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', py: isSmallScreen ? 1 : 2 }}>
                  Brand
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', py: isSmallScreen ? 1 : 2 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ color: 'gray' }}>
                    No products found.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow
                    key={product._id}
                    hover
                    sx={{
                      '&:hover': { backgroundColor: '#2a2a2a' },
                    }}
                  >
                    <TableCell sx={{ color: 'white', py: isSmallScreen ? 1 : 2 }}>
                      {product.name}
                    </TableCell>
                    {!isMediumScreen && (
                      <TableCell sx={{ color: 'white', py: isSmallScreen ? 1 : 2 }}>
                        ${product.price}
                      </TableCell>
                    )}
                    <TableCell sx={{ color: 'white', py: isSmallScreen ? 1 : 2 }}>
                      {product.description}
                    </TableCell>
                    {!isSmallScreen && (
                      <TableCell sx={{ color: 'white', py: isSmallScreen ? 1 : 2 }}>
                        {product.category}
                      </TableCell>
                    )}
                    <TableCell sx={{ color: 'white', py: isSmallScreen ? 1 : 2 }}>
                      {product.imageUrl && (
                        <img 
                          src={backendURL+`${product.imageUrl}`} 
                          alt={product.name} 
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      )}
                    </TableCell>
                    <TableCell sx={{ color: 'white', py: isSmallScreen ? 1 : 2 }}>
                      {product.stock}
                    </TableCell>
                    <TableCell sx={{ color: 'white', py: isSmallScreen ? 1 : 2 }}>
                      {product.brand}
                    </TableCell>
                    <TableCell sx={{ py: isSmallScreen ? 1 : 2 }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Edit" arrow>
                          <IconButton
                            size="small"
                            sx={{ color: '#4fc3f7' }}
                            onClick={() => handleEdit(product._id)}
                          >
                            <Edit fontSize={isSmallScreen ? 'small' : 'medium'} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            size="small"
                            sx={{ color: '#ff5252' }}
                            onClick={() => handleDelete(product._id)}
                          >
                            <Delete fontSize={isSmallScreen ? 'small' : 'medium'} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Products;