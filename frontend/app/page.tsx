'use client';
import AppBar from '@/components/AppBar';
import SuggestButton from '@/components/suggest-button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from './provider';

interface Person {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  __v: number;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  owner: Person;
  members: Person[];
  level: string;
  language: string;
  image: string;
  start: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function Home() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/project', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error occured fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <main className="max-w-screen-xl mx-auto flex min-h-screen flex-col items-center py-6">
      <AppBar />
      <SuggestButton />
      {data.map((project) => (
        <div key={project._id}>
          <h2>{project.title} </h2>
        </div>
      ))}
    </main>
  );
}
