import React, { useState, useEffect, useContext } from 'react';
import {
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Paper,
  Chip,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  Divider,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { CloudUpload, AddPhotoAlternate } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { GymContext } from '../../context/GymContext';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const AddProduct = () => {
  const{backendURL} = useContext(GymContext);
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'supplements',
    stock: '',
    brand: '',
    flavors: [],
    sizes: [],
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const navigate = useNavigate();

  const categories = ['supplements', 'accessories', 'wearings'];
  const flavorOptions = ['Chocolate', 'Vanilla', 'Strawberry', 'Banana'];
  const sizeOptions = ['S', 'M', 'L', 'XL'];

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(backendURL+`/viewproducts/${id}`);
          const product = response.data;
          setFormData({
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            stock: product.stock,
            brand: product.brand,
            flavors: product.flavors || [],
            sizes: product.sizes || [],
          });
          if (product.imageUrl) {
            setExistingImage(product.imageUrl);
            setImagePreview(backendURL+`${product.imageUrl}`);
          }
        } catch (err) {
          setSnackbar({
            open: true,
            message: 'Failed to load product details',
            severity: 'error'
          });
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelect = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setExistingImage(null); // Clear existing image when new one is selected
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const data = new FormData();
    if (image) data.append('image', image);
    
    data.append('flavors', JSON.stringify(formData.flavors));
    data.append('sizes', JSON.stringify(formData.sizes));
    
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'flavors' && key !== 'sizes') {
        data.append(key, value);
      }
    });
  
    try {
      if (isEditMode) {
        await axios.put(backendURL+`/products/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        });
        setSnackbar({
          open: true,
          message: 'Product updated successfully!',
          severity: 'success'
        });
      } else {
        await axios.post(backendURL+'/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        });
        setSnackbar({
          open: true,
          message: 'Product added successfully!',
          severity: 'success'
        });
      }
      setTimeout(() => navigate('/admin/prod'), 500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || (isEditMode ? 'Failed to update product' : 'Failed to add product'),
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      p: 3, 
      maxWidth: 1200, 
      margin: '0 auto',
      minHeight: '100vh'
    }}>
      <Card sx={{ 
        mb: 4, 
        borderRadius: 3,
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
      }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 4,
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            pb: 3
          }}>
            <Avatar sx={{ 
              background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
              mr: 2,
              width: 56,
              height: 56
            }}>
              <AddPhotoAlternate fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ 
                fontWeight: 700,
                color: 'text.primary',
              }}>
                {isEditMode ? 'Edit Product' : 'Add New Product'}
              </Typography>
              <Typography variant="body1" sx={{ 
                color: 'text.secondary',
                mt: 0.5
              }}>
                {isEditMode ? 'Update the product details below' : 'Fill in the details below to add a new product'}
              </Typography>
            </Box>
          </Box>
          
          <Paper elevation={0} sx={{ 
            p: 4, 
            borderRadius: 3,
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            {/* Basic Information Section */}
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 600, 
                mb: 3,
                background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                color:'white',
                display: 'flex',
                alignItems: 'center',
              }}>
                <Box component="span" sx={{
                  width: 8,
                  height: 8,
                  background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                  borderRadius: '50%',
                  mr: 1.5,
                }} />
                Basic Information
              </Typography>
              
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Product Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    size="medium"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'rgba(0,0,0,0.02)'
                      }
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Brand Name"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    size="medium"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'rgba(0,0,0,0.02)'
                      }
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      label="Category"
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        backgroundColor: 'rgba(0,0,0,0.02)'
                      }}
                    >
                      {categories.map(category => (
                        <MenuItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Price ($)"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    inputProps={{ min: 0, step: 0.01 }}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'rgba(0,0,0,0.02)'
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 4, borderColor: 'rgba(0,0,0,0.08)' }} />

            {/* Inventory Section */}
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 600, 
                mb: 3,
                background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                color:'white',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Box component="span" sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  mr: 1.5
                }} />
                Inventory & Variants
              </Typography>
              
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Stock Quantity"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleChange}
                    inputProps={{ min: 0 }}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'rgba(0,0,0,0.02)'
                      }
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Tags</InputLabel>
                    <Select
                      multiple
                      name="flavors"
                      value={formData.flavors}
                      onChange={handleMultiSelect}
                      label="Tags"
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        backgroundColor: 'rgba(0,0,0,0.02)'
                      }}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map(value => (
                            <Chip 
                              key={value} 
                              label={value} 
                              size="small" 
                              sx={{ 
                                backgroundColor: 'primary.light',
                                color: 'white'
                              }} 
                            />
                          ))}
                        </Box>
                      )}
                    >
                      {flavorOptions.map(flavor => (
                        <MenuItem key={flavor} value={flavor}>
                          {flavor}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Sizes</InputLabel>
                    <Select
                      multiple
                      name="sizes"
                      value={formData.sizes}
                      onChange={handleMultiSelect}
                      label="Sizes"
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        backgroundColor: 'rgba(0,0,0,0.02)'
                      }}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map(value => (
                            <Chip 
                              key={value} 
                              label={value} 
                              size="small" 
                              sx={{ 
                                backgroundColor: 'secondary.light',
                                color: 'white'
                              }} 
                            />
                          ))}
                        </Box>
                      )}
                    >
                      {sizeOptions.map(size => (
                        <MenuItem key={size} value={size}>
                          {size}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 4, borderColor: 'rgba(0,0,0,0.08)' }} />

            {/* Description Section */}
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 600, 
                mb: 3,
                background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                color:'white',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Box component="span" sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  mr: 1.5
                }} />
                Product Description
              </Typography>
              
              <TextField
                fullWidth
                name="description"
                multiline
                rows={5}
                value={formData.description}
                onChange={handleChange}
                required
                variant="outlined"
                placeholder="Enter detailed product description..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'rgba(0,0,0,0.02)'
                  }
                }}
              />
            </Box>

            <Divider sx={{ my: 4, borderColor: 'rgba(0,0,0,0.08)' }} />

            {/* Image Upload Section */}
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 600, 
                mb: 3,
                background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                color:'white',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Box component="span" sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  mr: 1.5
                }} />
                Product Image
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' },
                gap: 3,
                alignItems: 'center'
              }}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUpload />}
                  sx={{
                    background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                    color:'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  Upload Image
                  <VisuallyHiddenInput 
                    type="file" 
                    onChange={handleImageChange} 
                    accept="image/*"
                  />
                </Button>
                
                {(imagePreview || existingImage) && (
                  <Box sx={{
                    width: 150,
                    height: 150,
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.1)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}>
                    <img 
                      src={imagePreview || backendURL+`${existingImage}`} 
                      alt="Preview" 
                      style={{ 
                        width: '100%', 
                        height: '100%',
                        objectFit: 'cover'
                      }} 
                    />
                  </Box>
                )}
                
                {!imagePreview && !existingImage && (
                  <Box sx={{
                    width: 150,
                    height: 150,
                    borderRadius: 2,
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'text.secondary'
                  }}>
                    <Typography variant="caption">
                      No image selected
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Submit Section */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              mt: 4,
              pt: 3,
              borderTop: '1px solid rgba(0,0,0,0.08)'
            }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                disabled={loading}
                sx={{ 
                  px: 6, 
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: 16,
                  background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                  color:'white',
                  boxShadow: '0 4px 12px rgba(255, 0, 0, 0.3)',
                  '&:hover': {
                    background: '#fff',
                    color:' #ff416c'
                  }
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  isEditMode ? 'Update Product' : 'Save Product'
                )}
              </Button>
            </Box>
          </Paper>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          severity={snackbar.severity} 
          sx={{ 
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddProduct;