'use client';
import { useAuth } from './provider';

export default function Home() {
  const { user } = useAuth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Welcome {user?.firstName} </p>
    </main>
  );
}
