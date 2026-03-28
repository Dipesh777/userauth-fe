'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { UserTable } from '@/components/UserTable';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box,
    Avatar,
    Stack
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function DashboardPage() {
    const { authUser, logout } = useAuth();
    const router = useRouter();

    // Redirect to login if a guest tries to access this URL directly
    useEffect(() => {
        if (!authUser && typeof window !== 'undefined') {
            router.push('/login');
        }
    }, [authUser, router]);

    if (!authUser) return null; // Prevent flicker before redirect

    return (
        <Box sx={{ flexGrow: 1, bgcolor: '#f9f9f9', minHeight: '100vh' }}>
            {/* 1. Navigation Bar */}
            <AppBar position="static" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0', bgcolor: 'white', color: 'text.primary' }}>
                <Container maxWidth="lg">
                    <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>
                        <Typography variant="h6" fontWeight="bold" color="primary" sx={{ letterSpacing: 1 }}>
                            USERAUTH
                        </Typography>

                        <Stack direction="row" spacing={3} alignItems="center">
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                                    <AccountCircleIcon />
                                </Avatar>
                                <Typography variant="body1" fontWeight="500">
                                    {authUser.first_name} {authUser.last_name}
                                </Typography>
                            </Stack>

                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                startIcon={<LogoutIcon />}
                                onClick={logout}
                                sx={{ borderRadius: 2 }}
                            >
                                Logout
                            </Button>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* 2. Main Content (The User Table) */}
            <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight="800" gutterBottom>
                        Project Dashboard
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your system users and their access levels here.
                    </Typography>
                </Box>

                {/* Your UserTable component handles the DataGrid and UserModal */}
                <UserTable />
            </Container>
        </Box>
    );
}