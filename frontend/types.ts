// types.ts

export interface Person {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  headline: string;
  bio: string;
  __v: number;
}

export interface Project {
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
}
