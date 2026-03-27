'use client';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Stack } from '@mui/material';
import { useState } from 'react';

export const RegisterModal = ({ open, onClose, onRegister }: any) => {
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '' });

  const handleSubmit = async () => {
    await onRegister(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Create Account</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="First Name" fullWidth onChange={(e) => setForm({...form, first_name: e.target.value})} />
          <TextField label="Last Name" fullWidth onChange={(e) => setForm({...form, last_name: e.target.value})} />
          <TextField label="Email" fullWidth onChange={(e) => setForm({...form, email: e.target.value})} />
          <TextField label="Password" type="password" fullWidth onChange={(e) => setForm({...form, password: e.target.value})} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Register</Button>
      </DialogActions>
    </Dialog>
  );
};