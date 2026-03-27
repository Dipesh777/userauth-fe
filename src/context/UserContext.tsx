'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types/user';
import { AuthUser } from '../types/login';
import { getAlluserapi, userapi } from '../api/userapi';

const initialData: User[] = [
    { id: 1, first_name: 'Dipesh', last_name: 'Panchal', email: 'dipesh@example.com' },
    { id: 2, first_name: 'Prakash', last_name: 'Bhai', email: 'prakash@example.com' },
    { id: 3, first_name: 'Rakesh', last_name: 'Bhai', email: 'rakesh@example.com' },
];

interface UserContextType {
    users: User[];
    addUser: (user: Omit<User, 'id'>) => Promise<void>;
    updateUser: (user: User) => Promise<void>;
    loading: boolean;
    authUser: AuthUser | null;
    login: (credentials: any) => Promise<void>;
    logout: () => void;
    register: (userData: any) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [authUser, setAuthUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        // Check if user is logged in
        const savedUser = localStorage.getItem('authUser');
        if (savedUser) setAuthUser(JSON.parse(savedUser));
        fetchUsers();
    }, []);


    // Get All users from Back-end
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await getAlluserapi.get('/users');
            // If API returns empty array, users will be [], showing "No records" in UI
            setUsers(response.data);
        } catch (error) {
            console.error("API failed, loading fallback data:", error);
            setUsers(initialData);
        } finally {
            setLoading(false);
        }
    };

    // Login user and save token
    const login = async (credentials: any) => {
        const response = await userapi.post('/auth/login', credentials); // Change to your NestJS endpoint
        console.log("Login response:", response.data); // Debug log to check response structure
        const { access_token } = response.data; // Assuming API returns { token, user: { name, email } }

        localStorage.setItem('token', access_token);
        localStorage.setItem('authUser', JSON.stringify(credentials));
        setAuthUser(credentials);
    };

    // Logout user
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('authUser');
        setAuthUser(null);
    };

    // Register new user to backend
    const register = async (userData: any) => {
        try {
            // Matches your requested JSON body: {first_name, last_name, email, password}
            await userapi.post('/users', userData);
            alert("Registration successful! Please login.");
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Registration failed");
        }
    };

    // Add new user to backend
    const addUser = async (userData: Omit<User, 'id'>) => {
        try {
            const response = await userapi.post('/users', userData);
            setUsers(prev => [...prev, response.data]);
        } catch (error) {
            alert("Failed to add user to backend");
        }
    };

    // Update user details
    const updateUser = async (updatedUser: User) => {
        try {
            await userapi.put(`/users/${updatedUser.id}`, updatedUser);
            setUsers(prev => prev.map(u => (u.id === updatedUser.id ? updatedUser : u)));
        } catch (error) {
            alert("Failed to update user on backend");
        }
    };

    return (
        <UserContext.Provider value={{ users, loading, authUser, login, logout, addUser, updateUser, register }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUsers must be used within a UserProvider');
    return context;
};