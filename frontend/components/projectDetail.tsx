import React from 'react';

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

const ProjectDetail: React.FC<Props> = ({
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
    <div>
      <p>{owner.email}</p>
      <p>{formatDate(start)}</p>
      <p>{image}</p>
      <p>{title}</p>
      <p>{description}</p>
      <p>{level}</p>
      <p>{language}</p>
    </div>
  );
};

export default ProjectDetail;
