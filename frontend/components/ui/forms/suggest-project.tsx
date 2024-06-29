'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  title: string;
  description: string;
  language?: string;
  level?: string;
  schedule: Date;
};

const SuggetForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
  };

  const defaultSchedule = new Date();
  defaultSchedule.setDate(defaultSchedule.getDate() + 14);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" {...register('title', { required: true })} />
        {errors.title && <span>Title is required</span>}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register('description', { required: true })}
        ></textarea>
        {errors.description && <span>Description is required</span>}
      </div>

      <div>
        <label htmlFor="language">Language</label>
        <input id="language" {...register('language')} />
      </div>

      <div>
        <label htmlFor="level">Level</label>
        <input id="level" {...register('level')} />
      </div>

      <div>
        <label htmlFor="schedule">Schedule</label>
        <input
          id="schedule"
          type="date"
          {...register('schedule', { valueAsDate: true })}
          defaultValue={defaultSchedule.toISOString().split('T')[0]}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SuggetForm;
