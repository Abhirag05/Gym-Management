import React, { useState, useEffect } from 'react';
import { 
  Modal, Box, TextField, Button, Avatar,
  Typography, IconButton, Divider, Snackbar, Alert
} from '@mui/material';
import { CloudUpload, Close } from '@mui/icons-material';
import axios from 'axios';

const EditProfileModal = ({ open, onClose, user, onSave }) => {
  const [editedUser, setEditedUser] = useState(user);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setEditedUser(user);
    setSelectedImage(null);
    
    if (user?.avatar && user?.avatarContentType) {
      setSelectedImage(`data:${user.avatarContentType};base64,${user.avatar}`);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage('Image size should be less than 2MB');
        setErrorOpen(true);
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Only image files are allowed');
        setErrorOpen(true);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
      setEditedUser(prev => ({
        ...prev,
        avatar: file
      }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('age', editedUser.age);
      formData.append('weight', editedUser.weight);
      formData.append('height', editedUser.height);

      if (editedUser.avatar instanceof File) {
        formData.append('avatar', editedUser.avatar);
      }

      const response = await axios.put(
        `http://localhost:3004/profile/${user.email}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      if (onSave) {
        onSave(response.data.user);
      }
      setSuccessOpen(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile. Please try again.');
      setErrorOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const avatarUrl = selectedImage || (user.avatar ? "/default-avatar.png" : "/user.svg");

  return (
    <>
      <Modal 
        open={open} 
        onClose={onClose}
        aria-labelledby="edit-profile-modal"
        aria-describedby="edit-user-profile"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: '90vh',
          overflowY: 'auto',
          '&:focus': {
            outline: 'none'
          }
        }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="h2">
              Edit Profile
            </Typography>
            <IconButton onClick={onClose} aria-label="close" disabled={isSubmitting}>
              <Close />
            </IconButton>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar
              src={avatarUrl}
              sx={{ 
                width: 120, 
                height: 120, 
                mb: 2,
                border: '3px solid #ff416c'
              }}
            />
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUpload />}
              sx={{ mt: 1 }}
              disabled={isSubmitting}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
                disabled={isSubmitting}
              />
            </Button>
            <Typography variant="caption" sx={{ mt: 1 }}>
              Max 2MB (JPEG, PNG)
            </Typography>
          </Box>
          
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={editedUser.name || ''}
            onChange={handleChange}
            margin="normal"
            sx={{ mb: 2 }}
            disabled
          />
          
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={editedUser.age || ''}
            onChange={handleChange}
            margin="normal"
            sx={{ mb: 2 }}
            disabled={isSubmitting}
            inputProps={{ min: 1, max: 120 }}
          />
          
          <TextField
            fullWidth
            label="Weight (kg)"
            name="weight"
            type="number"
            value={editedUser.weight || ''}
            onChange={handleChange}
            margin="normal"
            sx={{ mb: 2 }}
            disabled={isSubmitting}
            inputProps={{ min: 1, max: 300 }}
          />
          
          <TextField
            fullWidth
            label="Height (cm)"
            name="height"
            type="number"
            value={editedUser.height || ''}
            onChange={handleChange}
            margin="normal"
            sx={{ mb: 2 }}
            disabled={isSubmitting}
            inputProps={{ min: 50, max: 250 }}
          />

          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button 
              onClick={onClose} 
              sx={{ mr: 2 }}
              variant="outlined"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSubmit}
              disabled={isSubmitting}
              sx={{ 
                backgroundColor: '#ff416c', 
                '&:hover': { 
                  backgroundColor: '#e5395f' 
                },
                '&:disabled': {
                  backgroundColor: '#cccccc'
                }
              }}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Success Notification */}
      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSuccessOpen(false)} 
          severity="success"
          sx={{ 
            width: '100%',
            backgroundColor: '#4caf50',
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          Profile updated successfully!
        </Alert>
      </Snackbar>

      {/* Error Notification */}
      <Snackbar
        open={errorOpen}
        autoHideDuration={5000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setErrorOpen(false)} 
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditProfileModal;