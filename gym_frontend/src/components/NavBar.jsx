import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Box sx={{ 
      flexGrow: 1, 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1100,
      width: '100%',
      backgroundColor: 'rgba(15, 15, 15, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
    }}>
      <AppBar position="static" sx={{ 
        background: `
          linear-gradient(135deg, 
            #000000 0%, 
            #1a1a1a 25%, 
            #2e2e2e 50%, 
            #1a1a1a 75%, 
            #000000 100%
          ),
          linear-gradient(to right, 
            rgba(255,255,255,0.1) 0%, 
            rgba(255,255,255,0) 20%, 
            rgba(255,255,255,0.1) 40%, 
            rgba(255,255,255,0.05) 60%, 
            rgba(255,255,255,0) 100%
          )
        `,
      }}>
        <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px'
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1
          }}>
            <Avatar
              alt="Fit For Fight Logo" 
              src={logo}
              sx={{ 
                mr: 2,
                width: 60, 
                height: 60,
                border: '2px solid #fff',
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.3s ease'
                }
              }} 
            />
            <Typography variant="h5" component="div" sx={{
              fontWeight: 'bold',
               color: 'white',
              letterSpacing: '1px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              '@media (max-width: 600px)': {
                fontSize: '1.2rem',
                 color: '#ff416c',
              }
            }}>
              Fit For Fight
            </Typography>
          </Box>

          <Box sx={{
            display: 'flex',
            gap: '8px',
            '@media (max-width: 400px)': {
              gap: '4px'
            }
          }}>
            <Link to='/'>
              <Button sx={{ 
                fontWeight: 500, 
                color: 'white',
                minWidth: 'auto',
                padding: '6px 12px',
                '@media (max-width: 400px)': {
                  fontSize: '0.875rem',
                  padding: '6px 8px'
                }
              }}>
                Home
              </Button>
            </Link>
            <Link to='/contact'>
              <Button sx={{ 
                fontWeight: 500,
                color: 'white',
                minWidth: 'auto',
                padding: '6px 12px',
                '@media (max-width: 400px)': {
                  fontSize: '0.875rem',
                  padding: '6px 8px'
                }
              }}>
                Contact
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;