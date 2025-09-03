import { Box, Typography, Paper, Grid, Card, CardContent, Divider, Chip, Button, Avatar, LinearProgress, Tabs, Tab, useTheme, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FitnessCenter, DirectionsRun, SelfImprovement, Timer, TrendingUp, Restaurant, Spa } from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
  color: '#fff',
  borderRadius: '12px',
  height: '100%',
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 24px rgba(255,65,108,0.3)',
  },
}));

const DayCard = ({ day, activities, icon }) => {
  const IconComponent = {
    'Push': <FitnessCenter fontSize="large" />,
    'Pull': <DirectionsRun fontSize="large" />,
    'Legs': <TrendingUp fontSize="large" />,
    'Mobility': <Spa fontSize="large" />,
    'Chest': <FitnessCenter fontSize="large" />,
    'Back': <DirectionsRun fontSize="large" />,
    'Shoulders': <SelfImprovement fontSize="large" />,
    'Arms': <TrendingUp fontSize="large" />,
    'Kickboxing': <DirectionsRun fontSize="large" />,
    'Grappling': <SelfImprovement fontSize="large" />,
    'HIIT': <Timer fontSize="large" />,
    'Yoga': <Spa fontSize="large" />,
  }[day.split('–')[1].trim()] || <FitnessCenter fontSize="large" />;

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <StyledCard>
        <CardContent sx={{ padding: { xs: '16px', sm: '20px', md: '24px' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: '#ff416c', mr: 2 }}>
              {IconComponent}
            </Avatar>
            <Typography variant="h6" sx={{ color: '#ff416c', fontWeight: 'bold' }}>
              {day}
            </Typography>
          </Box>
          <Divider sx={{ backgroundColor: '#444', mb: 2 }} />
          <Typography variant="body1" sx={{ color: '#ddd', mb: 2 }}>
            {activities}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {activities.split(', ').map((exercise, i) => (
              <Chip key={i} label={exercise} size="small" sx={{ bgcolor: '#333', color: '#fff' }} />
            ))}
          </Box>
        </CardContent>
      </StyledCard>
    </Grid>
  );
};

