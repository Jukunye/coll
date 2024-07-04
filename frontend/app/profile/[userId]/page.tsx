'use client';
import { useAuth } from '@/app/provider';
import AppBar from '@/components/AppBar';
import EditProfileButton from '@/components/EditProfileButton';
import Footer from '@/components/footer';
import { Person } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'sonner';

function ProfilePage({ params }: { params: { userId: string } }) {
  const [data, setData] = useState<Person | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/auth/profile/${params.userId}`
        );
        setData(response.data);
      } catch (error) {
        console.error('Error occurred fetching profile data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.userId]);

  return (
    <main className="max-w-screen-xl mx-auto flex min-h-screen flex-col items-center pb-6">
      <Toaster position="top-center" />
      <AppBar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col justify-center text-center mt-10">
          <img
            src={user?.image}
            alt="User image"
            className="size-30 mx-auto rounded-full"
          />
          <p className="text-2xl font-semibold mt-3">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-sm text-slate-500">{user?.headline} </p>
          <div className="mt-12">
            <p className="text-lg font-semibold mb-2">Bio</p>
            <p className="max-w-md text-balance text-slate-700">{user?.bio} </p>
          </div>
        </div>
      )}
      <div className="flex-grow"></div>
      {user?._id === params.userId && <EditProfileButton />}
      <Footer />
    </main>
  );
}

export default ProfilePage;
