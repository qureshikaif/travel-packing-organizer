// src/context/AuthContext.js
import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  
  // State to hold authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // State to hold user information (optional)
  const [user, setUser] = useState(null);
  
  // Login function
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    navigate('/gear-organizer');
  };
  
  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};
