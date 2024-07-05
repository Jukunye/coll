# Coll Frontend

## General Information

The frontend of the Coll project is built using [Next.js](https://nextjs.org/), a React framework. For styling, it utilizes [Tailwind CSS](https://tailwindcss.com/), and for UI components, it uses [Shadcn UI](https://shadcn.dev/). The project is written in TypeScript.

The frontend serves as the user platform where users can discover and join projects of interest. Users need to create an account to join a project. If users don't find a project they are interested in, they can suggest a new project and collaborate with others.

## Prerequisites

To run the frontend locally, ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn
- The Coll backend server for API interactions

## Setup and Installation

To set up and install the frontend project, follow the default Next.js installation steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/coll.git
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

## Application Structure

The project follows the Next.js app router structure with TypeScript. Here is an overview of the folder structure:

```
frontend/
│
├── app/
│   ├── page.tsx
│   ├── auth/
│   │   ├── signin/page.tsx
│   │   ├── signout/page.tsx
│   ├── profile/[userId]/page.tsx
│   ├── project/[projectId]/page.tsx
│   ├── provider.tsx
│   ├── protectRoute.tsx
│
├── components/
│   ├── <used-components>.tsx
│
├── styles/
│   ├── globals.css
│   ├── tailwind.css
│
├── public/
│   ├── images/
│   ├── <static-assets>
│
├── tsconfig.json
├── package.json
└── README.md
```

### Key Files

- `app/provider.tsx`: Custom provider similar to NextAuth's session provider to manage user state details, including access tokens and logout functionality.
- `app/protectRoute.tsx`: A higher-order component to protect routes, ensuring the user is authenticated before granting access, otherwise redirecting to the sign-in page.

## Key Features

### Home Page

- Displays available projects in cards.
- Provides a "Suggest Project" button for users to add new projects, including title, description, level (beginner, intermediate, advanced), language (various programming languages), and image link.
- Each project card has a "Join" button to join the project. If the user is already a member, the button changes to "Unjoin" for leaving the project.

### Profile Page

- Users can add and update their information, including name, image, profession, and bio.

### Responsiveness

- The website is designed to be responsive, following a mobile-first principle.

## API Integration

The frontend heavily relies on the backend for the following functionalities:

- Fetching projects
- Fetching user data
- Joining and unjoining projects
- User authentication

## Additional Information

- Ensure the backend server is running for API interactions.
- Tailwind CSS is used for styling, providing a utility-first approach to design.
- Shadcn UI is utilized for UI components to maintain a consistent look and feel.
