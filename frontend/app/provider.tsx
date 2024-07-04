'use client';
import axiosClient from '@/axios-client';
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';

interface AuthContextType {
  updateUser: (access_token: string) => Promise<void>;
  token: string | null;
  logout: () => void;
  user: any;
  email: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('ACCESS_TOKEN');
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  const updateUser = async (access_token: string) => {
    setToken(access_token);
    try {
      const res = await axiosClient.get('/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      setEmail(res.data.email);
    } catch (error: any) {
      console.error('Error updating user', error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ACCESS_TOKEN');
      window.location.reload(); // Trigger a full page refresh
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) {
          return;
        }

        const response = await axiosClient.get('/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setEmail(response.data.email);
      } catch (e) {
        console.error('Error fetching user', e);
      }
    };
    if (token) fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        updateUser,
        token,
        logout,
        user,
        email,
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
