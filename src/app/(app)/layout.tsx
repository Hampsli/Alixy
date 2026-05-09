import type { ReactNode } from 'react';
import { RequireAuth } from '@/components/RouteGuard';
import { Layout } from '@/components/Layout';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <Layout>{children}</Layout>
    </RequireAuth>
  );
}
