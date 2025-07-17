import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Box, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const Contact = () => {
  const [inputs, setInputs] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    message: '',
  });

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

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
      case 'message':
        if (!value.trim()) error = 'Message is required';
        break;
      default:
        break;
    }
    return error;
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateForm = () => {
    const newErrors = {
      fullname: validateField('fullname', inputs.fullname),
      email: validateField('email', inputs.email),
      phonenumber: validateField('phonenumber', inputs.phonenumber),
      message: validateField('message', inputs.message),
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setNotification({
        open: true,
        message: 'Please fix all errors before submitting',
        severity: 'error',
      });
      return;
    }

    try {
      await axios.post(backendURL+'/contact/', inputs);
      setNotification({
        open: true,
        message: 'Message sent successfully!',
        severity: 'success',
      });
      setInputs({
        fullname: '',
        email: '',
        phonenumber: '',
        message: '',
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setNotification({
        open: true,
        message: 'Failed to send message. Please try again.',
        severity: 'error',
      });
    }
  };

  return (
    <div className='Container'>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .Container {
          background: linear-gradient(to bottom right, #252424, #1a1a1a, #262626);
          color: white;
          min-height: 100vh;
        }
      `}</style>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar />
        
        <Box
          sx={{
            flex: 1,
            position: 'relative',
            backgroundImage: 'url(gym3.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:'60px'
          }}
        >
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1
          }} />
          <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: '1rem' }}>
              Contact Us
            </h2>    
          </Box>
        </Box>
        <Box sx={{ textAlign: "center" }} className="description">
          <h3>"Keep In Touch With Us By The given Form"</h3>
        </Box>
        <Box
          sx={{
            maxWidth: '500px',
            margin: '0 auto',
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0px 4px 20px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            mt: 4,
            mb: 10
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: ' #ff416c' }}>
            Contact Form
          </Typography>

          <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="fullname"
              autoComplete="name"
              autoFocus
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: '#ccc' } }}
              value={inputs.fullname}
              onChange={inputHandler}
              onBlur={handleBlur}
              error={!!errors.fullname}
              helperText={errors.fullname}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: '#ccc' } }}
              value={inputs.email}
              onChange={inputHandler}
              onBlur={handleBlur}
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="phonenumber"
              label="Phone Number"
              type="tel"
              id="phone"
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: '#ccc' } }}
              value={inputs.phonenumber}
              onChange={inputHandler}
              onBlur={handleBlur}
              error={!!errors.phonenumber}
              helperText={errors.phonenumber}
            />

            <TextField
              margin="normal"
              fullWidth
              name="message"
              label="Your Message"
              id="goals"
              multiline
              rows={4}
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: '#ccc' } }}
              value={inputs.message}
              onChange={inputHandler}
              onBlur={handleBlur}
              error={!!errors.message}
              helperText={errors.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                borderRadius: '30px',
                mt: 3,
                mb: 2,
                backgroundColor: 'white',
                color: '#ff416c',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#ff416c',
                  color: 'white'
                }
              }}
            >
              Send Message
            </Button>
          </Box>
        </Box>
        
        <Footer />
      </Box>

      {/* Notification System */}
      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{ 
            width: '100%',
            backgroundColor: notification.severity === 'success' ? '#4caf50' : '#f44336',
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Contact;