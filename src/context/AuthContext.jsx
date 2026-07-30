import React, { createContext, useContext, useEffect, useState } from 'react';
import { portfolioService } from '../services/portfolioService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('samim_portfolio_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await portfolioService.getMe();
        setUser(res.data.data);
      } catch (err) {
        console.error('Auth verification failed:', err);
        localStorage.removeItem('samim_portfolio_token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, [token]);

  const login = async (email, password) => {
    const res = await portfolioService.login({ email, password });
    const { token: jwtToken, user: userData } = res.data.data;
    localStorage.setItem('samim_portfolio_token', jwtToken);
    setToken(jwtToken);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('samim_portfolio_token');
    setToken(null);
    setUser(null);
  };

  const ADMIN_EMAIL = 'tamjidulislamsamim@gmail.com';
  const isAdmin = Boolean(
    user && (
      user.role === 'ADMIN' ||
      user.role === 'admin' ||
      user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()
    )
  );

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