const UserSchedule = () => {
  const [admission, setAdmission] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const admissionInfo = JSON.parse(localStorage.getItem('admission'));

    if (user && admissionInfo?.email === user.email) {
      setAdmission(admissionInfo);
      // Simulate progress calculation based on workout completion
      setProgress(Math.floor(Math.random() * 100));
    } else {
      setAdmission(null);
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getPlan = () => {
    const goal = admission?.fitnessgoal?.toLowerCase();

    const plans = {
      'strength training': {
        title: 'Push / Pull / Legs Split',
        description: 'Focuses on compound movements with progressive overload for maximum strength gains',
        days: [
          { day: 'Day 1 – Push', activities: 'Bench Press, Overhead Press, Cable Flys, Dips, Triceps Extensions' },
          { day: 'Day 2 – Pull', activities: 'Deadlifts, Pull-ups, Barbell Rows, Face Pulls, Bicep Curls' },
          { day: 'Day 3 – Legs', activities: 'Squats, Leg Press, Romanian Deadlifts, Calf Raises, Leg Curls' },
          { day: 'Day 4 – Mobility', activities: 'Dynamic Stretching, Resistance Band Drills, Foam Rolling, Yoga Flow' },
          { day: 'Day 5 – Active Recovery', activities: 'Light Cardio, Core Work, Mobility Exercises' },
        ],
        nutritionTips: [
          'High protein intake (1.6-2.2g per kg of body weight)',
          'Moderate carbs around workout times',
          'Healthy fats for hormone production',
          'Stay hydrated - 3-4L water daily'
        ],
        equipment: ['Barbell', 'Dumbbells', 'Pull-up Bar', 'Cable Machine', 'Bench'],
        weeklyTargets: ['Progressive overload each session', 'Focus on form', '2-3 minutes rest between sets']
      },
      bulk: {
        title: 'Bro Split (Bulking)',
        description: 'High volume training targeting individual muscle groups for hypertrophy',
        days: [
          { day: 'Day 1 – Chest', activities: 'Bench Press, Incline Dumbbell Press, Cable Crossovers, Push-ups' },
          { day: 'Day 2 – Back', activities: 'Deadlifts, Barbell Row, Lat Pulldown, Reverse Flys, Shrugs' },
          { day: 'Day 3 – Shoulders', activities: 'OHP, Lateral Raises, Rear Delt Flys, Front Plate Raises' },
          { day: 'Day 4 – Legs', activities: 'Hack Squats, RDLs, Leg Extensions, Seated Calf Raises' },
          { day: 'Day 5 – Arms & Abs', activities: 'EZ Curls, Hammer Curls, Skullcrushers, Planks, Leg Raises' },
          { day: 'Day 6 – Active Recovery', activities: 'Light cardio, stretching, mobility work' },
        ],
        nutritionTips: [
          'Caloric surplus of 300-500 calories',
          '1.6-2.2g protein per kg body weight',
          'Carbs with every meal',
          'Post-workout shake with carbs and protein'
        ],
        equipment: ['Full gym access', 'Variety of dumbbells', 'Preacher curl bench', 'Leg machines'],
        weeklyTargets: ['Increase weight or reps weekly', 'Mind-muscle connection', '60-90 sec rest between sets']
      },
      'muscle building': {
        title: 'Upper / Lower Split',
        description: 'Balanced approach for muscle growth with adequate recovery',
        days: [
          { day: 'Day 1 – Upper Body', activities: 'Incline Bench, Pull-ups, Dumbbell Shoulder Press, Lat Raises' },
          { day: 'Day 2 – Lower Body', activities: 'Front Squats, Lunges, Glute Bridges, Calf Raises' },
          { day: 'Day 3 – Rest/Cardio', activities: 'Walking, Elliptical or Yoga' },
          { day: 'Day 4 – Upper Focused', activities: 'Flat Bench, Lateral Raises, Barbell Rows, Face Pulls' },
          { day: 'Day 5 – Lower Focused', activities: 'Deadlifts, Step-Ups, Hamstring Curls, Box Jumps' },
          { day: 'Day 6 – Active Recovery', activities: 'Mobility work, light swimming or cycling' },
        ],
        nutritionTips: [
          'Protein every 3-4 hours',
          'Carbs around workouts',
          'Healthy fats with each meal',
          'Creatine supplementation recommended'
        ],
        equipment: ['Barbell', 'Dumbbells', 'Pull-up bar', 'Resistance bands'],
        weeklyTargets: ['Progressive overload', 'Quality over quantity', 'Track workouts']
      },
      'combat training': {
        title: 'Combat Conditioning Plan',
        description: 'Develop explosive power, endurance and fight-specific skills',
        days: [
          { day: 'Day 1 – Kickboxing', activities: 'Shadow Boxing, Pad Work, Heavy Bag, Conditioning Circuits' },
          { day: 'Day 2 – Strength & Core', activities: 'Kettlebells, TRX Rows, Planks, Medicine Ball Throws' },
          { day: 'Day 3 – Grappling & Agility', activities: 'Takedowns, Cone Drills, Bear Crawls, Sprints' },
          { day: 'Day 4 – Recovery Day', activities: 'Stretch Flow, Breath Work, Light Mobility' },
          { day: 'Day 5 – Sparring', activities: 'Partner Drills, Bag Work, HIIT Finishers, Clinch Work' },
          { day: 'Day 6 – Strength Endurance', activities: 'Circuit Training, Bodyweight Exercises, Plyometrics' },
        ],
        nutritionTips: [
          'Focus on lean proteins',
          'Complex carbs for energy',
          'Hydration is critical',
          'Electrolyte replacement'
        ],
        equipment: ['MMA gloves', 'Hand wraps', 'Kettlebells', 'Agility ladder', 'Punching bag'],
        weeklyTargets: ['Improve technique', 'Increase round duration', 'Reduce recovery time']
      },
      'fat loss': {
        title: 'Fat Loss HIIT Routine',
        description: 'High intensity interval training combined with resistance work for maximum fat burn',
        days: [
          { day: 'Day 1 – Full Body HIIT', activities: 'Squat Jumps, Mountain Climbers, Burpees, KB Swings' },
          { day: 'Day 2 – Cardio Core', activities: 'Treadmill Intervals, Russian Twists, Bicycle Crunches' },
          { day: 'Day 3 – Upper Resistance', activities: 'Push-ups, Shoulder Press, Cable Rows, Battle Ropes' },
          { day: 'Day 4 – Yoga / Light Cardio', activities: 'Sun Salutations, Deep Stretching, Foam Rolling' },
          { day: 'Day 5 – MetCon Circuit', activities: 'Thrusters, Jump Rope, Lunges, Box Jumps' },
          { day: 'Day 6 – Active Recovery', activities: 'Walking, Swimming, Mobility Drills' },
        ],
        nutritionTips: [
          'Moderate calorie deficit',
          'High protein to preserve muscle',
          'Limit processed foods',
          'Time carbs around workouts'
        ],
        equipment: ['Kettlebells', 'Jump rope', 'Resistance bands', 'Yoga mat'],
        weeklyTargets: ['Increase intensity weekly', 'Track measurements', 'Consistency over perfection']
      },
    };

    return plans[goal] || null;
  };

  const workoutPlan = getPlan();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        px: { xs: 2, md: 4 },
        py: 6,
        backgroundColor: '#121212',
        color: 'white',
      }}
    >
      {admission ? (
        <>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: isMobile ? 'flex-start' : 'center', 
            mb: 4,
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 3 : 0
          }}>
            <Box>
              <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ 
                color: 'white', 
                fontWeight: 'bold', 
                mb: 1,
                textAlign: isMobile ? 'center' : 'left'
              }}>
                Your Personalized Workout Plan
              </Typography>
              <Typography variant={isMobile ? 'subtitle1' : 'h6'} sx={{ 
                color: '#ff416c',
                textAlign: isMobile ? 'center' : 'left'
              }}>
                {workoutPlan?.title}
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 1 : 0,
              width: isMobile ? '100%' : 'auto'
            }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Weekly Progress
              </Typography>
              <Box sx={{ width: isMobile ? '100%' : '150px', maxWidth: '200px' }}>
                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  sx={{ 
                    height: 10, 
                    borderRadius: 5,
                    backgroundColor: '#333',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#ff416c'
                    }
                  }} 
                />
                <Typography variant="caption" sx={{ textAlign: 'center', display: 'block', mt: 0.5 }}>
                  {progress}% Complete
                </Typography>
              </Box>
            </Box>
          </Box>

          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons={isMobile ? 'auto' : false}
            sx={{ 
              mb: 4,
              '& .MuiTabs-indicator': {
                backgroundColor: '#ff416c'
              },
              '& .MuiTab-root': {
                fontSize: isMobile ? '0.8rem' : '0.875rem',
                minWidth: isMobile ? 'auto' : '160px'
              }
            }}
          >
            <Tab label="Workout Schedule" sx={{ color: activeTab === 0 ? '#ff416c' : '#aaa' }} />
            <Tab label="Nutrition Guide" sx={{ color: activeTab === 1 ? '#ff416c' : '#aaa' }} />
           
            <Tab label="Weekly Targets" sx={{ color: activeTab === 2 ? '#ff416c' : '#aaa' }} />
          </Tabs>

          {activeTab === 0 && (
            <>
              <Typography variant="body1" sx={{ color: '#ccc', mb: 4 }}>
                {workoutPlan?.description}
              </Typography>
              
              <Grid container spacing={3}>
                {workoutPlan?.days.map((day, i) => (
                  <DayCard key={i} day={day.day} activities={day.activities} />
                ))}
              </Grid>

              <Box sx={{ 
                mt: 4, 
                display: 'flex', 
                justifyContent: isMobile ? 'center' : 'flex-end' 
              }}>
                <Button 
                  variant="contained" 
                  sx={{
                    background: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
                    borderRadius: '50px',
                    padding: '10px 24px',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #ff4b2b, #ff416c)',
                    }
                  }}
                >
                  Download Full Plan
                </Button>
              </Box>
            </>
          )}

          {activeTab === 1 && (
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ color: '#ff416c', mb: 2 }}>
                Nutrition Recommendations
              </Typography>
              <Divider sx={{ backgroundColor: '#444', mb: 3 }} />
              <Grid container spacing={2}>
                {workoutPlan?.nutritionTips.map((tip, i) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={i}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Restaurant sx={{ color: '#ff416c', mr: 2, mt: 0.5 }} />
                      <Typography variant="body1" sx={{ color: '#ddd' }}>
                        {tip}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Typography variant="body2" sx={{ color: '#aaa', mt: 3, fontStyle: 'italic' }}>
                * Consult with a nutritionist for personalized meal plans based on your specific needs.
              </Typography>
            </StyledCard>
          )}

         

          {activeTab === 2 && (
            <StyledCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ color: '#ff416c', mb: 2 }}>
                Weekly Performance Targets
              </Typography>
              <Divider sx={{ backgroundColor: '#444', mb: 3 }} />
              <Box component="ul" sx={{ pl: 3 }}>
                {workoutPlan?.weeklyTargets.map((target, i) => (
                  <Box component="li" key={i} sx={{ mb: 1.5 }}>
                    <Typography variant="body1" sx={{ color: '#ddd' }}>
                      {target}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </StyledCard>
          )}
        </>
      ) : (
        <Box sx={{ 
          textAlign: 'center', 
          mt: isMobile ? 6 : 10,
          px: isMobile ? 2 : 0
        }}>
          <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ 
            mb: 3, 
            color: 'white', 
            fontWeight: 'bold'
          }}>
            No Active Plan Found
          </Typography>
          <Typography variant="body1" sx={{ color: '#aaa', mb: 4 }}>
            Please complete your fitness assessment to receive a personalized workout schedule.
          </Typography>
          <Button 
            variant="contained" 
            sx={{
              background: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
              borderRadius: '50px',
              padding: isMobile ? '10px 24px' : '12px 32px',
              fontWeight: 'bold',
              fontSize: isMobile ? '1rem' : '1.1rem',
              '&:hover': {
                background: 'linear-gradient(45deg, #ff4b2b, #ff416c)',
              }
            }}
          >
            Start Fitness Assessment
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UserSchedule;