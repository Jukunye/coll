'use client';
import AppBar from '@/components/AppBar';
import SuggestButton from '@/components/suggest-button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from './provider';
import ProjectCard from '@/components/project-card';

interface Person {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
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
      const response = await axios.get('http://localhost:3001/project');

      setData(response.data);
    } catch (error) {
      console.error('Error occured fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="max-w-screen-xl mx-auto flex min-h-screen flex-col items-center py-6">
      <AppBar />
      <SuggestButton />
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.map((project) => (
          <div key={project._id}>
            <ProjectCard {...project} />
          </div>
        ))
      )}
    </main>
  );
}
