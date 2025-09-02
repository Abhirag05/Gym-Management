import React, { useState, useEffect } from 'react';
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
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import { Link, Outlet, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InventoryIcon from '@mui/icons-material/Inventory';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LocalMallIcon from '@mui/icons-material/LocalMall';

import logo from '../../assets/logo.jpg';

const drawerWidth = 240;

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { text: 'Admissions', icon: <AssignmentIcon />, path: '/admin/details' },
  { text: 'Users', icon: <PeopleIcon />, path: '/admin/members' },
  { text: 'Add Members', icon: <AddIcon />, path: '/admin/addmember' },
  { text: 'Messages', icon: <ContactMailIcon />, path: '/admin/contactadmin' },
  { text: 'Add Products', icon: <InventoryIcon />, path: '/admin/addproduct' },
  { text: 'Products', icon: <ProductionQuantityLimitsIcon />, path: '/admin/prod' },
  { text: 'Order Details', icon: <LocalMallIcon />, path: '/admin/orderdetails' },
];

const AdminPage = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(!isMobile); // Closed on mobile, open on desktop

  // Sync state when screen size changes
  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #2e2e2e 50%, #1a1a1a 75%, #000000 100%)',
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
              width: 60,
              height: 60,
              border: '2px solid #fff',
              transition: '0.3s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          />

          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              color: 'error.main',
              letterSpacing: '1px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Fit For Fight
          </Typography>

          <Link to="/sign">
            <Button
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
              startIcon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 17L21 12M21 12L16 7M21 12H9M13 7V5C13 4.46957 12.7893 3.96086 
                  12.4142 3.58579C12.0391 3.21071 11.5304 3 11 3H5C4.46957 3 3.96086 3.21071 
                  3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 
                  3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H11C11.5304 21 12.0391 
                  20.7893 12.4142 20.4142C12.7893 20.0391 13 19.5304 13 19V17"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            >
              Logout
            </Button>
          </Link>
        </Toolbar>
      </AppBar>

      {/* Layout */}
      <Box sx={{ display: 'flex', flexGrow: 1, pt: '64px' }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: open ? drawerWidth : 60,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            [`& .MuiDrawer-paper`]: {
              transition: '0.3s',
              overflowX: 'hidden',
              width: open ? drawerWidth : 60,
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
                selected={location.pathname === item.path}
                sx={{
                  px: 2,
                  py: 1.5,
                  color: 'white',
                  '&:hover': { backgroundColor: '#333' },
                  '&.Mui-selected': {
                    backgroundColor: '#ff416c',
                    '&:hover': { backgroundColor: '#ff416c' },
                  },
                }}
              >
                <Tooltip title={!open ? item.text : ''} placement="right">
                  <ListItemIcon
                    sx={{
                      color: '#fff',
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </Tooltip>
                {open && <ListItemText primary={item.text} />}
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
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

export default AdminPage;
