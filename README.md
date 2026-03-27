# userauth

A high-performance User Management & Authentication Dashboard built with **Next.js 14**, **Material UI (MUI)**, and **TypeScript**. This project features a secure Gated UI, where the user management table is only accessible after a successful JWT-based login.

## 🚀 Key Features

-   **Gated User Flow**: Initial landing page with Login/Register options; Dashboard is hidden until authentication is successful.
-   **JWT Authentication**: Complete flow for Registration and Login with secure token storage.
-   **Advanced Data Management**: Uses `MUI DataGrid` for a professional table experience with built-in pagination and sorting.
-   **Smart API Architecture**: 
    -   **Axios Interceptors**: Automatically attaches the Bearer token to protected requests.
    -   **Instance Separation**: Uses `userApi` for registration/updates and `getAlluserapi` for protected data fetching.
-   **Hydration Fix**: Implemented the "Mounted" hook pattern to ensure stable rendering between Next.js SSR and browser `localStorage`.

## 🛠️ Tech Stack

-   **Framework**: Next.js 14 (App Router)
-   **UI Library**: Material UI (MUI)
-   **HTTP Client**: Axios
-   **State Management**: React Context API
-   **Language**: TypeScript

## 📂 Project Structure

```text
src/
├── app/
│   ├── layout.tsx       # Root layout & Global UserProvider
│   └── page.tsx         # Main Landing Page / Dashboard Router
├── components/
│   ├── LoginModal.tsx   # Login form with email/password
│   ├── RegisterModal.tsx# Account creation (Names, Email, PWD)
│   ├── UserModal.tsx    # CRUD form for User list updates
│   └── UserTable.tsx    # Protected MUI DataGrid Table
├── context/
│   └── UserContext.tsx  # Centralized Auth & User state
├── lib/
│   └── axios.ts         # Axios instances (Public/Private)
└── types/
    └── user.ts          # TS Interfaces for User & Auth models

⚙️ Installation & Setup
1. Clone the repository:

Bash
git clone [YOUR_GITHUB_URL]
cd userauth

2. Install dependencies:

Bash
npm install

3. Environment Configuration:
Ensure your NestJS backend is running at http://localhost:5000. You can change this in src/lib/axios.ts or by creating a .env.local file.

4. Start the app:

Bash
npm run dev
Open http://localhost:3000 to begin.

📝 API Logic
Public Routes: /auth/register, /auth/login, and /users (POST/PUT).

Protected Routes: /users (GET) requires a valid Authorization: Bearer <JWT> header.

Session Persistence: Auth state is saved in localStorage and synchronized across the app via Context.

Developed by Dipesh Rajput