import { withAuth, withOutAuth } from '../api/apiBase';

export const userService = {
  getUsers: () => withAuth.get('/users'),
  createUser: (data: any) => withOutAuth.post('/users', data),
  updateUser: (id: number, data: any) => withOutAuth.put(`/users/${id}`, data),
};