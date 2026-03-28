'use client';
import { Box, TextField, Button, Typography, Paper, Container } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
          <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
            Login to UserAuth
          </Typography>
          <TextField
            fullWidth label="Email" margin="normal"
            onChange={(e) => setForm({...form, email: e.target.value})}
          />
          <TextField
            fullWidth label="Password" type="password" margin="normal"
            onChange={(e) => setForm({...form, password: e.target.value})}
          />
          <Button 
            fullWidth variant="contained" size="large" sx={{ mt: 3 }}
            onClick={() => login(form)}
          >
            Sign In
          </Button>
          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account? <Link href="/register">Register</Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}