'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { useAuth } from '@/app/provider';
import { Toaster, toast } from 'sonner';
import { Project } from '@/types';

type FormValues = {
  title: string;
  description: string;
  language?: string;
  level?: string;
  image?: string;
  start: Date;
};

interface ParentProps {
  closeDialog: (open: boolean) => void;
  project: Project;
}

const EditProject: React.FC<ParentProps> = ({ closeDialog, project }) => {
  const { token } = useAuth();
  const [level, setLevel] = useState<string | undefined>(project.level);
  const [language, setLanguage] = useState<string | undefined>(
    project.language
  );

  const defaultstart = new Date(project.start);
  defaultstart.setDate(defaultstart.getDate() + 14);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: project.title,
      description: project.description,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const projectData = {
      ...data,
      level,
      language,
    };
    try {
      await axios.put(
        `http://localhost:3001/project/${project._id}`,
        projectData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Successfully Updated!');
      closeDialog(false);
    } catch (error) {
      toast.error('Failed to update!');
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Toaster position="top-center" />
      <div className="flex flex-col">
        <label htmlFor="title" className="text-sm mb-2">
          Title
        </label>
        <textarea
          id="title"
          placeholder="Enter the title"
          {...register('title', { required: true })}
          className="max-w-md border-slate-200 bg-slate-50 rounded-lg p-2 placeholder:text-slate-300 focus:outline-none"
        />
        {errors.title && (
          <span className="text-xs text-gray-300">Title is required</span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className="text-sm mb-2">
          Description
        </label>
        <textarea
          className="max-w-md bg-slate-50 rounded-lg p-2 placeholder:text-slate-300 focus:outline-none"
          rows={5}
          placeholder="Enter the project description"
          id="description"
          {...register('description', { required: true })}
        />
        {errors.description && (
          <span className="text-gray-300 text-xs ">
            Description is required
          </span>
        )}
      </div>
      <div className="flex gap-10 sm:gap-20">
        <div>
          <label htmlFor="language" className="text-sm">
            Language
          </label>
          <Select onValueChange={setLanguage} defaultValue={language}>
            <SelectTrigger className="max-w-40 bg-slate-50 text-slate-700 mt-3">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="swift">Swift</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="kotlin">Kotlin</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="level" className="text-sm">
            Level
          </label>
          <Select onValueChange={setLevel} defaultValue={level}>
            <SelectTrigger className="max-w-40 text-slate-700 bg-slate-50 mt-3 focus:outline-none">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="image" className="text-sm mb-2">
          Image
        </label>
        <input
          id="image"
          defaultValue={project.image}
          {...register('image')}
          className="text-sm max-w-md border-slate-200 bg-slate-50 rounded-lg p-2 placeholder:text-slate-300 focus:outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="start" className="text-sm mb-2">
          start
        </label>
        <input
          className="w-64 bg-slate-50 text-slate-700 focus:outline-none"
          id="start"
          type="date"
          {...register('start', { valueAsDate: true })}
          defaultValue={defaultstart.toISOString().split('T')[0]}
        />
      </div>
      <div className="flex-1 mt-4 flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default EditProject;
