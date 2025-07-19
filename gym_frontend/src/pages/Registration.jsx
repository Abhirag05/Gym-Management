import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Avatar, IconButton } from '@mui/material';
import logo from '../assets/logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import SignForm from '../components/SignForm';
import RegistrationForm from '../components/RegistrationForm';
import { ArrowBack } from '@mui/icons-material';
const Registration = () => {
  const navigate = useNavigate();
  return (
    <div className='Container'>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" sx={{ background: `
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
        `,}}>
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
      <Toolbar>
                     <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="back"
                        onClick={() => navigate('/')}
                        sx={{ mr: 2 }}
                      >
                        <ArrowBack />
                     </IconButton>
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
        <Typography variant="h6" component="div"  sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              color:'error',
              letterSpacing: '1px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              '@media (max-width: 600px)': {
                fontSize: '1.5rem',
               
              } 
            }}>
          Fit For Fight
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
   <Box
        sx={{
            flex: 1,
            position: 'relative',
            minHeight: 'calc(100vh - 128px)',
            background: `
              linear-gradient(
                rgba(7, 13, 19, 0.9), 
                rgba(10, 25, 41, 0.9)
              ),
              url('gym1.jpg')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2
          }}
        >
          
              <RegistrationForm/>
        </Box>
  <Footer/>
  </Box>
  </div>
  )
}

export default Registration