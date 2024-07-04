'use client';
import { useAuth } from '@/app/provider';
import AppBar from '@/components/AppBar';
import Footer from '@/components/footer';
import { Person } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ProfilePage() {
  const [data, setData] = useState<Person | null>(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/auth/profile`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error occurred fetching profile data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <main className="max-w-screen-xl mx-auto flex min-h-screen flex-col items-center py-6">
      <AppBar />
      {loading ? <p>Loading...</p> : <div>{data?.email}</div>}
      <div className="flex-grow"></div>
      <Footer />
    </main>
  );
}

export default ProfilePage;
