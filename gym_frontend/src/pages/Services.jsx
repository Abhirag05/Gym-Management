import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Box } from '@mui/material'
import './AboutUs.css';
import { Link } from 'react-router-dom';
const Services = () => {
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
                     Services
                     </h2>
                     
            </Box>
         </Box>
          <Box sx={{textAlign:"center"}} className="description">
                     <h3>"Whether you're chasing aesthetics, insane strength, or real-world combat skills — <br />
                     we've got the tools, trainers, and programs to transform your goals into gains. <br /> 
                     Dive into our specialized services crafted for warriors like you."
                     </h3>
          </Box>

  <Box className="Services">
      <h1>What We Provide</h1>
      <Box className="ServiceBoxes">

          <Box className="ServiceBox" >
            <h3>Strength Training</h3>
            <img src="strength.jpg" alt="Strength Training" className="service-img" />
            <p>
            Build raw, functional power with our elite strength training programs. From heavy compound lifts to isolated hypertrophy workouts, our facility is equipped with world-class gear and expert coaches to help you pack on muscle, gain explosive strength, and sculpt an aesthetic physique.
            </p>
          </Box>

        <Box className="ServiceBox">
          <h3> Yoga & Flexibility</h3>
          <img src="yoga.jpg" alt="Yoga and Flexibility" className="service-img" />
          <p>
          Flexibility is strength in disguise. Our yoga and mobility sessions are designed to enhance your range of motion, reduce injury risk, improve posture, and speed up recovery — all while helping you stay calm, focused, and mentally strong.
          </p>
        </Box>

        <Box className="ServiceBox">
          <h3> Cardio Training</h3>
          <img src="cardio.jpg" alt="Cardio Training" className="service-img" />
          <p>
          Burn fat, boost endurance, and level up your stamina. Whether it’s HIIT, steady-state, or performance conditioning, our cardio zone has the latest tech and routines to keep your heart pumping and your goals in check.
          </p>
        </Box>

        <Box className="ServiceBox">
          <h3> Combat Fitness</h3>
          <img src="combat.webp" alt="Combat Fitness" className="service-img" />
          <p>
          Train like a fighter — even if you're not stepping into the ring. Our Combat Fitness programs combine MMA, boxing, and functional athletic drills to build real-world agility, coordination, and killer instinct. It’s not just fitness. It’s fight-ready training.
          </p>
       </Box>
    </Box>
</Box>
        <Box className="CTASection">
          <h2>Ready to Transform Your Body?</h2>
          <p>Join Fit For Fight today and unlock your strongest, healthiest self.</p>
          <Link to='/AdmissionForm'>
          <button className="cta-button">Join Now</button>
          </Link>
        </Box>

           

            <Footer />
       </Box>
       </div>
  )
}

export default Services