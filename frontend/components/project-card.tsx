import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import ProjectCardMenu from './projectCardMenu';
import { ArrowIcon, MembersIcon } from './icons';
import axios from 'axios';
import { useAuth } from '@/app/provider';
import JoinButton from './joinButton';

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
  members: Person[];
  level?: string;
  language?: string;
  image: string;
  start: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const ProjectCard: React.FC<Props> = ({
  _id,
  owner,
  start,
  image,
  title,
  description,
  level,
  language,
  members: initialMembers,
}) => {
  const [members, setMembers] = useState<Person[]>(initialMembers);

  useEffect(() => {
    // This effect will run whenever `members` changes
  }, [members]);

  const handleUpdateMembers = (updatedMembers: Person[]) => {
    setMembers(updatedMembers);
  };

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
          <ProjectCardMenu title={title} ownerId={owner._id} projectId={_id} />
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
        <p className="mt-2 text-slate-500">
          {description.length > 20 ? (
            <>
              {`${description.substring(0, 140)}...`}
              <a
                href={`/project/${_id}`}
                className="font-medium ml-4 text-slate-600 inline-flex items-center"
              >
                Read more
                <ArrowIcon />
              </a>
            </>
          ) : (
            description
          )}
        </p>
      </div>
      <div className="flex items-center justify-between px-6 pb-4">
        <div className="flex items-center">
          <MembersIcon />
          <p className="font-light text-sm ml-1">{members.length}</p>
        </div>
        <JoinButton
          title={title}
          projectId={_id}
          members={members}
          onUpdateMembers={handleUpdateMembers}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
