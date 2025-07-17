import {
  Box,
  Paper,
  Typography,
  Chip,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Search,
  Delete,
  Mail,
  Phone,
  Person,
} from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GymContext } from '../../context/GymContext';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  fontFamily: 'Segoe UI, sans-serif',
  backgroundColor: '#1a1a1a',
  color: '#fff',
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#2a2a2a',
    color: '#ff416c',
    fontWeight: 'bold',
  },
  '& .MuiDataGrid-row': {
    backgroundColor: '#1f1f1f',
  },
  '& .MuiDataGrid-cell': {
    borderRight: '1px solid #333',
    color: '#ddd',
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: '#2c2c2c',
  },
  '& .MuiDataGrid-footerContainer': {
    backgroundColor: '#2a2a2a',
    color: '#fff',
  },
  '& .MuiDataGrid-toolbarContainer': {
    padding: theme.spacing(1, 2),
    backgroundColor: '#262626',
    color: '#fff',
  },
  '& .MuiDataGrid-columnSeparator': {
    display: 'none',
  },
}));

const ContactDetails = () => {
  const{backendURL} = useContext(GymContext);
  const [contacts, setContacts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const delValue = (id) => {
    axios
      .delete(backendURL+`/dltmsg/${id}`)
      .then((res) => {
        toast.success(res.data.Message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      })
      .catch((error) => {
        toast.error('Failed to delete the message.', {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        console.error('Delete error:', error);
      });
  };

  useEffect(() => {
    axios
      .get(backendURL+'/viewcontact')
      .then((response) => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching contacts:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredContacts = contacts.filter((contact) =>
    Object.values(contact).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    {
      field: 'fullname',
      headerName: 'Full Name',
      width: isSmallScreen ? 150 : 180,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Person sx={{ mr: 1, color: '#ff416c', fontSize: isSmallScreen ? '1rem' : '1.25rem' }} />
          {params.value}
        </Box>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      width: isSmallScreen ? 180 : 220,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Mail sx={{ mr: 1, color: '#4fc3f7', fontSize: isSmallScreen ? '1rem' : '1.25rem' }} />
          <a
            href={`mailto:${params.value}`}
            style={{ color: 'white', textDecoration: 'none', fontSize: isSmallScreen ? '0.875rem' : '1rem' }}
          >
            {params.value}
          </a>
        </Box>
      ),
    },
    ...(!isSmallScreen ? [{
      field: 'phonenumber',
      headerName: 'Phone',
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Phone sx={{ mr: 1, color: '#81c784', fontSize: isSmallScreen ? '1rem' : '1.25rem' }} />
          <a
            href={`tel:${params.value}`}
            style={{ color: 'white', textDecoration: 'none', fontSize: isSmallScreen ? '0.875rem' : '1rem' }}
          >
            {params.value}
          </a>
        </Box>
      ),
    }] : []),
    ...(!isMediumScreen ? [{
      field: 'message',
      headerName: 'Message',
      width: isSmallScreen ? 200 : 350,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            lineHeight: '1.3',
            maxHeight: '3.9em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            color: '#ccc',
            fontSize: isSmallScreen ? '0.875rem' : '1rem',
          }}
        >
          {params.value}
        </Typography>
      ),
    }] : []),
    {
      field: 'actions',
      headerName: '',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => delValue(params.row._id)}
          aria-label="delete"
          size={isSmallScreen ? 'small' : 'medium'}
        >
          <Delete fontSize={isSmallScreen ? 'small' : 'medium'} />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ 
      mt: 4, 
      px: isSmallScreen ? 1 : 3,
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
        Contact Messages
      </Typography>

      <Box
        sx={{
          mb: 3,
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isSmallScreen ? 'flex-start' : 'center',
          gap: isSmallScreen ? 2 : 0,
        }}
      >
        <Chip
          label={`${contacts.length} messages`}
          sx={{
            backgroundColor: '#ff416c',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: isSmallScreen ? '0.875rem' : '1rem',
          }}
        />
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search messages..."
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#ccc' }} />
              </InputAdornment>
            ),
            style: { color: 'white', fontSize: isSmallScreen ? '0.875rem' : '1rem' },
          }}
          InputLabelProps={{ style: { color: '#ccc' } }}
          sx={{
            width: isSmallScreen ? '100%' : 300,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#2a2a2a',
              borderRadius: '8px',
            },
          }}
        />
      </Box>

      <Paper
        elevation={6}
        sx={{
          height: isSmallScreen ? '60vh' : '70vh',
          backgroundColor: '#1a1a1a',
          borderRadius: 2,
          overflow: 'hidden',
          width: '100%',
          maxWidth: '1100px',
          mx: 'auto',
        }}
      >
        <StyledDataGrid
          rows={filteredContacts}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          loading={loading}
          sx={{
            '& .MuiDataGrid-cell': {
              fontSize: isSmallScreen ? '0.875rem' : '1rem',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontSize: isSmallScreen ? '0.875rem' : '1rem',
            },
          }}
        />
      </Paper>

      <ToastContainer />
    </Box>
  );
};

export default ContactDetails;