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
import { SelectLabel } from '@radix-ui/react-select';
import { Button } from '../ui/button';

type FormValues = {
  title: string;
  description: string;
  language?: string;
  level?: string;
  schedule: Date;
};

const SuggetForm: React.FC = () => {
  const [level, setLevel] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // try {
    //   const response = await axios.post('/api/endpoint', data);
    //   console.log('Response:', response.data);
    // } catch (error) {
    //   console.error('Error:', error);
    // }
    console.log({ ...data, level, language });
  };

  const defaultSchedule = new Date();
  defaultSchedule.setDate(defaultSchedule.getDate() + 14);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 p-4">
      <div className="flex flex-col">
        <label htmlFor="title" className="text-sm text-slate-500 mb-3">
          Title
        </label>
        <textarea
          id="title"
          placeholder="Enter the title"
          {...register('title', { required: true })}
          className="max-w-xs border-slate-200 bg-slate-50 placeholder:text-slate-300 focus:outline-none"
        />
        {errors.title && (
          <span className="text-xs text-gray-300">Title is required</span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className="text-sm text-slate-500 mb-3">
          Description
        </label>
        <textarea
          className="max-w-xs bg-slate-50 placeholder:text-slate-300 focus:outline-none"
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

      <div>
        <label htmlFor="language" className="text-sm text-slate-500">
          Language
        </label>
        <Select onValueChange={setLanguage} defaultValue={language}>
          <SelectTrigger className="w-64 bg-slate-50 text-slate-700 mt-3">
            <SelectValue placeholder="Select a programming language" />
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
        <label htmlFor="level" className="text-sm text-slate-500">
          Level
        </label>
        <Select onValueChange={setLevel} defaultValue={level}>
          <SelectTrigger className="max-w-64 text-slate-700 bg-slate-50 mt-3 focus:outline-none">
            <SelectValue placeholder="Select the level of complexity" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermidiate">Intermediate</SelectItem>
              <SelectItem value="advance">AdVance</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="schedule" className="text-sm text-slate-500 mb-3">
          Schedule
        </label>
        <input
          className="w-64 bg-slate-50 text-slate-700 focus:outline-none"
          id="schedule"
          type="date"
          {...register('schedule', { valueAsDate: true })}
          defaultValue={defaultSchedule.toISOString().split('T')[0]}
        />
      </div>
      <div className="flex-1 mt-4 flex justify-end">
        <Button type="submit">Submit project</Button>
      </div>
    </form>
  );
};

export default SuggetForm;
