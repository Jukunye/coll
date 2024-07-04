'use client';
import AppBar from '@/components/AppBar';
import SuggestButton from '@/components/suggest-button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from './provider';
import ProjectCard from '@/components/project-card';
import Footer from '@/components/footer';
import { Project } from '@/types';

export default function Home() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

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

  const addProjectToState = (newProject: Project) => {
    setData((prevData) => [...prevData, newProject]);
  };

  return (
    <main className="max-w-screen-xl mx-auto flex min-h-screen flex-col items-center pb-6">
      <AppBar />
      <div className="w-full max-w-screen-lg mx-auto text-center px-4">
        <h1 className="font-bold mt-4 text-slate-700 text-3xl lg:text-4xl">
          Make amazing projects together
        </h1>
        <p className="text-sm my-2 max-w-screen-md mx-auto text-slate-500">
          Welcome to a space where collaboration and creativity thrive. Join a
          team of like-minded individuals. Together, we can tackle complex
          projects and solve challenging problems
        </p>
      </div>
      <div className="w-full text-right mb-3 px-8">
        <SuggestButton onProjectAdded={addProjectToState} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex justify-center flex-wrap gap-4">
          {data.map((project) => (
            <div key={project._id}>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      )}
      <div className="flex-grow"></div>
      <Footer />
    </main>
  );
}
