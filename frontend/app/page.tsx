'use client';
import AppBar from '@/components/AppBar';
import SuggestButton from '@/components/suggest-button';

export default function Home() {
  return (
    <main className="max-w-screen-xl mx-auto flex min-h-screen flex-col items-center py-6">
      <AppBar />
      <SuggestButton />
    </main>
  );
}
