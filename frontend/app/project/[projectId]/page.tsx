'use client';
import AppBar from '@/components/AppBar';
import Footer from '@/components/footer';
import ProjectDetail from '@/components/projectDetail';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

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

function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const [data, setData] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3001/project/${params.projectId}`
        );
        setData(response.data);
      } catch (error) {
        console.error('Error occured fetching project data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.projectId]);

  return (
    <main className="max-w-screen-xl mx-auto flex min-h-screen flex-col items-center py-6">
      <AppBar />
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <ProjectDetail {...data} />
      ) : (
        <p className="text-sm text-slate-600">No project data found.</p>
      )}
      <div className="flex-grow"></div>
      <Footer />
    </main>
  );
}

export default ProjectDetailPage;
