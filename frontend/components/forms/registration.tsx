'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { Button } from '../ui/button';

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // try {
    //   const response = await axios.post(
    //     'http://localhost/auth/register',
    //     data
    //   );
    //   console.log('User registered successfully:', response.data);
    // } catch (error) {
    //   console.error('Error registering user:', error);
    // }
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-96"
    >
      <div>
        <p className="text-center text-xl font-bold text-slate-800">Sign up</p>
        <p className="text-center text-sm font-light text-slate-600">
          Already have an accout?{' '}
          <a href="/auth/login" className="font-semibold">
            Log in
          </a>{' '}
        </p>
      </div>

      <div className="flex flex-col">
        <label htmlFor="firstName" className="text-sm mb-2">
          First Name
        </label>
        <input
          className="border rounded-lg py-2 px-4 focus:outline-none"
          id="firstName"
          {...register('firstName', { required: 'First name is required' })}
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="lastName" className="text-sm mb-2">
          Last Name
        </label>
        <input
          className="border rounded-lg py-2 px-4 focus:outline-none"
          id="lastName"
          {...register('lastName', { required: 'Last name is required' })}
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm mb-2">
          Email
        </label>
        <input
          className="border rounded-lg py-2 px-4 focus:outline-none"
          id="email"
          type="email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm mb-2">
          Password
        </label>
        <input
          className="border rounded-lg py-2 px-4 focus:outline-none"
          id="password"
          type="password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <Button type="submit" className="mt-3">
        Sign up
      </Button>
    </form>
  );
};

export default RegistrationForm;
