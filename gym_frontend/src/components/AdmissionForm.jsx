import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Modal, MenuItem, Alert, Collapse, FormControlLabel, Checkbox, CircularProgress } from '@mui/material';
import axios from 'axios';

const AdmissionForm = ({ open, handleClose, isUpdate = false, existingData = {} }) => {
  const [inputs, setInputs] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    fitnessgoal: '',
    selectedplan: '',
    payment: {
      method: 'online',
      status: 'completed'
    }
  });

  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    fitnessgoal: '',
    selectedplan: '',
  });

  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [paymentStep, setPaymentStep] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  const [cardErrors, setCardErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const planPrices = {
    'Basic Plan': 999,
    'Premium Plan': 1499,
    'Pro Plan': 1999,
    'Personal Training': 2999
  };

  useEffect(() => {
    if (isUpdate && existingData) {
      setInputs({
        fullname: existingData.fullname || '',
        email: existingData.email || '',
        phonenumber: existingData.phonenumber || '',
        fitnessgoal: existingData.fitnessgoal || '',
        selectedplan: existingData.selectedplan || '',
      });
    }
  }, [isUpdate, existingData]);

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'fullname':
        if (!value.trim()) error = 'Full name is required';
        else if (!/^[a-zA-Z ]+$/.test(value)) error = 'Name should contain only letters';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
        break;
      case 'phonenumber':
        if (!value) error = 'Phone number is required';
        else if (!/^\d{10}$/.test(value)) error = 'Phone number must be 10 digits';
        break;
      case 'fitnessgoal':
      case 'selectedplan':
        if (!value) error = 'This field is required';
        break;
      default:
        break;
    }
    
    return error;
  };

  const validateCardField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'cardNumber':
        if (!value.trim()) error = 'Card number is required';
        else if (!/^\d{16}$/.test(value.replace(/\s/g, ''))) error = 'Invalid card number (16 digits required)';
        break;
      case 'expiryDate':
        if (!value.trim()) error = 'Expiry date is required';
        else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) error = 'Invalid format (MM/YY)';
        break;
      case 'cvv':
        if (!value.trim()) error = 'CVV is required';
        else if (!/^\d{3,4}$/.test(value)) error = 'Invalid CVV (3-4 digits)';
        break;
      case 'nameOnCard':
        if (!value.trim()) error = 'Name on card is required';
        break;
      default:
        break;
    }
    
    return error;
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const cardInputHandler = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
    } 
    else if (name === 'expiryDate') {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})/, '$1/')
        .substring(0, 5);
      setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setCardDetails(prev => ({ ...prev, [name]: value }));
    }
    
    if (cardErrors[name]) {
      setCardErrors(prev => ({ ...prev, [name]: validateCardField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleCardBlur = (e) => {
    const { name, value } = e.target;
    setCardErrors(prev => ({ ...prev, [name]: validateCardField(name, value) }));
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#1a1a1a',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    color: 'white',
    maxHeight: '90vh',
    overflowY: 'auto',
    '@media (max-width: 600px)': {
      width: '90%',
      p: 2,
    },
    '@media (max-width: 400px)': {
      width: '95%',
      p: 1.5,
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(inputs).forEach(key => {
      const error = validateField(key, inputs[key]);
      newErrors[key] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);
    return isValid;
  };

  const validatePaymentForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(cardDetails).forEach(key => {
      const error = validateCardField(key, cardDetails[key]);
      newErrors[key] = error;
      if (error) isValid = false;
    });

    if (!termsAccepted) {
      isValid = false;
    }

    setCardErrors(newErrors);
    return isValid;
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (validateForm()) {
      setPaymentStep(true);
    } else {
      setSubmitError('Please fix all errors before proceeding to payment');
    }
  };

  const handleBackToForm = () => {
    setPaymentStep(false);
  };

  const mockPaymentProcessing = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isSuccess = Math.random() < 0.8;
        resolve(isSuccess);
      }, 2000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);
    setIsProcessing(true);

    if (!validatePaymentForm()) {
      setSubmitError('Please fix all payment details before submitting');
      setIsProcessing(false);
      return;
    }

    try {
      const paymentSuccess = await mockPaymentProcessing();
      
      if (!paymentSuccess) {
        throw new Error('Payment failed. Please try again or use a different payment method.');
      }

      let res;
      if (isUpdate && existingData?._id) {
        res = await axios.put(backendURL+`/changeadmission/${existingData._id}`, inputs);
      } else {
        res = await axios.post(backendURL+'/admission', inputs);
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        handleClose();
        setSubmitSuccess(false);
        setPaymentStep(false);
        setIsProcessing(false);
      }, 1500);
    } catch (err) {
      console.error('Error:', err);
      setSubmitError(err.message || 'Failed to process payment. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom sx={{ '@media (max-width: 600px)': { fontSize: '1.1rem' } }}>
          {isUpdate ? 'Update Your Plan' : 'Apply for Membership'}
        </Typography>

        <Collapse in={!!submitError}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        </Collapse>

        <Collapse in={submitSuccess}>
          <Alert severity="success" sx={{ mb: 2 }}>
            {isUpdate ? 'Plan updated successfully!' : 'Payment successful! Membership activated.'}
          </Alert>
        </Collapse>

        {!paymentStep ? (
          <Box component="form" onSubmit={handleProceedToPayment}>
            <TextField
              name="fullname"
              label="Full Name"
              fullWidth
              required
              margin="normal"
              value={inputs.fullname}
              onChange={inputHandler}
              onBlur={handleBlur}
              error={!!errors.fullname}
              helperText={errors.fullname}
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: 'white' } }}
              sx={{
                '& .MuiInputBase-root': {
                  '@media (max-width: 400px)': {
                    fontSize: '0.875rem'
                  }
                }
              }}
            />

            <TextField
              name="email"
              label="Email Address"
              fullWidth
              required
              margin="normal"
              type="email"
              value={inputs.email}
              onChange={inputHandler}
              onBlur={handleBlur}
              error={!!errors.email}
              helperText={errors.email}
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: 'white' } }}
              sx={{
                '& .MuiInputBase-root': {
                  '@media (max-width: 400px)': {
                    fontSize: '0.875rem'
                  }
                }
              }}
            />

            <TextField
              name="phonenumber"
              label="Phone Number"
              fullWidth
              required
              margin="normal"
              type="tel"
              value={inputs.phonenumber}
              onChange={inputHandler}
              onBlur={handleBlur}
              error={!!errors.phonenumber}
              helperText={errors.phonenumber}
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: 'white' } }}
              sx={{
                '& .MuiInputBase-root': {
                  '@media (max-width: 400px)': {
                    fontSize: '0.875rem'
                  }
                }
              }}
            />

            <TextField
              name="fitnessgoal"
              label="Fitness Goal"
              select
              fullWidth
              required
              margin="normal"
              value={inputs.fitnessgoal}
              onChange={inputHandler}
              onBlur={handleBlur}
              error={!!errors.fitnessgoal}
              helperText={errors.fitnessgoal}
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: 'white' } }}
              sx={{
                '& .MuiInputBase-root': {
                  '@media (max-width: 400px)': {
                    fontSize: '0.875rem'
                  }
                }
              }}
            >
              <MenuItem value="bulk">Bulk</MenuItem>
              <MenuItem value="strength training">Strength Training</MenuItem>
              <MenuItem value="muscle building">Muscle Building</MenuItem>
              <MenuItem value="combat training">Combat Training</MenuItem>
              <MenuItem value="fat loss">Fat Loss</MenuItem>
            </TextField>

            <TextField
              name="selectedplan"
              label="Select Plan"
              select
              fullWidth
              required
              margin="normal"
              value={inputs.selectedplan}
              onChange={inputHandler}
              onBlur={handleBlur}
              error={!!errors.selectedplan}
              helperText={errors.selectedplan}
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: 'white' } }}
              sx={{
                '& .MuiInputBase-root': {
                  '@media (max-width: 400px)': {
                    fontSize: '0.875rem'
                  }
                }
              }}
            >
              <MenuItem value="Basic Plan">Basic Plan - ${planPrices['Basic Plan']}/month</MenuItem>
              <MenuItem value="Premium Plan">Premium Plan - ${planPrices['Premium Plan']}/month</MenuItem>
              <MenuItem value="Pro Plan">Pro Plan - ${planPrices['Pro Plan']}/month</MenuItem>
              <MenuItem value="Personal Training">Personal Training - ${planPrices['Personal Training']}/month</MenuItem>
            </TextField>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: '#ff416c',
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#e13c5c',
                },
                '@media (max-width: 400px)': {
                  fontSize: '0.875rem',
                  padding: '8px 16px'
                }
              }}
            >
              Proceed to Payment
            </Button>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom sx={{ '@media (max-width: 600px)': { fontSize: '1.1rem' } }}>
              Payment Details
            </Typography>
            
            <Typography variant="subtitle1" gutterBottom sx={{ '@media (max-width: 600px)': { fontSize: '0.9rem' } }}>
              Plan: {inputs.selectedplan} - ${planPrices[inputs.selectedplan]}/month
            </Typography>

            <TextField
              name="nameOnCard"
              label="Name on Card"
              fullWidth
              required
              margin="normal"
              value={cardDetails.nameOnCard}
              onChange={cardInputHandler}
              onBlur={handleCardBlur}
              error={!!cardErrors.nameOnCard}
              helperText={cardErrors.nameOnCard}
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: 'white' } }}
              sx={{
                '& .MuiInputBase-root': {
                  '@media (max-width: 400px)': {
                    fontSize: '0.875rem'
                  }
                }
              }}
            />

            <TextField
              name="cardNumber"
              label="Card Number"
              fullWidth
              required
              margin="normal"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.cardNumber}
              onChange={cardInputHandler}
              onBlur={handleCardBlur}
              error={!!cardErrors.cardNumber}
              helperText={cardErrors.cardNumber}
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: 'white' } }}
              sx={{
                '& .MuiInputBase-root': {
                  '@media (max-width: 400px)': {
                    fontSize: '0.875rem'
                  }
                }
              }}
            />

            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              '@media (max-width: 400px)': {
                flexDirection: 'column',
                gap: 1
              }
            }}>
              <TextField
                name="expiryDate"
                label="Expiry Date (MM/YY)"
                fullWidth
                required
                margin="normal"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={cardInputHandler}
                onBlur={handleCardBlur}
                error={!!cardErrors.expiryDate}
                helperText={cardErrors.expiryDate}
                InputLabelProps={{ style: { color: '#ccc' } }}
                InputProps={{ style: { color: 'white' } }}
                sx={{
                  '& .MuiInputBase-root': {
                    '@media (max-width: 400px)': {
                      fontSize: '0.875rem'
                    }
                  }
                }}
              />

              <TextField
                name="cvv"
                label="CVV"
                fullWidth
                required
                margin="normal"
                type="password"
                value={cardDetails.cvv}
                onChange={cardInputHandler}
                onBlur={handleCardBlur}
                error={!!cardErrors.cvv}
                helperText={cardErrors.cvv}
                InputLabelProps={{ style: { color: '#ccc' } }}
                InputProps={{ style: { color: 'white' } }}
                sx={{
                  '& .MuiInputBase-root': {
                    '@media (max-width: 400px)': {
                      fontSize: '0.875rem'
                    }
                  }
                }}
              />
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  color="primary"
                />
              }
              label="I agree to the terms and conditions"
              sx={{ 
                mt: 2, 
                color: '#ccc',
                '@media (max-width: 400px)': {
                  '& .MuiTypography-root': {
                    fontSize: '0.8rem'
                  }
                }
              }}
            />

            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              mt: 3,
              '@media (max-width: 400px)': {
                flexDirection: 'column',
                gap: 1
              }
            }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleBackToForm}
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: '#ccc',
                  },
                  '@media (max-width: 400px)': {
                    fontSize: '0.875rem',
                    padding: '8px 16px'
                  }
                }}
              >
                Back
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isProcessing}
                sx={{
                  backgroundColor: '#ff416c',
                  color: 'white',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#e13c5c',
                  },
                  '&:disabled': {
                    backgroundColor: '#555',
                  },
                  '@media (max-width: 400px)': {
                    fontSize: '0.875rem',
                    padding: '8px 16px'
                  }
                }}
              >
                {isProcessing ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  `Pay $${planPrices[inputs.selectedplan]}`
                )}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default AdmissionForm;