import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Box } from '@mui/material'
import './AboutUs.css';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HotTubIcon from '@mui/icons-material/HotTub';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import QnAccordion from '../components/QnAccordion';


const AboutUs = () => {
  return (
    <div  className="AboutUsContainer">
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
        {/* Semi-transparent overlay for better text visibility */}
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
                  About Us
                  </h2>       
         </Box>
      </Box>
        <Box sx={{textAlign:"center"}} className="description">
            <h3>"Fit For Fight is a premium fitness facility dedicated to transforming lives through world-class training, <br />
                personalized programs, and community support.
                 Founded with a passion for fitness, <br /> we empower members to become stronger 
                — physically and mentally."
            </h3>
        </Box>
      
        <Box className="Facilities">
  <h1>Facilities</h1>
  <Box className="FacilitiesBoxes">

      <Box className="FacilityBox" >
        <h3>High Quality Equipments</h3>
        <p>
          We provide state-of-the-art fitness equipment from leading global brands to ensure you get the safest and most effective workout experience. From power racks to free weights, everything is built for performance and durability.
        </p>
        <Box className="icon-container">
          <FitnessCenterIcon className="facility-icon" sx={{ fontSize: 40 }} />
         </Box>
      </Box>

    <Box className="FacilityBox">
      <h3>Steam Rooms</h3>
      <p>
        Unwind and detox after a hard workout in our luxurious steam rooms. They’re perfect for muscle relaxation, improving circulation, and boosting your overall recovery.
      </p>
      <Box className="icon-container">
          <HotTubIcon className="facility-icon"sx={{ fontSize: 40 }}  />
      </Box>
    </Box>

    <Box className="FacilityBox">
      <h3>Cardio Equipments</h3>
      <p>
        Whether you’re into running, cycling, or rowing, our cardio section is packed with modern machines like treadmills, ellipticals, and air bikes to boost your endurance and burn calories efficiently.
      </p>
      <Box className="icon-container">
          <DirectionsRunIcon className="facility-icon" sx={{ fontSize: 40 }}  />
      </Box>
    </Box>

    <Box className="FacilityBox">
      <h3>24/7 AC Availability</h3>
      <p>
        Enjoy a comfortable workout environment no matter the time of day. Our air-conditioned facility ensures a cool and clean space for all your training sessions, 24/7.
      </p>
      <Box className="icon-container">
          <AcUnitIcon className="facility-icon" sx={{ fontSize: 40 }}  /> 
      </Box>
    </Box>
  </Box>
</Box>


<Box className="Questions">
  <h1>What Makes Us Different?</h1>

  <QnAccordion
    question="24/7 Access?" 
    answer="Yes! We understand that everyone has a different schedule. That's why our facility is open 24/7, so you can train anytime — early morning, late night, or whenever it fits your lifestyle."
  />
  <QnAccordion
    question="Professional Trainers?" 
    answer="Our certified trainers bring years of experience in strength training, cardio, CrossFit, and functional fitness. Whether you're a beginner or a pro, they’ll guide you with structured programs and real-time support."
  />
  <QnAccordion
    question="Personalized Plans?" 
    answer="No more generic routines. We create customized workout and diet plans tailored to your body type, goals, and fitness level — ensuring faster, sustainable results."
  />
  <QnAccordion
    question="Combat Training or Sports Fitness?" 
    answer="Yes! From MMA and boxing to athletic performance drills, we offer combat and sports-oriented fitness training to build real-world strength, agility, and endurance."
  />
</Box>
         <Footer />
    </Box>
    </div>
  )
}

export default AboutUs