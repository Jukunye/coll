'use client';
import Footer from '@/components/footer';
import AppBar from '@/components/header/AppBar';
import ProjectDetail from '@/components/projectDetail';
import { Project } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const [data, setData] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
    <main className="max-w-screen-xl mx-auto flex min-h-screen flex-col items-center px-4 pb-6">
      <AppBar />
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <ProjectDetail {...data} />
      ) : (
        <p className="text-sm text-slate-600">No project data found.</p>
      )}
      <div className="flex-grow mb-12"></div>
      <Footer />
    </main>
  );
}

export default ProjectDetailPage;
