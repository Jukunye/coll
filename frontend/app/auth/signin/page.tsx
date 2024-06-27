'use client';
import { useAuth } from '@/app/provider';
import axiosClient from '@/axios-client';
import { Button } from '@/components/ui/button';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';

type ErrorResponseData = {
  detail: string;
};

function SignIn() {
  const { updateUser } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const user_data = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await axiosClient.post('/auth/login', user_data);
      localStorage.setItem('ACCESS_TOKEN', response.data.access_token);
      await updateUser();

      toast('Login Success!');

      setTimeout(() => {
        router.push('/');
      }, 3000);
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
    <div className="min-h-screen py-5 px-4">
      <Toaster />
      <h4 className="text-xl">Sign in</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: true })}
          />
          {/* {errors.email && <span>Email is required</span>} */}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          {/* {errors.password && <span>Password is required</span>} */}
        </div>

        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}

export default SignIn;
