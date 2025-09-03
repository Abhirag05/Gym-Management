import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, useScrollTrigger, Zoom, Fab, Typography } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './home.css';
import './AboutUs.css';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HotTubIcon from '@mui/icons-material/HotTub';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import QnAccordion from '../components/QnAccordion';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [ref2, inView2] = useInView({ threshold: 0.1, triggerOnce: false });
  const [ref3, inView3] = useInView({ threshold: 0.1, triggerOnce: false });
  const [ref4, inView4] = useInView({ threshold: 0.1, triggerOnce: false });
  const [ref5, inView5] = useInView({ threshold: 0.1, triggerOnce: false });
  
  const images = [
    'gym10.jpg',
    'gym4.jpg',
    'gym16.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [textAnimation, setTextAnimation] = useState('initial');
  const [initialLoad, setInitialLoad] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const textRef = useRef(null);
  const mainRef = useRef(null);

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Initial load animation
  useEffect(() => {
    if (initialLoad) {
      setTimeout(() => {
        setTextAnimation('enter');
      }, 300);
      setInitialLoad(false);
    }
  }, [initialLoad]);

  // Carousel animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTextAnimation('exit');
      
      setTimeout(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        setFade(true);
        setTextAnimation('enter');
      }, 800);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Animation variants
  const getTextAnimationStyle = () => {
    switch(textAnimation) {
      case 'initial':
        return {
          transform: 'translateY(50px) rotateX(30deg)',
          opacity: 0,
          filter: 'blur(4px)'
        };
      case 'enter':
        return {
          transform: 'translateY(0) rotateX(0)',
          opacity: 1,
          filter: 'blur(0)',
          transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
        };
      case 'exit':
        return {
          transform: 'translateY(-30px) rotateX(-20deg)',
          opacity: 0,
          filter: 'blur(2px)',
          transition: 'all 0.8s cubic-bezier(0.36, 0, 0.66, -0.56)'
        };
      default:
        return {};
    }
  };

  // Section animations
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fadeInUp = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const scaleUp = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '200vh',
      backgroundColor: '#0f0f0f',
      scrollBehavior: 'smooth'
    }} ref={mainRef}>
      <NavBar />

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '100vh', sm: '100vh' },
          minHeight: { xs: '600px', sm: '700px' },
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 0,
          px: { xs: 2, sm: 4 }
        }}
      >
        {/* Background Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${images[currentImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.7)',
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            zIndex: 0,
            bottom:0,
          }}
        />

        {/* Animated Text Content */}
        <Box 
          ref={textRef}
          sx={{ 
            position: 'relative', 
            zIndex: 2, 
            textAlign: 'center',
            overflow: 'hidden',
            perspective: '1000px',
            ...getTextAnimationStyle()
          }}
        >
          <motion.h1 
            style={{ 
              color: 'white', 
              fontSize: 'clamp(1.8rem, 8vw, 3.5rem)', 
              marginBottom: '1rem',
              fontWeight: 700,
              textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
              lineHeight: 1.2,
              transformOrigin: 'center bottom',
              textAlign: 'center',
              padding: '0 10px'
            }}
          >
            "Surpass Your Limits"
          </motion.h1>
          <motion.p 
            style={{ 
              color: 'white', 
              fontSize: 'clamp(1rem, 4vw, 1.8rem)',
              textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
              marginTop: '1rem',
              transformOrigin: 'center top',
              transitionDelay: '0.2s',
              textAlign: 'center',
              padding: '0 10px'
            }}
          >
            Right here, Right Now
          </motion.p>
          <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.8, type: 'spring', stiffness: 100 }}
    style={{ marginTop: '2rem' }}
  >
    <Link to='/sign' style={{ textDecoration: 'none' }}>
      <Button
        component={motion.button}
        whileHover={{ 
          scale: 1.05,
          backgroundcolor:' #ff416c',
          color:' white',
          boxShadow: '0 0 20px  #ff416c'
        }}
        whileTap={{ scale: 0.98 }}
        sx={{ 
          fontWeight: 600,
          fontSize: { xs: '1rem', sm: '1.2rem' },
          padding: { xs: '10px 24px', sm: '12px 32px' },
          borderRadius: '50px',
          backgroundColor: 'white',
          color: '#ff416c',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255,255,255,0.2)',
          textTransform: 'none',
          letterSpacing: '1px',
          transition: 'all 0.3s ease',
          '&:hover': { 
            backgroundColor: '#ff416c',
            color: 'white'
          }
        }}
      >
        Sign In
        <Box 
          component="span"
          sx={{
            display: 'inline-block',
            marginLeft: '8px',
            transition: 'transform 0.3s ease'
          }}
        >
          →
        </Box>
      </Button>
    </Link>
  </motion.div>
        </Box>

        {/* Modern Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white'
          }}
        >
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              opacity: [1, 0.7, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
            style={{
              width: '24px',
              height: '40px',
              borderRadius: '12px',
              border: '2px solid white',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <motion.div
              animate={{ 
                y: [0, 8, 0],
                opacity: [1, 0, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
              style={{
                width: '4px',
                height: '8px',
                borderRadius: '2px',
                backgroundColor: 'white',
                marginTop: '6px'
              }}
            />
          </motion.div>
          <p style={{ 
            marginTop: '12px',
            fontSize: '0.9rem',
            letterSpacing: '1px'
          }}>
            SCROLL DOWN
          </p>
        </motion.div>
      </Box>

      {/* Content Container for Smooth Transition */}
      <Box sx={{
        position: 'relative',
        backgroundColor: '#0f0f0f',
        zIndex: 2
      }}>
        {/* About Us Section */}
        <Box
          ref={ref}
          sx={{
            padding: { xs: '80px 20px 60px', sm: '120px 20px 80px', md: '150px 20px 100px' },
            position: 'relative',
            background: 'linear-gradient(to bottom, #0f0f0f, #1a1a1a)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: { xs: '80px', sm: '120px', md: '150px' },
              zIndex: 1
            }
          }}
        >
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              position: 'relative',
              zIndex: 2
            }}
          >
            <motion.h2 
              variants={fadeInUp}
              style={{ 
                fontSize: 'clamp(1.8rem, 6vw, 3rem)', 
                marginBottom: '2rem',
                textAlign: 'center',
                fontWeight: 700,
                color: '#ff6b6b',
                padding: '0 10px'
              }}
            >
              About Us
            </motion.h2>
            
            <motion.div variants={itemVariants}>
              <Box sx={{
                textAlign: 'center',
                color: 'rgba(255,255,255,0.9)',
                fontSize: 'clamp(0.9rem, 3vw, 1.2rem)',
                lineHeight: 1.8,
                maxWidth: '800px',
                margin: '0 auto',
                px: { xs: 2, sm: 3 }
              }}>
                <p>
                  "Fit For Fight is a premium fitness facility dedicated to transforming lives through world-class training, personalized programs, and community support. Founded with a passion for fitness, we empower members to become stronger — physically and mentally."
                </p>
              </Box>
            </motion.div>
          </motion.div>
        </Box>

        {/* Facilities Section */}
        <Box
          ref={ref2}
          sx={{
            padding: { xs: '60px 20px', sm: '80px 20px', md: '100px 20px' },
            background: 'linear-gradient(to bottom, #1a1a1a, #252525)',
            position: 'relative'
          }}
        >
          <motion.div
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
            variants={containerVariants}
            style={{
              maxWidth: '1200px',
              margin: '0 auto'
            }}
          >
            <motion.h1 
              variants={fadeInUp}
              style={{ 
                textAlign: 'center',
                marginBottom: '60px',
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: '#fff'
              }}
            >
              Our Facilities
            </motion.h1>
            
            <motion.div 
              className="FacilitiesBoxes"
              variants={containerVariants}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '30px'
              }}
            >
              {[
                {
                  title: "High Quality Equipment",
                  icon: <FitnessCenterIcon sx={{ fontSize: 40, color: '#ff6b6b' }} />,
                  description: "We provide state-of-the-art fitness equipment from leading global brands to ensure you get the safest and most effective workout experience."
                },
                {
                  title: "Steam Rooms",
                  icon: <HotTubIcon sx={{ fontSize: 40, color: '#ff6b6b' }} />,
                  description: "Unwind and detox after a hard workout in our luxurious steam rooms. Perfect for muscle relaxation and improving circulation."
                },
                {
                  title: "Cardio Equipment",
                  icon: <DirectionsRunIcon sx={{ fontSize: 40, color: '#ff6b6b' }} />,
                  description: "Our cardio section is packed with modern machines like treadmills, ellipticals, and air bikes to boost your endurance."
                },
                {
                  title: "24/7 AC Availability",
                  icon: <AcUnitIcon sx={{ fontSize: 40, color: '#ff6b6b' }} />,
                  description: "Enjoy a comfortable workout environment no matter the time of day with our air-conditioned facility."
                }
              ].map((facility, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  style={{
                    backgroundColor: '#1a1a1a',
                    borderRadius: '10px',
                    padding: '25px',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                    transition: 'transform 0.3s ease',
                    border: '1px solid rgba(255,107,107,0.2)',
                    minHeight: '280px'
                  }}
                >
                  <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    height: '100%'
                  }}>
                    <Box sx={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 107, 107, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px'
                    }}>
                      {facility.icon}
                    </Box>
                    <h3 style={{ 
                      marginBottom: '15px',
                      color: 'white',
                      fontSize: '1.3rem'
                    }}>
                      {facility.title}
                    </h3>
                    <p style={{ 
                      color: 'rgba(255,255,255,0.8)',
                      lineHeight: 1.6
                    }}>
                      {facility.description}
                    </p>
                  </Box>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Box>

        {/* FAQ Section */}
        <Box
          ref={ref3}
          sx={{
            padding: { xs: '60px 20px', sm: '80px 20px', md: '100px 20px' },
            background: 'linear-gradient(to bottom, #252525, #1a1a1a)',
            position: 'relative'
          }}
        >
          <motion.div
            initial="hidden"
            animate={inView3 ? "visible" : "hidden"}
            variants={containerVariants}
            style={{
              maxWidth: '1200px',
              margin: '0 auto'
            }}
          >
            <motion.h1 
              variants={fadeInUp}
              style={{ 
                textAlign: 'center',
                marginBottom: '60px',
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: '#fff'
              }}
            >
              What Makes Us Different?
            </motion.h1>
            
            <motion.div variants={containerVariants}>
              {[
                {
                  question: "24/7 Access?",
                  answer: "Yes! We understand that everyone has a different schedule. That's why our facility is open 24/7, so you can train anytime — early morning, late night, or whenever it fits your lifestyle."
                },
                {
                  question: "Professional Trainers?",
                  answer: "Our certified trainers bring years of experience in strength training, cardio, CrossFit, and functional fitness. Whether you're a beginner or a pro, they'll guide you with structured programs and real-time support."
                },
                {
                  question: "Personalized Plans?",
                  answer: "No more generic routines. We create customized workout and diet plans tailored to your body type, goals, and fitness level — ensuring faster, sustainable results."
                },
                {
                  question: "Combat Training or Sports Fitness?",
                  answer: "Yes! From MMA and boxing to athletic performance drills, we offer combat and sports-oriented fitness training to build real-world agility."
                }
              ].map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <QnAccordion 
                    question={item.question} 
                    answer={item.answer} 
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Box>

        {/* Services Section */}
        <Box
          ref={ref4}
          sx={{
            padding: { xs: '60px 20px', sm: '80px 20px', md: '100px 20px' },
            background: 'linear-gradient(to bottom, #1a1a1a, #252525)',
            position: 'relative'
          }}
        >
          <motion.div
            initial="hidden"
            animate={inView4 ? "visible" : "hidden"}
            variants={containerVariants}
            style={{
              maxWidth: '1200px',
              margin: '0 auto'
            }}
          >
            <motion.h1 
              variants={fadeInUp}
              style={{ 
                textAlign: 'center',
                marginBottom: '60px',
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: '#ff6b6b'
              }}
            >
              Our Services
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              style={{
                textAlign: 'center',
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '800px',
                margin: '0 auto 60px',
                lineHeight: 1.8
              }}
            >
              "Whether you're chasing aesthetics, insane strength, or real-world combat skills — we've got the tools, trainers, and programs to transform your goals into gains."
            </motion.p>
            
            <motion.div 
              className="ServiceBoxes"
              variants={containerVariants}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                padding: '0 10px'
              }}
            >
              {[
                {
                  title: "Strength Training",
                  img: "strength.jpg",
                  description: "Build raw, functional power with our elite strength training programs. From heavy compound lifts to isolated hypertrophy workouts, our facility is equipped with world-class gear and expert coaches."
                },
                {
                  title: "Yoga & Flexibility",
                  img: "yoga2.jpg",
                  description: "Flexibility is strength in disguise. Our yoga and mobility sessions are designed to enhance your range of motion, reduce injury risk, improve posture, and speed up recovery."
                },
                {
                  title: "Cardio Training",
                  img: "cardio.jpg",
                  description: "Burn fat, boost endurance, and level up your stamina. Whether it's HIIT, steady-state, or performance conditioning, our cardio zone has the latest tech and routines."
                },
                {
                  title: "Combat Fitness",
                  img: "combat2.jpg",
                  description: "Train like a fighter — even if you're not stepping into the ring. Our Combat Fitness programs combine MMA, boxing, and functional athletic drills to build real-world agility."
                }
              ].map((service, index) => (
                <motion.div 
                  key={index}
                  variants={scaleUp}
                  style={{
                    backgroundColor: '#1a1a1a',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                    transition: 'transform 0.3s ease',
                    border: '1px solid rgba(255,107,107,0.2)',
                    '&:hover': {
                      transform: 'translateY(-10px)'
                    }
                  }}
                >
                  <Box sx={{
                    height: '200px',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={service.img} 
                      alt={service.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.1)'
                        }
                      }}
                    />
                  </Box>
                  <Box sx={{ padding: '25px' }}>
                    <h3 style={{ 
                      marginBottom: '15px',
                      color: 'white',
                      fontSize: '1.3rem'
                    }}>
                      {service.title}
                    </h3>
                    <p style={{ 
                      color: 'rgba(255,255,255,0.8)',
                      lineHeight: 1.6
                    }}>
                      {service.description}
                    </p>
                  </Box>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Box>

        {/* Membership Section */}
        <Box
          ref={ref5}
          sx={{
            padding: { xs: '60px 20px', sm: '80px 20px', md: '100px 20px' },
            background: 'linear-gradient(to bottom, #252525, #1a1a1a)',
            position: 'relative'
          }}
        >
          <motion.div
            initial="hidden"
            animate={inView5 ? "visible" : "hidden"}
            variants={containerVariants}
            style={{
              maxWidth: '1200px',
              margin: '0 auto'
            }}
          >
            <motion.h1 
              variants={fadeInUp}
              style={{ 
                textAlign: 'center',
                marginBottom: '60px',
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: '#ff6b6b'
              }}
            >
              Membership Plans
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              style={{
                textAlign: 'center',
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '800px',
                margin: '0 auto 60px',
                lineHeight: 1.8
              }}
            >
              "Choose The Best Plan That Suits You"
            </motion.p>
            
            <motion.div 
              className="AdmissionBoxes"
              variants={containerVariants}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '30px'
              }}
            >
              {[
                {
                  title: "Basic Plan",
                  price: "₹999 / month",
                  features: [
                    "Access to gym equipment",
                    "Self-guided workouts",
                    "Locker access",
                    "Flexible timings"
                  ],
                  color: '#1a1a1a'
                },
                {
                  title: "Premium Plan",
                  price: "₹1499 / month",
                  features: [
                    "Includes Basic Plan features",
                    "Group classes (Yoga, Zumba, HIIT)",
                    "Steam room access",
                    "Free health checkup (monthly)"
                  ],
                  color: '#1a1a1a'
                },
                {
                  title: "Pro Plan",
                  price: "₹1999 / month",
                  features: [
                    "Includes Premium Plan features",
                    "Advanced training zones",
                    "Nutrition consultation",
                    "Monthly fitness assessments"
                  ],
                  color: '#1a1a1a'
                },
                {
                  title: "Personal Training",
                  price: "₹2999 / month",
                  features: [
                    "One-on-one coaching",
                    "Customized workout plans",
                    "Progress tracking",
                    "Priority scheduling"
                  ],
                  color: '#1a1a1a'
                }
              ].map((plan, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  style={{
                    backgroundColor: plan.color,
                    borderRadius: '10px',
                    padding: '30px',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                    transition: 'transform 0.3s ease',
                    border: '1px solid rgba(255,107,107,0.3)',
                    '&:hover': {
                      transform: 'translateY(-10px)'
                    }
                  }}
                >
                  <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <h3 style={{ 
                      marginBottom: '15px',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: 'white'
                    }}>
                      {plan.title}
                    </h3>
                    <h4 style={{ 
                      marginBottom: '20px',
                      fontSize: '1.8rem',
                      fontWeight: 700,
                      color: '#ff6b6b'
                    }}>
                      {plan.price}
                    </h4>
                    <ul style={{ 
                      marginBottom: '30px',
                      paddingLeft: '20px',
                      flexGrow: 1
                    }}>
                      {plan.features.map((feature, i) => (
                        <li key={i} style={{ 
                          marginBottom: '10px',
                          lineHeight: 1.5,
                          color: 'rgba(255,255,255,0.8)'
                        }}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="contained" 
                      sx={{
                        backgroundColor: '#ff6b6b',
                        color: 'white',
                        fontWeight: 700,
                        padding: '12px 24px',
                        '&:hover': {
                          backgroundColor: '#ff4757',
                          boxShadow: '0 0 10px rgba(255, 107, 107, 0.5)'
                        }
                      }}
                      onClick={() => navigate('/sign')}
                    >
                      Choose Plan
                    </Button>
                  </Box>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Box>
      </Box>

      {/* Scroll to top button */}
      <Zoom in={showScrollButton}>
        <Box
          onClick={scrollToTop}
          role="presentation"
          sx={{
            position: 'fixed',
            bottom: { xs: '20px', sm: '32px' },
            right: { xs: '20px', sm: '32px' },
            zIndex: 1000
          }}
        >
          <Fab color="primary" size="medium" aria-label="scroll back to top" sx={{ backgroundColor: '#ff6b6b', '&:hover': { backgroundColor: '#ff4757' } }}>
            <KeyboardArrowUp />
          </Fab>
        </Box>
       
    
      </Zoom>
          {/* CTA Section */}
<Box
        sx={{
          padding: { xs: '60px 20px', sm: '80px 20px', md: '120px 20px' },
          background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
>
  {/* Decorative elements */}
  <Box 
    sx={{
      position: 'absolute',
      top: '-50px',
      left: '-50px',
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.1)'
    }}
  />
  <Box 
    sx={{
      position: 'absolute',
      bottom: '-30px',
      right: '-30px',
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.1)'
    }}
  />
  
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
      }
    }}
  >
    <Box sx={{ 
      maxWidth: '800px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 2
    }}>
      <Typography 
        variant="h2" 
        sx={{
          fontSize: { xs: '2rem', md: '2.8rem' },
          fontWeight: 700,
          marginBottom: '20px',
          lineHeight: 1.3
        }}
      >
        Ready to Transform Your Fitness Journey?
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{
          fontSize: { xs: '1.1rem', md: '1.2rem' },
          marginBottom: '40px',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          opacity: 0.9
        }}
      >
        Join hundreds of members who've already changed their lives. Your first workout is on us!
      </Typography>
      
      <Box sx={{ 
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'center',
        gap: '20px'
      }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'white',
            color: '#ff4757',
            fontWeight: 700,
            padding: '12px 32px',
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.9)',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            },
            transition: 'all 0.3s ease'
          }}
          onClick={() => navigate('/sign')}
        >
          Get Started Today
        </Button>
        
        <Button
          variant="outlined"
          sx={{
            borderColor: 'white',
            color: 'white',
            fontWeight: 700,
            padding: '12px 32px',
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderColor: 'white',
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.3s ease'
          }}
          onClick={() => navigate('/contact')}
        >
          Book a Tour
        </Button>
      </Box>
      
     
    </Box>
  </motion.div>
</Box>

      <Footer />
    </Box>
  );
};

export default Home;