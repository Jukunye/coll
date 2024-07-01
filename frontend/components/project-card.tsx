import React from 'react';
import { Button } from './ui/button';
import ElipsisIcon from './icons';
import ProjectCardMenu from './projectCardMenu';

type Person = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  __v: number;
};

type Props = {
  _id: string;
  title: string;
  description: string;
  owner: Person;
  members?: Person[];
  level?: string;
  language?: string;
  image: string;
  start: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const ProjectCard: React.FC<Props> = ({
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
    <div className="border rounded-md w-80 my-4">
      <div className="flex items-center justify-between text-sm pl-4 pr-1 py-2">
        <p>
          {owner.firstName} {owner.lastName}
        </p>
        <div className="flex items-center">
          <p className="text-xs text-slate-400">{formatDate(start)}</p>
          <ProjectCardMenu />
        </div>
      </div>
      <img
        src={image}
        alt={'project image'}
        className="w-80 h-44 object-cover bg-slate-100"
      />
      <div className="px-4 py-3 text-sm">
        <div className="flex justify-between my-2 text-xs">
          {level && (
            <p className="bg-slate-50 text-slate-600 py-1 px-3 rounded-full">
              {level}
            </p>
          )}
          {language && <p className="text-slate-600">{language}</p>}
        </div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-2 text-slate-500">{description}</p>
      </div>
      <div className="flex justify-end px-6 pb-4">
        <Button variant="outline">Join</Button>
      </div>
    </div>
  );
};

export default ProjectCard;
