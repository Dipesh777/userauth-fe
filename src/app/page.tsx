import { UserProvider } from '../context/UserContext';
import { UserTable } from '../components/UserTable';
import { Container } from '@mui/material';

export default function Home() {
  return (
    <UserProvider>
      <Container component="main">
        <UserTable />
      </Container>
    </UserProvider>
  );
}