'use client';
import { Person } from '@/types';
import axios from 'axios';
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';

interface AuthContextType {
  updateUser: (user: Person, access_token: string) => Promise<void>;
  token: string | null;
  logout: () => void;
  user: Person | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Person | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('ACCESS_TOKEN');
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  const updateUser = async (user: Person, access_token: string) => {
    setToken(access_token);
    setUser(user);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) {
          return;
        }

        const response = await axios.get(`http://localhost:3001/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (e) {
        console.error('Error fetching user', e);
      }
    };
    if (token) fetchUser();
  }, [token]);

  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ACCESS_TOKEN');
      window.location.reload(); // Trigger a full page refresh
    }
  };

  return (
    <AuthContext.Provider
      value={{
        updateUser,
        token,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
