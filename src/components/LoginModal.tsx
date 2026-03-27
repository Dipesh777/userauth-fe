'use client';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Stack } from '@mui/material';
import { useState } from 'react';

export const LoginModal = ({ open, onClose, onLogin }: { open: boolean, onClose: () => void, onLogin: (data: any) => Promise<void> }) => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async () => {
    try {
      await onLogin(form);
      onClose();
    } catch (err) {
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Email" fullWidth value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
          <TextField label="Password" type="password" fullWidth value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Login</Button>
      </DialogActions>
    </Dialog>
  );
};