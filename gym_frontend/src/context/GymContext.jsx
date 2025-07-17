/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

export const GymContext = createContext(null);

const GymContextProvider = (props) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  

  

  
  const value = {
    
    backendURL,
    
  };

  return (
    <GymContext.Provider value={value}>{props.children}</GymContext.Provider>
  );
};
export default GymContextProvider;