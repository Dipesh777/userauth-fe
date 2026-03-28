'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types/user';
import { withOutAuth } from '../api/apiBase';
import { userService } from '@/services/userService';
import { useAuth } from './AuthContext'; // We can now use Auth inside UserContext!

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
    register: (userData: any) => Promise<void>;
    fetchUsers: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const { authUser } = useAuth(); // Get authUser from AuthContext


    // Get All users from Back-end
    const fetchUsers = async () => {
        if (!authUser) return; // Don't fetch if not authenticated
        setLoading(true);
        try {
            const response = await userService.getUsers();
            // If API returns empty array, users will be [], showing "No records" in UI
            setUsers(response.data);
        } catch (error) {
            console.error("API failed, loading fallback data:", error);
            setUsers(initialData);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [authUser]); // Refetch users whenever authUser changes (login/logout)


    // Register new user to backend
    const register = async (userData: any) => {
        try {
            // Matches your requested JSON body: {first_name, last_name, email, password}
            const response = await withOutAuth.post('/users', userData);
            alert("Registration successful! Please login.");
            setUsers(prev => [...prev, response.data]);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Registration failed");
        }
    };

    // Add new user to backend
    const addUser = async (userData: Omit<User, 'id'>) => {
        register(userData).catch(err => alert(err.message)) // Reuse register logic for adding users, but handle errors here;
        // try {
        //     const response = await withOutAuth.post('/users', userData);
        //     setUsers(prev => [...prev, response.data]);
        // } catch (error) {
        //     alert("Failed to add user to backend");
        // }
    };

    // Update user details
    const updateUser = async (updatedUser: User) => {
        try {
            await userService.updateUser(updatedUser.id, updatedUser);
            setUsers(prev => prev.map(u => (u.id === updatedUser.id ? updatedUser : u)));
        } catch (error) {
            alert("Failed to update user on backend");
        }
    };

    return (
        <UserContext.Provider value={{ users, loading, addUser, updateUser, register, fetchUsers }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUsers must be used within a UserProvider');
    return context;
};