import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Box, Button } from '@mui/material'
import './Admission.css';
import AdmissionForm from '../components/AdmissionForm';
import { useNavigate } from 'react-router-dom';
const Admission = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleOpenForm = (plan) => {
    setSelectedPlan(plan);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };
  const navigate=useNavigate();
  return (
     <div className='Container'>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <NavBar />
          
          <Box
            sx={{
              flex: 1,
              position: 'relative',
              backgroundImage: 'url(gym3.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'brightness(0.8)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 1
            }} />
             <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                      <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: '1rem' }}>
                     Admission
                      </h2>
                      
             </Box>
          </Box>
           <Box sx={{textAlign:"center"}} className="description">
                               <h3>"Choose The Best Plan That That Suit You"
                               </h3>
             </Box>

  <Box className="Admission">
  <h1>Membership Plans We Offer</h1>
  <Box className="AdmissionBoxes">

    <Box className="AdmissionBox">
      <h3>Basic Plan</h3>
      <h4>₹999 / month</h4>
      <ul>
        <li>Access to gym equipment</li>
        <li>Self-guided workouts</li>
        <li>Locker access</li>
        <li>Flexible timings</li>
      </ul>
      <Button className="choose-plan-btn" variant='outlined' onClick={() =>navigate('/sign')}>Choose Plan</Button>
    </Box>

    <Box className="AdmissionBox">
      <h3>Premium Plan</h3>
      <h4>₹1499 / month</h4>
      <ul>
        <li>Includes Basic Plan features</li>
        <li>Group classes (Yoga, Zumba, HIIT)</li>
        <li>Steam room access</li>
        <li>Free health checkup (monthly)</li>
      </ul>
      <Button className="choose-plan-btn" variant='outlined' onClick={() =>navigate('/sign')}>Choose Plan</Button>
    </Box>

    <Box className="AdmissionBox">
      <h3>Pro Plan</h3>
      <h4>₹1999 / month</h4>
      <ul>
        <li>Includes Premium Plan features</li>
        <li>Advanced training zones</li>
        <li>Nutrition consultation</li>
        <li>Monthly fitness assessments</li>
      </ul>
      <Button className="choose-plan-btn" variant='outlined' onClick={() =>navigate('/sign')}>Choose Plan</Button>
    </Box>

    <Box className="AdmissionBox">
      <h3>Personal Training</h3>
      <h4>₹2999 / month</h4>
      <ul>
        <li>One-on-one coaching</li>
        <li>Customized workout plans</li>
        <li>Progress tracking</li>
        <li>Priority scheduling</li>
      </ul>
      <Button className="choose-plan-btn" variant='outlined'onClick={() =>navigate('/sign')}>Choose Plan</Button>
    </Box>

  </Box>
</Box>
      <AdmissionForm
          open={openForm} 
          handleClose={handleCloseForm} 
          plan={selectedPlan} 
        />

             <Footer />
        </Box>
        </div>
  )
}

export default Admission