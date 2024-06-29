import React from 'react';

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
    <div>
      <p>{owner}</p>
      <p>{start}</p>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      {level && <p>Level: {level}</p>}
      {language && <p>Language: {language}</p>}
    </div>
  );
};

export default ProjectCard;
