import { Project } from '@/types';
import React from 'react';

const ProjectDetail: React.FC<Project> = ({
  owner,
  start,
  image,
  title,
  description,
  level,
  language,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full mt-3 md:mt-6 px-5 sm:px-10">
      <div className="w-full md:flex gap-4">
        <div className="flex-1">
          <div className="mt-10">
            <p className="font-medium">
              {owner.firstName} {owner.lastName}{' '}
            </p>
            <p className="text-xs text-slate-500">{formatDate(start)}</p>
          </div>
          <h1 className="mt-3 text-3xl font-bold md:mt-6 lg:text-4xl">
            {title}
          </h1>
          <div className="flex my-4 justify-between text-xs max-w-sm sm:text-sm lg:mt-10">
            {level && (
              <p className="bg-slate-50 text-slate-600 py-1 px-3 rounded-full">
                {level}
              </p>
            )}
            {language && <p className="text-slate-600">{language}</p>}
          </div>
        </div>
        <div className="flex-1">
          <img
            src={image}
            alt="Project image"
            className="w-full mx-auto sm:w-10/12 lg:w-full object-cover max-h-60 sm:max-h-80 md:max-h-96 lg:max-h-[400px]"
          />
        </div>
      </div>
      <p className="mt-4">{description}</p>
    </div>
  );
};

export default ProjectDetail;
