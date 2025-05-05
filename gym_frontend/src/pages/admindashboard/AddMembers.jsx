import { Box, Button, MenuItem, TextField, Typography, Paper, Snackbar, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const AddMembers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editId = location.state?.id;

  const [inputs, setInputs] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    fitnessgoal: '',
    selectedplan: '',
    payment: {
      method: 'offline', // or 'offline' for admin-created
      status: 'completed' // or 'pending'/'failed'
    }
  });

  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    fitnessgoal: '',
    selectedplan: '',
  });

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    if (editId) {
      axios
        .get(`http://localhost:3004/viewadmission/${editId}`)
        .then((res) => {
          setInputs(res.data);
        })
        .catch((err) => {
          console.error('Error loading admission:', err);
          showNotification('Could not load member details', 'error');
        });
    }
  }, [editId]);

  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'fullname':
        if (!value.trim()) error = 'Full name is required';
        else if (!/^[a-zA-Z ]+$/.test(value)) error = 'Name should contain only letters';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
        break;
      case 'phonenumber':
        if (!value) error = 'Phone number is required';
        else if (!/^\d{10}$/.test(value)) error = 'Phone number must be 10 digits';
        break;
      case 'fitnessgoal':
      case 'selectedplan':
        if (!value) error = 'This field is required';
        break;
      default:
        break;
    }
    
    return error;
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
    
    // Validate on change but don't show error until blur
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(inputs).forEach(key => {
      const error = validateField(key, inputs[key]);
      newErrors[key] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification('Please fix all errors before submitting', 'error');
      return;
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:3004/updateadmission/${editId}`, inputs);
        showNotification('Member updated successfully!');
      } else {
        await axios.post('http://localhost:3004/admission/', inputs);
        showNotification('Member added successfully!');
      }

      // Clear form and navigate after success
      setTimeout(() => {
        setInputs({
          fullname: '',
          email: '',
          phonenumber: '',
          fitnessgoal: '',
          selectedplan: '',
        });
        navigate('/admin/details');
      }, 1500);
    } catch (err) {
      console.error('Error submitting form:', err);
      showNotification(err.response?.data?.message || 'Failed to submit form', 'error');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 500,
          padding: 4,
          borderRadius: 3,
          backgroundColor: '#1e1e1e',
          color: 'white',
        }}
      >
        <Typography variant="h5" sx={{ color: '#ff416c', fontWeight: 'bold', mb: 3 }}>
          {editId ? 'Edit Member' : 'Add New Member'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="fullname"
            label="Full Name"
            fullWidth
            required
            margin="normal"
            value={inputs.fullname}
            onChange={inputHandler}
            onBlur={handleBlur}
            error={!!errors.fullname}
            helperText={errors.fullname}
            InputLabelProps={{ style: { color: '#ccc' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            name="email"
            label="Email Address"
            fullWidth
            required
            margin="normal"
            type="email"
            value={inputs.email}
            onChange={inputHandler}
            onBlur={handleBlur}
            error={!!errors.email}
            helperText={errors.email}
            InputLabelProps={{ style: { color: '#ccc' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            name="phonenumber"
            label="Phone Number"
            fullWidth
            required
            margin="normal"
            type="tel"
            value={inputs.phonenumber}
            onChange={inputHandler}
            onBlur={handleBlur}
            error={!!errors.phonenumber}
            helperText={errors.phonenumber}
            InputLabelProps={{ style: { color: '#ccc' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            name="fitnessgoal"
            label="Fitness Goal"
            select
            fullWidth
            required
            margin="normal"
            value={inputs.fitnessgoal}
            onChange={inputHandler}
            onBlur={handleBlur}
            error={!!errors.fitnessgoal}
            helperText={errors.fitnessgoal}
            InputLabelProps={{ style: { color: '#ccc' } }}
            InputProps={{ style: { color: 'white' } }}
          >
            <MenuItem value="bulk">Bulk</MenuItem>
            <MenuItem value="strength training">Strength Training</MenuItem>
            <MenuItem value="muscle building">Muscle Building</MenuItem>
            <MenuItem value="combat training">Combat Training</MenuItem>
            <MenuItem value="fat loss">Fat Loss</MenuItem>
          </TextField>

          <TextField
            name="selectedplan"
            label="Select Plan"
            select
            fullWidth
            required
            margin="normal"
            value={inputs.selectedplan}
            onChange={inputHandler}
            onBlur={handleBlur}
            error={!!errors.selectedplan}
            helperText={errors.selectedplan}
            InputLabelProps={{ style: { color: '#ccc' } }}
            InputProps={{ style: { color: 'white' } }}
          >
            <MenuItem value="Basic Plan">Basic Plan</MenuItem>
            <MenuItem value="Premium Plan">Premium Plan</MenuItem>
            <MenuItem value="Pro Plan">Pro Plan</MenuItem>
            <MenuItem value="Personal Training">Personal Training</MenuItem>
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: '#ff416c',
              color: 'white',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#e13c5c',
              },
            }}
          >
            {editId ? 'Update Member' : 'Add Membership'}
          </Button>
        </Box>
      </Paper>

      {/* Notification System */}
      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setNotification(prev => ({ ...prev, open: false }))}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddMembers;