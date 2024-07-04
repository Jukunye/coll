'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { Button } from '../ui/button';
import { useAuth } from '@/app/provider';
import { Toaster, toast } from 'sonner';

type FormValues = {
  firstName?: string;
  lastName?: string;
  image?: string;
  headline?: string;
  bio?: string;
};

interface ParentProps {
  closeDialog: (open: boolean) => void;
}

const EditProfle: React.FC<ParentProps> = ({ closeDialog }) => {
  const { user, token } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      headline: user?.headline,
      bio: user?.bio,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await axios.patch(
        `http://localhost:3001/auth/profile/${user?._id}`,
        data,
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex mt-4 flex-col gap-4"
    >
      <div className="flex flex-col">
        <label htmlFor="firstName" className="text-sm mb-2">
          FirstName
        </label>
        <input
          id="firstName"
          placeholder="Enter the firstName"
          {...register('firstName')}
          className="max-w-md border-slate-200 bg-slate-50 rounded-lg p-2 placeholder:text-slate-300 focus:outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="lastName" className="text-sm mb-2">
          LastName
        </label>
        <input
          id="lastName"
          placeholder="Enter the lastName"
          {...register('lastName')}
          className="max-w-md border-slate-200 bg-slate-50 rounded-lg p-2 placeholder:text-slate-300 focus:outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="headline" className="text-sm mb-2">
          Headline
        </label>
        <input
          id="headline"
          placeholder="Enter the headline"
          {...register('headline')}
          className="max-w-md border-slate-200 bg-slate-50 rounded-lg p-2 placeholder:text-slate-300 focus:outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="bio" className="text-sm mb-2">
          Bio
        </label>
        <textarea
          className="max-w-md bg-slate-50 rounded-lg p-2 placeholder:text-slate-300 focus:outline-none"
          rows={5}
          placeholder="Enter the project bio"
          id="bio"
          {...register('bio')}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="image" className="text-sm mb-2">
          Image
        </label>
        <input
          id="image"
          defaultValue={user?.image}
          {...register('image')}
          className="text-sm max-w-md border-slate-200 bg-slate-50 rounded-lg p-2 placeholder:text-slate-300 focus:outline-none"
        />
      </div>

      <div className="flex-1 mt-4 flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default EditProfle;
