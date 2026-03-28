import { withOutAuth } from '../api/apiBase';

export const authService = {
  login: (data: any) => withOutAuth.post('/auth/login', data),
  register: (data: any) => withOutAuth.post('/auth/register', data),
};