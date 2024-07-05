# Coll

Coll is a platform that brings like-minded people together to work on projects. Users can suggest the projects they wish to work on, and others who are interested can join them.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Frontend](#frontend)
- [Backend](#backend)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Coll is designed to foster collaboration by allowing users to propose projects and find teammates. It's built with a NestJS backend, MongoDB for the database, and a Next.js frontend with Tailwind CSS for styling and shadcn/ui customizable react components.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Jukunye/coll.git
   ```

2. **Navigate to the cloned repository:**

   ```bash
   cd coll
   ```

3. **Setup the Frontend:**

   1. Navigate to frontend directory:

   ```bash
   cd coll/frontend
   ```

   2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

   3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Setup the Backend:**

   1. Navigate to backend api directory:

   ```bash
   cd coll/backend
   ```

   2. Install dependencies:

   ```bash
   npm install
   ```

   3. Running the app:

   ```bash
    # development
    npm run start

    # watch mode
    npm run start:dev
   ```

## Usage

- The frontend will be available at `http://localhost:3000`.
- The backend will be available at `http://localhost:3001`.

## Project Structure

- **frontend**: Contains the Next.js frontend.
- **backend**: Contains the NestJS backend.

## Frontend

The frontend of Coll is built with Next.js, using Tailwind CSS for styling and shadcn/ui for UI components. It provides a user-friendly interface for interacting with the platform. Key features include:

- **Home Page**: Displays available projects and allows users to suggest new projects.
- **Authentication**: Users can sign in, sign out, and manage their profiles.
- **Project Interaction**: Users can view project details, join or leave projects, and suggest new projects.

For detailed information, refer to the [Frontend README](frontend/README.md).

## Backend

The backend of Coll is built using NestJS and MongoDB. It provides the necessary APIs for user authentication, project management, and user interactions. Key features include:

- **Authentication**: Uses JWT for secure user authentication.
- **Project Management**: Users can create, update, and delete projects. They can also join or leave projects.
- **User Management**: Handles user registration, profile updates, and user data retrieval.

For detailed information, refer to the [Backend README](backend/README.md).

## Contributing

At the moment, I am not accepting contributions as I am still working on implementing some features. However, I plan to open up for contributions in the near future. Stay tuned!

## Stay in touch

- Author - [Jukunye Shira](https://jukunyes.vercel.app/)
- Linkedin - [Jukunye](https://www.linkedin.com/in/jukunye)

## License

[MIT licensed](LICENSE).
