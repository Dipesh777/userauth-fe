'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authUser) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [authUser, router]);

  return null; // Empty page while redirecting
}
