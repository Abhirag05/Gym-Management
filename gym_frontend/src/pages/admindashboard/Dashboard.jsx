import React from 'react';
import { Box, Typography, Avatar, Paper, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Box sx={{ color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to the admin panel.
      </Typography>

      {/* Admin Profile Card */}
      <Paper
        elevation={6}
        sx={{
          backgroundColor: '#1f1f1f',
          padding: 4,
          borderRadius: 3,
          textAlign: 'center',
          maxWidth: 400,
          width: '100%',
          mt: 4,
        }}
      >
        <Avatar
          src="/admin.jpg"
          alt="Admin"
          sx={{ width: 100, height: 100, margin: '0 auto', mb: 2, border: '2px solid #ff416c' }}
        />
        <Typography variant="h6" gutterBottom color="white">
          User Name: Abhirag
        </Typography>
        <Typography variant="body2" gutterBottom color="white">
          Email: abhirag2005@gmail.com
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#ff416c' }}>
          Role: Admin
        </Typography>
      </Paper>

      {/* Gym Summary */}
      <Box sx={{ mt: 6, width: '100%', maxWidth: 1000, px: 3 }}>
        <Typography variant="h4" align="left" color='#ff416c' gutterBottom>
          Gym Summary
        </Typography>

        <Grid container spacing={3}>
          {[
            { title: "Total Members", desc: "145+ active members currently training in our facility." },
            { title: "Total Trainers", desc: "12 certified professionals in strength, combat & yoga." },
            { title: "Total Programs", desc: "Over 8+ programs including Combat, Yoga, Strength & HIIT." },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: '#2c2c2c',
                  color: '#fff',
                  borderRadius: 3,
                  boxShadow: 3,
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: '0.3s ease',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Quick Actions */}
      <Box sx={{ mt: 6, width: '100%', maxWidth: 1000, px: 3 }}>
        <Typography variant="h4" align="left" color="#ff416c" gutterBottom>
          Quick Actions
        </Typography>
        <Paper
          elevation={4}
          sx={{
            backgroundColor: '#1f1f1f',
            padding: 3,
            borderRadius: 3,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Link to="addmember">
          <Button variant='contained' sx={{ backgroundColor: '#ff416c', color: '#fff' }}>
            Add New Member
          </Button>
          </Link>
          <Link to='members'>
          <Button variant='contained' sx={{ backgroundColor: '#ff416c', color: '#fff' }}>
            View All Users
          </Button>
          </Link>
          <Link to='details'>
          <Button variant='contained' sx={{ backgroundColor: '#ff416c', color: '#fff' }}>
            View Admissions
          </Button>
          </Link>
          <Button variant='contained' sx={{ backgroundColor: '#ff416c', color: '#fff' }}>
            Manage Programs
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
