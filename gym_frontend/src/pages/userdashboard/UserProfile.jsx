import React, { useContext, useEffect, useState } from 'react';
import { 
  Avatar, Box, Paper, Typography, Button, 
  Grid, Divider, Chip, LinearProgress, 
  Card, CardContent, IconButton,
  CircularProgress, Alert
} from '@mui/material';
import { 
  Edit, FitnessCenter, CalendarToday, 
  LocalFireDepartment, TrendingUp, 
  AccessTime
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import EditProfileModal from '../../components/EditProfileModal ';
import axios from 'axios';
import { GymContext } from '../../context/GymContext';

// Reusable Stat Card Component
const StatCard = ({ icon, value, label, color }) => (
  <Card sx={{ 
    backgroundColor: 'rgba(0,0,0,0.2)', 
    color: 'white',
    textAlign: 'center',
    borderLeft: `3px solid ${color}`
  }}>
    <CardContent>
      <Box sx={{ color, fontSize: '2rem' }}>
        {icon}
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
        {value}
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.8 }}>
        {label}
      </Typography>
    </CardContent>
  </Card>
);

// Reusable Progress Component
const ProgressItem = ({ label, value, color }) => (
  <Box sx={{ mb: 2 }}>
    <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
      <Typography variant="body2">{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{value}%</Typography>
    </Box>
    <LinearProgress 
      variant="determinate" 
      value={value} 
      sx={{ 
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        '& .MuiLinearProgress-bar': {
          backgroundColor: color,
          borderRadius: 4
        }
      }} 
    />
  </Box>
);

// Reusable Schedule Item Component
const ScheduleItem = ({ day, time, activity, trainer }) => (
  <Box sx={{ 
    mb: 2,
    p: 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 2,
    borderLeft: '3px solid #ff416c'
  }}>
    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
      {day}, {time}
    </Typography>
    <Typography variant="body1">
      {activity}
    </Typography>
    <Typography variant="body2" sx={{ opacity: 0.7 }}>
      with {trainer}
    </Typography>
  </Box>
);

// Main UserProfile Component
const UserProfile = () => {
  const{backendURL} = useContext(GymContext);
   const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 25,
    weight: 70,
    height: 170,
    avatar: '/default-avatar.png',
    joinDate: new Date().toLocaleDateString()
  });

  const [stats, setStats] = useState({
    workoutsCompleted: 42,
    caloriesBurned: 12500,
    streak: 7,
    nextSession: "Tomorrow, 7:00 AM"
  });

  const [progress, setProgress] = useState({
    strength: 65,
    endurance: 80,
    flexibility: 45
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user data from localStorage
  const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
  const admissionData = localStorage.getItem('admission') ? JSON.parse(localStorage.getItem('admission')) : {};

  // Load user profile data from backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendURL}/profile/${storedUser.email}`, {
          withCredentials: true
        });
        
        setUser({
          ...response.data,
          joinDate: new Date(response.data.joinDate).toLocaleDateString()
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile data');
        setUser(prev => ({
          ...prev,
          name: storedUser.name,
          email: storedUser.email
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [backendURL, storedUser.email]);
  const handleSaveProfile = async (updatedUser ) => {
    try {
      const response = await axios.put(
        backendURL+`/profile/${storedUser .email}`,
        updatedUser,
        {
          withCredentials: true
        }
      );
  
      // Update user state with the new avatar data
      setUser (response.data.user);
  
      // Update localStorage with new data including avatar
      const updatedUserData = {
        ...storedUser ,
        name: response.data.user.name,
        age: response.data.user.age,
        weight: response.data.user.weight,
        height: response.data.user.height,
        avatar: response.data.user.avatar, // Ensure this is the base64 string
        avatarContentType: response.data.user.avatarContentType
      };
      localStorage.setItem('user', JSON.stringify(updatedUserData));
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };
  

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        padding: { xs: 2, md: 4 },
        color: 'white',
      }}
    >
      <Grid container spacing={3}>
        {/* Header Section */}
        <Grid size={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Welcome back, <span style={{ color: '#ff416c' }}>{user.name}</span>
            </Typography>
          </Box>
          <Chip 
            label={`${admissionData.selectedplan || 'Standard'} Member`} 
            color="primary" 
            variant="outlined"
            sx={{ mt: 1, fontWeight: 'bold' }}
          />
        </Grid>

        {/* Profile Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={6}
            sx={{
              backgroundColor: '#fff',
              padding: 3,
              borderRadius: 3,
              height: '100%',
              borderLeft: '2px solid #ff416c',
              borderRight: '2px solid #ff416c',
              width: '300px'
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                src={
                  user.avatar && user.avatarContentType 
                    ? `data:${user.avatarContentType};base64,${user.avatar}`
                    : "/default-avatar.png"
                }
                alt="User"
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  border: '3px solid #ff416c',
                  boxShadow: '0 4px 20px rgba(255, 65, 108, 0.3)'
                }}
              />
              <Typography variant="h6" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Member since {user.joinDate}
              </Typography>
              
              <Divider sx={{ width: '100%', my: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />

              <Box width="100%" mb={2}>
                <Typography variant="body2" sx={{ mb: 1 }}>Email: {user.email}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Age: {user.age} years</Typography>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2">Weight: {user.weight} kg</Typography>
                  <Typography variant="body2">Height: {user.height} cm</Typography>
                </Box>
              </Box>

              <Button
                variant="outlined"
                startIcon={<Edit />}
                fullWidth
                onClick={() => setEditModalOpen(true)}
                sx={{
                  color: '#ff416c',
                  borderColor: '#ff416c',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 65, 108, 0.1)',
                    borderColor: '#ff416c'
                  },
                  mt: 'auto'
                }}
              >
                Edit Profile
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Stats Section */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={3}>
            {/* Quick Stats */}
            <Grid size={12}>
              <Paper
                elevation={6}
                sx={{
                  backgroundColor: '#1f1f1f',
                  padding: 3,
                  borderRadius: 3
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Your Stats
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard 
                      icon={<FitnessCenter />} 
                      value={stats.workoutsCompleted} 
                      label="Workouts" 
                      color="#ff416c"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard 
                      icon={<LocalFireDepartment />} 
                      value={stats.caloriesBurned} 
                      label="Calories Burned" 
                      color="#ff9e2c"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard 
                      icon={<TrendingUp />} 
                      value={stats.streak} 
                      label="Day Streak" 
                      color="#4caf50"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard 
                      icon={<AccessTime />} 
                      value={stats.nextSession} 
                      label="Next Session" 
                      color="#2196f3"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Progress Section */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={6}
                sx={{
                  backgroundColor: '#1f1f1f',
                  padding: 3,
                  borderRadius: 3,
                  height: '100%'
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Your Progress
                </Typography>
                <ProgressItem label="Strength" value={progress.strength} color="#ff416c" />
                <ProgressItem label="Endurance" value={progress.endurance} color="#4caf50" />
                <ProgressItem label="Flexibility" value={progress.flexibility} color="#2196f3" />
              </Paper>
            </Grid>

            {/* Upcoming Schedule */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={6}
                sx={{
                  backgroundColor: '#1f1f1f',
                  padding: 3,
                  borderRadius: 3,
                  height: '100%'
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Upcoming Schedule
                </Typography>
                <ScheduleItem 
                  day="Monday" 
                  time="7:00 AM" 
                  activity="Weight Training" 
                  trainer="Mark"
                />
                <ScheduleItem 
                  day="Wednesday" 
                  time="6:30 PM" 
                  activity="HIIT Class" 
                  trainer="Sarah"
                />
                <ScheduleItem 
                  day="Friday" 
                  time="7:00 AM" 
                  activity="Yoga" 
                  trainer="Lisa"
                />
                <Link to='/user/usershedule'>
                  <Button
                    variant="text"
                    startIcon={<CalendarToday />}
                    fullWidth
                    sx={{
                      color: '#ff416c',
                      fontWeight: 'bold',
                      mt: 2
                    }}
                  >
                    View Full Schedule
                  </Button>
                </Link>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Edit Profile Modal */}
      <EditProfileModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={user}
        onSave={handleSaveProfile}
      />
    </Box>
  );
};

export default UserProfile;