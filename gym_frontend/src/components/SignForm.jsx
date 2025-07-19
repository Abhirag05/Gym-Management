import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GymContext } from '../context/GymContext';


const SignForm = () => {
  const{backendURL} = useContext(GymContext);

  const [inputs, setInputs] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${backendURL}/login`, inputs, {
      withCredentials: true // ✅ Send cookies with the request
    });

    const user = res.data.user;

    // ✅ Store only non-sensitive info (no password)
    localStorage.setItem('user', JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    }));

    try {
      const admissionRes = await axios.get(`${backendURL}/getAdmissionByEmail/${user.email}`, {
        withCredentials: true // ✅ Include token cookie in protected request
      });

      if (admissionRes.status === 200 && admissionRes.data) {
        localStorage.setItem('admission', JSON.stringify(admissionRes.data));
      }
    } catch (err) {
      localStorage.removeItem('admission');
    }

    // ✅ Redirect based on role
    if (user.isAdmin) {
      navigate('/admin');
    } else {
      navigate('/user');
    }

  } catch (err) {
    console.error("Login Error:", err);
    alert('Invalid email or password');
  }
};


  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        boxSizing: 'border-box',
        width: '100vw',
        overflowX: 'hidden'
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '350px', padding: '0 1rem' }}>
        <Box
          sx={{
            width: '100%',
            background: 'rgba(0, 0, 0, 0.65)',
            borderRadius: '12px',
            padding: '2.5rem',
            boxShadow: '0px 6px 30px rgba(0,0,0,0.6)',
            color: 'white',
            WebkitBackdropFilter: 'blur(10px)',
            boxSizing: 'border-box'
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: '#ff416c',
              fontWeight: 'bold',
              marginBottom: '2rem',
              textAlign: 'left',
            }}
          >
            Sign In
          </Typography>

          <TextField
            name="email"
            variant="outlined"
            label="Email"
            margin="normal"
            required
            fullWidth
            type="email"
            value={inputs.email}
            onChange={inputHandler}
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
            Sign In
          </Button>

          <Typography variant="body2" sx={{ mt: 2, textAlign: 'left' }}>
            <Link to="" style={{ color: '#ccc', textDecoration: 'none' }}>
              <p style={{ textAlign: 'center' }}>Forgot Password?</p>
            </Link>
          </Typography>

          <Box sx={{ textAlign: 'left', mt: 2 }}>
            <Typography variant="body2" component="span">
              New to Fit4Fight?
            </Typography>{' '}
            <Link to="/reg" style={{ color: '#ccc', textDecoration: 'none' }}>
              <Button variant="text" sx={{ color: '#ff416c', textTransform: 'none' }}>
                SignUp Now!
              </Button>
            </Link>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default SignForm;