'use client';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { User } from '../types/user';

interface UserModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (user: any) => void;
    initialData?: User | null;
}

export const UserModal = ({ open, onClose, onSubmit, initialData }: UserModalProps) => {
    const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '' });
    const [errors, setErrors] = useState({ first_name: false, last_name: false, email: false });

    useEffect(() => {
        if (initialData) setFormData(initialData);
        else setFormData({ first_name: '', last_name: '', email: '' });
        setErrors({ first_name: false, last_name: false, email: false });
    }, [initialData, open]);

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = () => {
        const newErrors = {
            first_name: !formData.first_name.trim(),
            last_name: !formData.last_name.trim(),
            email: !validateEmail(formData.email),
        };
        setErrors(newErrors);

        if (!Object.values(newErrors).some(Boolean)) {
            onSubmit(formData);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>{initialData ? 'Edit User' : 'Add New User'}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 2 }}>
                    <TextField
                        label="First Name"
                        fullWidth
                        required
                        error={errors.first_name}
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        required
                        error={errors.last_name}
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        required
                        error={errors.email}
                        helperText={errors.email ? "Please enter a valid email address" : ""}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" disableElevation>
                    {initialData ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};