'use client';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Box, Typography, Paper } from '@mui/material';
import { useState } from 'react';
import { useUsers } from '../context/UserContext';
import { UserModal } from './UserModal';
import { User } from '../types/user';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

export const UserTable = () => {
    const { users, addUser, updateUser } = useUsers();
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'first_name', headerName: 'First Name', flex: 1 },
        { field: 'last_name', headerName: 'Last Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1.5 },
        {
            field: 'actions',
            headerName: 'Edit User',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <Button
                    variant="text"
                    startIcon={<EditIcon />}
                    onClick={() => {
                        setSelectedUser(params.row);
                        setModalOpen(true);
                    }}
                >
                    Edit
                </Button>
            ),
        },
    ];

    return (
        <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto', mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold" color="primary">User List</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => { setSelectedUser(null); setModalOpen(true); }}
                    sx={{ borderRadius: 2 }}
                >
                    Add New User
                </Button>
            </Box>

            <Paper elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, overflow: 'hidden' }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                    pageSizeOptions={[5, 10, 25]}
                    disableRowSelectionOnClick
                    autoHeight
                />
            </Paper>

            <UserModal
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                initialData={selectedUser}
                onSubmit={(data) => selectedUser ? updateUser(data) : addUser(data)}
            />
        </Box>
    );
};