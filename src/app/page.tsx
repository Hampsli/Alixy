'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function Home() {
  const { user } = useApp();
  const router = useRouter();

  useEffect(() => {
    router.replace(user ? '/dashboard' : '/login');
  }, [user, router]);

  return null;
}
