import { Box, Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GymContext } from '../context/GymContext';

const SignForm = () => {
  const { backendURL } = useContext(GymContext);
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendURL}/login`, inputs, {
        withCredentials: true
      });

      const user = res.data.user;

      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }));

      try {
        const admissionRes = await axios.get(`${backendURL}/getAdmissionByEmail/${user.email}`, {
          withCredentials: true
        });

        if (admissionRes.status === 200 && admissionRes.data) {
          localStorage.setItem('admission', JSON.stringify(admissionRes.data));
        }
      } catch (err) {
        localStorage.removeItem('admission');
      }

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
            padding: { xs: '1.5rem', sm: '2.5rem' },
            boxShadow: '0px 6px 30px rgba(0,0,0,0.6)',
            color: 'white',
           
            boxSizing: 'border-box',
            position: 'relative'
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
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#444',
                },
                '&:hover fieldset': {
                  borderColor: '#ff416c',
                },
              }
            }}
          />

          <TextField
            name="password"
            variant="outlined"
            label="Password"
            margin="normal"
            required
            fullWidth
            type={showPassword ? 'text' : 'password'}
            value={inputs.password}
            onChange={inputHandler}
            InputProps={{
              style: { color: 'white' },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    sx={{ color: '#ccc' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            InputLabelProps={{ style: { color: '#ccc' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#444',
                },
                '&:hover fieldset': {
                  borderColor: '#ff416c',
                },
              }
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
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

          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            <Link to="" style={{ color: '#ccc', textDecoration: 'none' }}>
              Forgot Password?
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