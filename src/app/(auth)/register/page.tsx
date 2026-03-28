'use client';
import { useState } from 'react';
import { useUsers } from '@/context/UserContext'; // Import useUser to call register
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Box, TextField, Button, Typography, Paper, Container, Grid, Alert } from '@mui/material';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useUsers(); // We'll add register to AuthContext next
  const [error, setError] = useState('');
  
  // State matches your payload keys {first_name, last_name, email, password}
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '' });

  const handleRegister = async () => {
    setError(''); // Reset error
    // Simple frontend validation
    if (!form.first_name || !form.last_name || !form.email || !form.password) {
      setError('All fields are required.');
      return;
    }
    
    try {
      await register(form);
      alert("Registration successful! Please login.");
      router.push('/login'); // Redirect to login after success
    } catch (err: any) {
      setError(err.message || 'Registration failed. Try again.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 3, border: '1px solid #eee' }}>
          <Typography variant="h5" align="center" fontWeight="bold" gutterBottom color="primary">
            Create an Account
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            Welcome to UserAuth. Enter your details to get started.
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Grid container spacing={2}>
            {/* First Name & Last Name on one row */}
            <Grid item xs={6}>
              <TextField 
                fullWidth label="First Name" margin="none" required
                onChange={(e) => setForm({...form, first_name: e.target.value})} 
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                fullWidth label="Last Name" margin="none" required
                onChange={(e) => setForm({...form, last_name: e.target.value})} 
              />
            </Grid>

            {/* Email & Password on separate rows */}
            <Grid item xs={12}>
              <TextField 
                fullWidth label="Email" required type="email"
                onChange={(e) => setForm({...form, email: e.target.value})} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth label="Password" required type="password"
                helperText="Must be at least 6 characters."
                onChange={(e) => setForm({...form, password: e.target.value})} 
              />
            </Grid>
          </Grid>

          <Button 
            fullWidth variant="contained" size="large" sx={{ mt: 4, borderRadius: 2 }}
            onClick={handleRegister}
          >
            Register Now
          </Button>

          <Typography align="center" sx={{ mt: 3, color: 'text.secondary' }}>
            Already have an account? <Link href="/login" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>Sign In</Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}