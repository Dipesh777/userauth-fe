'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types/user';

const initialData: User[] = [
    { id: 1, first_name: 'Dipesh', last_name: 'Panchal', email: 'dipesh@example.com' },
    { id: 2, first_name: 'Prakash', last_name: 'Bhai', email: 'prakash@example.com' },
    { id: 3, first_name: 'Rakesh', last_name: 'Bhai', email: 'rakesh@example.com' },
];

interface UserContextType {
    users: User[];
    addUser: (user: Omit<User, 'id'>) => void;
    updateUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>(initialData);

    const addUser = (userData: Omit<User, 'id'>) => {
        const newUser = { ...userData, id: Math.max(...users.map(u => u.id), 0) + 1 };
        setUsers([...users, newUser]);
    };

    const updateUser = (updatedUser: User) => {
        setUsers(users.map(u => (u.id === updatedUser.id ? updatedUser : u)));
    };

    return (
        <UserContext.Provider value={{ users, addUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUsers must be used within a UserProvider');
    return context;
};