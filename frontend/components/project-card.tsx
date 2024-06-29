import React from 'react';
import { Button } from './ui/button';

type Props = {
  owner: string;
  start: string;
  image: string;
  title: string;
  description: string;
  level?: string;
  language?: string;
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
  return (
    <div className="border rounded-md max-w-xs">
      <div className="flex justify-between text-sm px-6 py-3">
        <p>{owner}</p>
        <p className="text-xs text-slate-400">{start}</p>
      </div>
      <img
        src={image}
        alt={title}
        className="max-w-xs h-auto object-cover bg-slate-100"
      />
      <div className="px-6 py-3 text-sm">
        <div className="flex justify-between my-2">
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
