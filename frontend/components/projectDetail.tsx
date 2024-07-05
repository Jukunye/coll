import { Project } from '@/types';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import EditProjectButton from './EditProjectButton';
import { useAuth } from '@/app/provider';

const ProjectDetail: React.FC<Project> = ({
  owner,
  start,
  image,
  title,
  description,
  level,
  language,
}) => {
  const { user } = useAuth();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-screen-md mx-auto mt-3 sm:px-9 md:px-0 md:mt-6">
      <div className="flex flex-col">
        <div className="flex-1">
          <div className="flex mt-10">
            <Avatar>
              <AvatarImage src={owner.image} alt="profile" />
              <AvatarFallback>
                {owner.firstName[0]} {owner.lastName[0]}{' '}
              </AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <p className="font-medium">
                {owner.firstName} {owner.lastName}{' '}
              </p>
              <p className="text-xs text-slate-500">{formatDate(start)}</p>
            </div>
          </div>
          <h1 className="mt-3 text-3xl font-bold md:mt-6 lg:text-4xl">
            {title}
          </h1>
          <div className="flex my-4 gap-10 text-xs max-w-sm sm:text-sm lg:mt-10">
            {level && (
              <p className="bg-slate-50 text-slate-600 py-1 px-3 rounded-full">
                {level}
              </p>
            )}
            {language && <p className="text-slate-600">{language}</p>}
          </div>
        </div>
        <div>
          <img
            src={image}
            alt="Project image"
            className="w-full mx-auto sm:w-10/12 lg:w-full object-cover max-h-60 sm:max-h-80 md:max-h-96 lg:max-h-[400px]"
          />
        </div>
      </div>
      <p className="mt-4">{description}</p>
      <div className="w-full text-right">
        {user?._id === owner._id && <EditProjectButton />}
      </div>
    </div>
  );
};

export default ProjectDetail;
