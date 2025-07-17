import { Box, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GymContext } from '../context/GymContext';

const RegistrationForm = () => {
  const{backendURL} = useContext(GymContext);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Username is required";
        else if (value.length < 3) error = "Username must be at least 3 characters";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 6) error = "Password must be at least 6 characters";
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
      name: validateField("name", inputs.name),
      email: validateField("email", inputs.email),
      password: validateField("password", inputs.password)
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setNotification({
        open: true,
        message: "Please fix all errors before submitting",
        severity: "error"
      });
      return;
    }

    try {
      await axios.post(backendURL+'/register/', inputs);
      setNotification({
        open: true,
        message: "Registration successful! Redirecting to login...",
        severity: "success"
      });
      setTimeout(() => navigate("/sign"), 1500);
    } catch (err) {
      console.error(err);
      setNotification({
        open: true,
        message: err.response?.data?.message || "Registration failed. Please try again.",
        severity: "error"
      });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',
      boxSizing: 'border-box',
      width: '100vw',
      overflowX: 'hidden'
    }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '350px', padding: '0 1rem' }}>
        <Box sx={{
          width: '100%',
          background: 'rgba(0, 0, 0, 0.65)',
          borderRadius: '12px',
          padding: '2.5rem',
          boxShadow: '0px 6px 30px rgba(0,0,0,0.6)',
          color: 'white',
          WebkitBackdropFilter: 'blur(10px)',
          boxSizing: 'border-box'
        }}>
          <Typography variant="h4" sx={{
            color: '#ff416c',
            fontWeight: 'bold',
            marginBottom: '2rem',
            textAlign: 'left',
          }}>
            Sign Up
          </Typography>

          <TextField
            name="name"
            variant="outlined"
            label="Username"
            margin="normal"
            required
            fullWidth
            value={inputs.name}
            onChange={inputHandler}
            onBlur={handleBlur}
            error={!!errors.name}
            helperText={errors.name}
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: '#ccc' } }}
          />

          <TextField
            name="email"
            variant="outlined"
            label="Email"
            margin="normal"
            required
            fullWidth
            value={inputs.email}
            onChange={inputHandler}
            onBlur={handleBlur}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: '#ccc' } }}
          />

          <TextField
            name="password"
            variant="outlined"
            label="Password"
            margin="normal"
            required
            fullWidth
            type="password"
            value={inputs.password}
            onChange={inputHandler}
            onBlur={handleBlur}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: '#ccc' } }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: 'white',
              color: '#ff416c',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#ff416c',
                color: 'white',
              },
            }}
          >
            Sign Up
          </Button>

          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            <Link to="" style={{ color: '#ccc', textDecoration: 'none' }}>
              Forgot Password?
            </Link>
          </Typography>

          <Box sx={{ textAlign: 'left', mt: 2 }}>
            <Typography variant="body2" component="span">
              Already have an account?
            </Typography>{' '}
            <Link to="/sign" style={{ textDecoration: 'none' }}>
              <Button variant="text" sx={{ color: '#ff416c', textTransform: 'none'}}>
                SignIn Now!
              </Button>
            </Link>
          </Box>
        </Box>
      </form>

      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbar-root': {
            width: '100%',
            maxWidth: '100%'
          }
        }}
      >
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
          sx={{ 
            width: '100%',
            maxWidth: '350px'
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegistrationForm;