'use client';
import { useAuth } from '@/app/provider';
import axiosClient from '@/axios-client';
import { Button } from '@/components/ui/button';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';

type ErrorResponseData = {
  detail: string;
};

interface IFormInput {
  email: string;
  password: string;
}

function SignIn() {
  const { updateUser } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async (data: any) => {
    const user_data = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await axios.post(
        'http://localhost:3001/auth/login',
        user_data
      );
      localStorage.setItem('ACCESS_TOKEN', response.data.access_token);
      await updateUser(response.data.user, response.data.access_token);

      toast('Login Success!');

      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      const axiosError = error as AxiosError;
      // Handle the error
      if (axiosError.response) {
        const errorData = axiosError.response.data as ErrorResponseData;
        const message = errorData.detail;
        if (message == 'Incorrect password!') {
          toast('Incorrect password!');
          setTimeout(() => {}, 1400);
        } else if (message == 'User not found!') {
          toast('User not found!');
          setTimeout(() => {}, 1400);
        }
      } else {
        console.error('Error', axiosError.message);
      }
    }
  };

  return (
    <div className="max-w-sm w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Toaster />
        <div>
          <p className="text-center text-xl font-bold text-slate-800">
            Sign in
          </p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm mb-2">
            Email
          </label>
          <input
            className="w-full border rounded-lg py-2 px-4 focus:outline-none"
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
          Sign in
        </Button>
      </form>
      <p className="text-sm text-center my-2">
        Don&apos;t have an account?{' '}
        <a href="/auth/signup" className="font-semibold">
          Create now
        </a>
      </p>
    </div>
  );
}

export default SignIn;
