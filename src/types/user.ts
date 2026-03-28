export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password?: string; // Optional for editing existing users
}