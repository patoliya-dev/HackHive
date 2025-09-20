// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user') || '{}'));

  // Load credentials from session storage on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    console.log("userssss", storedUser)
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username, password) => {
    // Simple demo login check
    if (username === 'admin@gmail.com' && password === 'admin') {
      const userData = { username, password };

      // Save credentials in state and session storage
      setUser(userData);
      sessionStorage.setItem('user', JSON.stringify(userData));

      navigate('/'); // redirect to dashboard
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
