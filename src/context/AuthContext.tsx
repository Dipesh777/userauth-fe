'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/authService';

interface AuthContextType {
  authUser: any;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('authUser');
    if (saved) setAuthUser(JSON.parse(saved));
  }, []);

    // Login user and save token
  const login = async (credentials: any) => {
    const response = await authService.login(credentials);
    const { access_token } = response.data; // Assuming API returns { token, user: { name, email } }

    localStorage.setItem('token', access_token);
    localStorage.setItem('authUser', JSON.stringify(credentials));
    setAuthUser(credentials);
    router.push('/dashboard'); // Redirect after login
  };

   // Logout user
  const logout = () => {
    localStorage.clear();
    setAuthUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};