'use client';
import { use, useState } from 'react';
import { UserProvider } from '../context/UserContext';

import { useUsers } from '../context/UserContext';
import { UserTable } from '../components/UserTable';
import { LoginModal } from '../components/LoginModal';
import { RegisterModal } from '../components/RegisterModal';
import { Box, Typography, Button, Container, Paper } from '@mui/material';

export default function Home() {
  const { authUser, login, register } = useUsers();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // IF LOGGED IN: Show the Dashboard
  if (authUser) {
    return (
        <Container sx={{ mt: 4 }}>
          <UserTable />
        </Container>
    );
  }

  // IF NOT LOGGED IN: Show Landing Page
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header with Register Button */}
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid #eee' }}>
        <Button variant="outlined" onClick={() => setShowRegister(true)}>Register</Button>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="sm" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: '1px solid #ddd', borderRadius: 4 }}>
          <Typography variant="h3" gutterBottom fontWeight="bold">Welcome</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Please login to access the user management dashboard.
          </Typography>
          <Button size="large" variant="contained" onClick={() => setShowLogin(true)} sx={{ px: 8 }}>
            Login Now
          </Button>
        </Paper>
      </Container>

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} onLogin={login} />
      <RegisterModal open={showRegister} onClose={() => setShowRegister(false)} onRegister={register} />
    </Box>
  );
}