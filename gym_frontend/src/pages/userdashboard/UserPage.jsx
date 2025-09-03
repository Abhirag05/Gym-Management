import React, { useState, useContext, useEffect } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  IconButton,
  Avatar,
  Divider,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EventIcon from '@mui/icons-material/Event';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { GymContext } from '../../context/GymContext';
import axios from 'axios';
import AssignmentIcon from '@mui/icons-material/Assignment';
const drawerWidth = 240;

const navItems = [
  { text: 'Home', icon: <HomeIcon />, path: 'profile' },
  { text: 'Take Admission', icon: <AssignmentIcon />, path: 'useradmission' },
  { text: 'Training schedule', icon: <FitnessCenterIcon />, path: 'usershedule' },
  { text: 'Membership Status', icon: <EventIcon />, path: 'userplans' },
  { text: 'Gym Store', icon: <LocalGroceryStoreIcon />, path: 'gymstore' },
];

const UserPage = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { backendURL } = useContext(GymContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(!isMobile);

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${backendURL}/logout`, {}, { withCredentials: true });
      localStorage.removeItem('user');
      localStorage.removeItem('admission');
      navigate('/sign');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: `linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #2e2e2e 50%, #1a1a1a 75%, #000000 100%)`,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>

          <Avatar
            alt="Fit For Fight Logo"
            src={logo}
            sx={{
              mr: 2,
              width: { xs: 45, sm: 60 },
              height: { xs: 45, sm: 60 },
              border: '2px solid #fff',
              transition: '0.3s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          />

          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              color: 'error.main',
              letterSpacing: '1px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontSize: { xs: '1.1rem', sm: '1.5rem' }
            }}
          >
            Fit For Fight
          </Typography>

          <Button
            onClick={handleLogout}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '8px',
              textTransform: 'none',
              padding: '8px 22px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
                background: 'linear-gradient(135deg, #ff4b2b 0%, #ff416c 100%)',
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flexGrow: 1, pt: '64px' }}>
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={open}
          onClose={toggleDrawer}
          sx={{
            width: open ? drawerWidth : 60,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            [`& .MuiDrawer-paper`]: {
              transition: '0.3s',
              overflowX: 'hidden',
              width: isMobile ? drawerWidth : (open ? drawerWidth : 60),
              backgroundColor: '#1a1a1a',
              color: '#fff',
              borderRight: '1px solid #2e2e2e',
            },
          }}
        >
          <Toolbar />
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem
                key={item.text}
                component={Link}
                to={item.path}
                selected={location.pathname.includes(item.path)}
                sx={{
                  px: 2,
                  py: 1.5,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#333',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#ff416c',
                    '&:hover': { backgroundColor: '#ff416c' },
                  },
                }}
              >
                <Tooltip title={!open ? item.text : ''} placement="right">
                  <ListItemIcon sx={{ color: '#fff', minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
                    {item.icon}
                  </ListItemIcon>
                </Tooltip>
                {open && <ListItemText primary={item.text} />}
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: '#121212',
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default UserPage;