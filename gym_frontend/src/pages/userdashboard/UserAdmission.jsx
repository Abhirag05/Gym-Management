import React, { useState } from 'react';
import AdmissionForm from '../../components/AdmissionForm';
import { Box, Button } from '@mui/material';

const UserAdmission = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleOpenForm = (plan) => {
    setSelectedPlan(plan);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <div>
      <style>{`
        .AdmissionBoxes {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          padding: 2rem;
        }

        .AdmissionBox {
          background-color: #1f1f1f;
          border: 1px solid #444;
          border-radius: 12px;
          padding: 1.5rem;
          width: auto;
          height:auto;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          transition: 0.3s ease-in-out;
        }

        .AdmissionBox:hover {
          transform: translateY(-5px);
        }

        .AdmissionBox h3 {
          color: #ff416c;
        }

        .AdmissionBox h4 {
          color: #ccc;
          margin-bottom: 1rem;
        }

        .AdmissionBox ul {
          padding-left: 1.2rem;
          margin-bottom: 1rem;
          color: #eee;
        }

        .choose-plan-btn {
          width: 100%;
          font-weight: bold;
          color: #ff416c;
          border-color: #ff416c;
        }

        .choose-plan-btn:hover {
          background-color: #ff416c;
          color: white;
        }

        /* Responsive styles */
        @media (max-width: 1200px) {
          .AdmissionBoxes {
            gap: 1.5rem;
            padding: 1.5rem;
          }
        }

        @media (max-width: 900px) {
          .AdmissionBoxes {
            gap: 1.2rem;
            padding: 1.2rem;
          }
          
          .AdmissionBox {
            padding: 1.2rem;
            min-width: 250px;
          }
        }

        @media (max-width: 768px) {
          .AdmissionBoxes {
            gap: 1rem;
            padding: 1rem;
          }
          
          .AdmissionBox {
            padding: 1rem;
            min-width: 200px;
          }
          
          .AdmissionBox h3 {
            font-size: 1.2rem;
          }
          
          .AdmissionBox h4 {
            font-size: 1rem;
          }
          
          .AdmissionBox ul {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 600px) {
          .AdmissionBoxes {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }
          
          .AdmissionBox {
            width: 80%;
            max-width: 300px;
          }
        }

        @media (max-width: 480px) {
          .AdmissionBox {
            width: 90%;
          }
          
          h1 {
            font-size: 1.8rem;
          }
        }
      `}</style>

      <Box className="Admission">
        <h1 style={{ textAlign: 'center', color: 'white' }}>Take Your Admission From Here</h1>

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
            <Button className="choose-plan-btn" variant="outlined" onClick={() => handleOpenForm('Basic Plan')}>
              Choose Plan
            </Button>
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
            <Button className="choose-plan-btn" variant="outlined" onClick={() => handleOpenForm('Premium Plan')}>
              Choose Plan
            </Button>
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
            <Button className="choose-plan-btn" variant="outlined" onClick={() => handleOpenForm('Pro Plan')}>
              Choose Plan
            </Button>
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
            <Button className="choose-plan-btn" variant="outlined" onClick={() => handleOpenForm('Personal Training')}>
              Choose Plan
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Modal Form */}
      <AdmissionForm open={openForm} handleClose={handleCloseForm} plan={selectedPlan} />
    </div>
  );
};

export default UserAdmission;