import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Divider,
  Button,
  Chip,
  Grid,
  LinearProgress,
  Badge,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert
} from '@mui/material';
import {
  FitnessCenter,
  Email,
  Phone,
  CalendarToday,
  Payment,
  Person,
  Edit,
  Cancel,
  CardMembership,
  Star,
  AccessTime,
  CheckCircle,
  LocalOffer
} from '@mui/icons-material';
import { styled } from '@mui/system';
import AdmissionForm from '../../components/AdmissionForm';
import axios from 'axios';
import { GymContext } from '../../context/GymContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1e1e1e',
  padding: theme.spacing(4),
  borderRadius: '16px',
  maxWidth: '800px',
  width: '100%',
  color: 'white',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  border: '1px solid rgba(255, 65, 108, 0.1)',
  background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
}));

const FeatureChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: 'rgba(255, 65, 108, 0.1)',
  border: '1px solid rgba(255, 65, 108, 0.3)',
  color: '#ff9eaa',
}));

const UserPlans = () => {
  const [admission, setAdmission] = useState(null);
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const{backendURL} = useContext(GymContext);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const admissionData = localStorage.getItem('admission');

    if (!userData) return;

    const userInfo = JSON.parse(userData);
    setUser(userInfo);

    if (admissionData) {
      const admissionInfo = JSON.parse(admissionData);
      if (admissionInfo?.email === userInfo?.email) {
        setAdmission(admissionInfo);
      } else {
        setAdmission(null);
      }
    } else {
      setAdmission(null);
    }
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to cancel this membership?')) {
      axios
        .delete(backendURL+`/deleteadmission/${id}`)
        .then((res) => {
          setSnackbar({ open: true, message: res.data.Message || 'Membership canceled successfully.', severity: 'success' });
          localStorage.removeItem('admission');
          setAdmission(null);
        })
        .catch((err) => {
          console.error('Error cancelling membership:', err);
          setSnackbar({ open: true, message: 'Failed to cancel membership.', severity: 'error' });
        });
    }
  };

  const getPlanFeatures = (planName) => {
    const plans = {
      'Basic Plan': ['Gym Access', 'Locker Room', 'Basic Equipment', 'Limited Classes'],
      'Pro Plan': ['All Basic Features', 'Unlimited Classes', 'Sauna Access', 'Personal Trainer Discount'],
      'Premium Plan': ['All Standard Features', '24/7 Access', 'Free Personal Training', 'Massage Discounts', 'VIP Lounge'],
      'Personal Training': ['All Premium Features', 'Dedicated Trainer', 'Nutrition Planning', 'Complimentary Services', 'Priority Booking']
    };
    return plans[planName] || ['Gym Access', 'Standard Equipment'];
  };

  const calculateDaysLeft = (startDate) => {
  // Parse the start date
  const start = new Date(startDate);
  
  // Create end date (exactly 30 days later)
  const end = new Date(start);
  end.setDate(end.getDate() + 30);
  
  // Get current date (at midnight to ignore time)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // If current date is after end date, return 0
  if (today >= end) return 0;
  
  // Calculate difference in days
  const diffTime = end - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Ensure we don't return more than 30 days
  return Math.min(diffDays, 30);
};

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#121212',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
        py: 6,
      }}
    >
      {admission ? (
        <StyledPaper elevation={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <Tooltip title="Active Member">
                    <Avatar sx={{ width: 24, height: 24, bgcolor: '#4caf50', border: '2px solid #1e1e1e' }}>
                      <CheckCircle sx={{ fontSize: 16 }} />
                    </Avatar>
                  </Tooltip>
                }
              >
                <Avatar
                  sx={{
                    bgcolor: '#ff416c',
                    width: 64,
                    height: 64,
                    fontSize: '1.5rem',
                    boxShadow: '0 0 0 2px #ff416c'
                  }}
                >
                  {admission.fullname?.charAt(0).toUpperCase()}
                </Avatar>
              </Badge>
              <Box sx={{ ml: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {admission.fullname}
                </Typography>
                <Typography variant="body2" sx={{ color: '#aaa' }}>
                  Member since {new Date(admission.createdAt || Date.now()).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
            <Chip
              icon={<CardMembership />}
              label={admission.selectedplan}
              color="primary"
              sx={{
                backgroundColor: 'rgba(255, 65, 108, 0.2)',
                color: '#ff9eaa',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                px: 1,
                height: '32px'
              }}
            />
          </Box>

          <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* Member Details */}
          <Grid container spacing={3}>
            {/* Left Section */}
            <Grid item xs={12} md={6}>
              {/* Details */}
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', color: '#ff9eaa', width: '500px' }}>
                <Person sx={{ mr: 1 }} /> Member Details
              </Typography>
              <Box sx={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', p: 2, mb: 2 }}>
                <DetailItem icon={<Email />} label="Email" value={admission.email} />
                <DetailItem icon={<Phone />} label="Phone" value={admission.phonenumber} />
                <DetailItem icon={<FitnessCenter />} label="Fitness Goal" value={admission.fitnessgoal} />
                <DetailItem icon={<CalendarToday />} label="Join Date" value={new Date(admission.createdAt || Date.now()).toLocaleDateString()} />
              </Box>

              {/* Membership Status */}
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', color: '#ff9eaa' }}>
                <AccessTime sx={{ mr: 1 }} /> Membership Status
              </Typography>
              <Box sx={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Days Remaining:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {calculateDaysLeft(admission.createdAt || Date.now())} days
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(calculateDaysLeft(admission.createdAt || Date.now()) / 30) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#ff416c'
                    }
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="caption" sx={{ color: '#aaa' }}>
                    {new Date(admission.createdAt || Date.now()).toLocaleDateString()}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#aaa' }}>
                    {new Date(new Date(admission.createdAt || Date.now()).setMonth(new Date(admission.createdAt || Date.now()).getMonth() + 1)).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Right Section */}
            <Grid item xs={12} md={6}>
              {/* Plan Features */}
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', color: '#ff9eaa' }}>
                <LocalOffer sx={{ mr: 1 }} /> Plan Features
              </Typography>
              <Box sx={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', p: 2, mb: 2 }}>
                {getPlanFeatures(admission.selectedplan).map((feature, index) => (
                  <FeatureChip
                    key={index}
                    label={feature}
                    size="small"
                    icon={<Star sx={{ fontSize: '14px', color: '#ff9eaa' }} />}
                  />
                ))}
              </Box>

              {/* Payment Info */}
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', color: '#ff9eaa' }}>
                <Payment sx={{ mr: 1 }} /> Payment Info
              </Typography>
              <Box sx={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', p: 2, mb: 2 }}>
                <DetailItem
                  label="Plan Price"
                  value={`${
                    admission.selectedplan === 'Basic Plan' ? '₹999' :
                    admission.selectedplan === 'Pro Plan' ? '₹1499' :
                    admission.selectedplan === 'Premium Plan' ? '₹1999' :
                    admission.selectedplan === 'Personal Training' ? '₹2999' :
                    '₹99.99'
                  } /month`}
                />
                <DetailItem
                  label="Next Payment"
                  value={new Date(new Date(admission.createdAt || Date.now()).setMonth(new Date(admission.createdAt || Date.now()).getMonth() + 1)).toLocaleDateString()}
                />
            <DetailItem 
                label="Payment Status" 
                value={
                  !admission.payment ? 'Not paid' :
                  `${admission.payment.method === 'online' ? 'Online' : 'Offline'} Payment - ${admission.payment.status}`
                }
              />
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Edit />}
              sx={{
                background: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
                borderRadius: '50px',
                px: 3,
                py: 1,
                fontWeight: 'bold',
                textTransform: 'none',
                flexGrow: isMobile ? 1 : 0,
                '&:hover': {
                  background: 'linear-gradient(45deg, #ff4b2b, #ff416c)',
                }
              }}
              onClick={() => setOpenModal(true)}
            >
              Change Plan
            </Button>
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              sx={{
                borderColor: '#ff416c',
                color: '#ff416c',
                borderRadius: '50px',
                px: 3,
                py: 1,
                fontWeight: 'bold',
                textTransform: 'none',
                flexGrow: isMobile ? 1 : 0,
                '&:hover': {
                  backgroundColor: 'rgba(255, 65, 108, 0.1)',
                }
              }}
              onClick={() => handleDelete(admission._id)}
            >
              Cancel Membership
            </Button>
          </Box>
        </StyledPaper>
      ) : (
        <Box sx={{ textAlign: 'center', maxWidth: '500px' }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: 'white' }}>
            No Active Membership
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: '#aaa' }}>
            You don't have an active membership. Join now to access our world-class facilities and training programs.
          </Typography>
          <Button
            variant="contained"
            startIcon={<FitnessCenter />}
            sx={{
              background: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
              borderRadius: '50px',
              px: 4,
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1rem',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(45deg, #ff4b2b, #ff416c)',
              }
            }}
            onClick={() => setOpenModal(true)}
          >
            Join Now
          </Button>
        </Box>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>

      <AdmissionForm
        open={openModal}
        handleClose={() => setOpenModal(false)}
        isUpdate={!!admission}
        existingData={admission}
      />
    </Box>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: '#aaa' }}>
      {icon && React.cloneElement(icon, { sx: { fontSize: '18px', mr: 1 } })}
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
      {value}
    </Typography>
  </Box>
);

export default UserPlans;
