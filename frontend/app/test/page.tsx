import RegistrationForm from '@/components/forms/registration';
import SuggetForm from '@/components/forms/suggest-project';
import ProjectCard from '@/components/project-card';
import React from 'react';

interface Project {
  owner: string;
  start: string;
  image: string;
  title: string;
  description: string;
  level?: string;
  language?: string;
}

const project: Project = {
  owner: 'John Doe',
  start: 'March 1st, 2023',
  image: 'https://sgame.etsisi.upm.es/pictures/12946.png?1608547866/',
  title: 'Full-stack project both back-end and front-end',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit inventore sed nesciunt neque! ea laudantium dolorem minus tenetur.',
  level: 'intermidiate',
  language: 'JavaScript',
};

function TestPage() {
  return (
    <div className="p-3 flex justify-center">
      <RegistrationForm />
    </div>
  );
}

export default TestPage;
