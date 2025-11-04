

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const MOCK_USER = {
  id: '23021519-058',
  name: 'Mohsin Raza Gondal',
  email: 'awd.doctypechanger2@gmail.com',
};


export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('auth_token');
  });
  const [user, setUser] = useState(() => {
    return isAuthenticated ? MOCK_USER : null;
  });

  const login = (credentials) => {
   
    console.log('Attempting login with:', credentials);
    
    localStorage.setItem('auth_token', 'mock-jwt-token-12345');
    setIsAuthenticated(true);
    setUser(MOCK_USER);
    console.log('Login successful (Mock)');
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    setUser(null);
    console.log('Logout successful');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};