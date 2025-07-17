import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme
} from '@mui/material';
import axios from 'axios';
import { GymContext } from '../../context/GymContext';

const Users = () => {
  const{backendURL} = useContext(GymContext);
  const [user, setUser] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    axios.get(backendURL+'/view')
      .then((response) => {
        setUser(response.data);
      });
  }, []);

  return (
    <Box sx={{ 
      mt: 4, 
      px: { xs: 2, sm: 3 },
      width: '100%',
      overflow: 'hidden'
    }}>
      <Typography
        variant={isSmallScreen ? 'h5' : 'h4'}
        gutterBottom
        sx={{
          color: 'white',
          fontWeight: 'bold',
          mb: 3,
          textAlign: 'left',
        }}
      >
        Registered Users
      </Typography>

      <Paper
        elevation={6}
        sx={{
          backgroundColor: '#1f1f1f',
          padding: { xs: 1, sm: 3 },
          borderRadius: 2,
          width: '100%',
          overflowX: 'auto',
        }}
      >
        <TableContainer sx={{ maxWidth: '100%' }}>
          <Table sx={{ minWidth: isSmallScreen ? 600 : 'auto' }}>
            <TableHead>
              <TableRow
                sx={{
                  background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                }}
              >
                <TableCell sx={{ 
                  color: 'white', 
                  fontWeight: 'bold',
                  py: isSmallScreen ? 1 : 2,
                  fontSize: isSmallScreen ? '0.875rem' : '1rem'
                }}>
                  User Name
                </TableCell>
                <TableCell sx={{ 
                  color: 'white', 
                  fontWeight: 'bold',
                  py: isSmallScreen ? 1 : 2,
                  fontSize: isSmallScreen ? '0.875rem' : '1rem'
                }}>
                  Email
                </TableCell>
                <TableCell sx={{ 
                  color: 'white', 
                  fontWeight: 'bold',
                  py: isSmallScreen ? 1 : 2,
                  fontSize: isSmallScreen ? '0.875rem' : '1rem'
                }}>
                  Password
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ color: 'gray' }}>
                    No registered users found.
                  </TableCell>
                </TableRow>
              ) : (
                user.map((val, index) => (
                  <TableRow
                    key={index}
                    hover
                    sx={{
                      '&:hover': { backgroundColor: '#2a2a2a' },
                    }}
                  >
                    <TableCell sx={{ 
                      color: 'white',
                      py: isSmallScreen ? 1 : 2,
                      fontSize: isSmallScreen ? '0.875rem' : '1rem'
                    }}>
                      {val.name}
                    </TableCell>
                    <TableCell sx={{ 
                      color: 'white',
                      py: isSmallScreen ? 1 : 2,
                      fontSize: isSmallScreen ? '0.875rem' : '1rem'
                    }}>
                      {val.email}
                    </TableCell>
                    <TableCell sx={{ 
                      color: 'white',
                      py: isSmallScreen ? 1 : 2,
                      fontSize: isSmallScreen ? '0.875rem' : '1rem'
                    }}>
                      {val.password}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Users;