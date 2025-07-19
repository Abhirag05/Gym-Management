// src/components/AuthWrapper.jsx
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GymContext } from '../context/GymContext';
import axios from 'axios';

const AuthWrapper = ({ children }) => {
  const { backendURL } = useContext(GymContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          throw new Error('No user found');
        }

        await axios.get(`${backendURL}/profile/${user.email}`, {
          withCredentials: true
        });
      } catch (err) {
        localStorage.removeItem('user');
        localStorage.removeItem('admission');
        navigate('/sign');
      }
    };

    verifyAuth();
  }, [backendURL, navigate]);

  return children;
};

export default AuthWrapper;