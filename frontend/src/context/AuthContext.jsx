import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('blinkfix_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('blinkfix_token') || null);
  const [authModal, setAuthModal] = useState(null); // 'login' | 'register' | null
  const [activeRole, setActiveRole] = useState('user'); // 'user' | 'partner_admin' switcher

  useEffect(() => {
    if (user) {
      localStorage.setItem('blinkfix_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('blinkfix_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('blinkfix_token', token);
    } else {
      localStorage.removeItem('blinkfix_token');
    }
  }, [token]);

  const login = async (email, password) => {
    const data = await api.login(email, password);
    if (data.success) {
      setUser(data.user);
      setToken(data.token);
      setAuthModal(null);
      return data;
    }
    throw new Error(data.message || 'Login failed');
  };

  const register = async (name, email, phone, password) => {
    const data = await api.register(name, email, phone, password);
    if (data.success) {
      setUser(data.user);
      setToken(data.token);
      setAuthModal(null);
      return data;
    }
    throw new Error(data.message || 'Registration failed');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user,
      authModal,
      setAuthModal,
      activeRole,
      setActiveRole,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
