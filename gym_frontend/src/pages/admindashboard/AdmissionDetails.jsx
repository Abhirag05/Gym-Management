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
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GymContext } from '../../context/GymContext';

const AdmissionDetails = () => {
  const{backendURL} = useContext(GymContext);
  const [admissions, setAdmissions] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    axios
      .get(backendURL+'/viewadmission')
      .then((response) => {
        setAdmissions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching admissions:', error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this admission?')) {
      axios
        .delete(backendURL+`/deleteadmission/${id}`)
        .then((res) => {
          alert(res.data.Message || 'Admission deleted');
          setAdmissions((prev) => prev.filter((item) => item._id !== id));
        })
        .catch((err) => {
          console.error('Error deleting admission:', err);
          alert('Failed to delete admission.');
        });
    }
  };

  const handleEdit = (id) => {
    navigate("/admin/addmember", { state: { id } });
  };

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
        Admission Details
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
                <TableCell sx={{ color: 'white', fontWeight: 'bold', py: isSmallScreen ? 1 : 2 }}>
                  Full Name
                </TableCell>
                {!isMediumScreen && (
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', py: isSmallScreen ? 1 : 2 }}>
                    Email
                  </TableCell>
                )}
                <TableCell sx={{ color: 'white', fontWeight: 'bold', py: isSmallScreen ? 1 : 2 }}>
                  Phone
                </TableCell>
                {!isSmallScreen && (
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', py: isSmallScreen ? 1 : 2 }}>
                    Fitness Goal
                  </TableCell>
                )}
                <TableCell sx={{ color: 'white', fontWeight: 'bold', py: isSmallScreen ? 1 : 2 }}>
                  Plan
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', py: isSmallScreen ? 1 : 2 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ color: 'gray' }}>
                    No registered users found.
                  </TableCell>
                </TableRow>
              ) : (
                admissions.map((val) => (
                  <TableRow
                    key={val._id}
                    hover
                    sx={{
                      '&:hover': { backgroundColor: '#2a2a2a' },
                    }}
                  >
                    <TableCell sx={{ color: 'white', py: isSmallScreen ? 1 : 2 }}>
                      {val.fullname}
                    </TableCell>
                    {!isMediumScreen && (
                      <TableCell sx={{ color: 'white', py: isSmallScreen ? 1 : 2 }}>
                        {val.email}
                      </TableCell>
                    )}
                    <TableCell sx={{ color: 'white', py: isSmallScreen ? 1 : 2 }}>
                      {val.phonenumber}
                    </TableCell>
                    {!isSmallScreen && (
                      <TableCell sx={{ color: 'white', py: isSmallScreen ? 1 : 2 }}>
                        {val.fitnessgoal}
                      </TableCell>
                    )}
                    <TableCell sx={{ color: 'white', py: isSmallScreen ? 1 : 2 }}>
                      {val.selectedplan}
                    </TableCell>
                    <TableCell sx={{ py: isSmallScreen ? 1 : 2 }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Edit" arrow>
                          <IconButton
                            size="small"
                            sx={{ color: '#4fc3f7' }}
                            onClick={() => handleEdit(val._id)}
                          >
                            <Edit fontSize={isSmallScreen ? 'small' : 'medium'} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            size="small"
                            sx={{ color: '#ff5252' }}
                            onClick={() => handleDelete(val._id)}
                          >
                            <Delete fontSize={isSmallScreen ? 'small' : 'medium'} />
                          </IconButton>
                        </Tooltip>
                      </Box>
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

export default AdmissionDetails;