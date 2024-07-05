<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Coll Backend API

Coll is a collaboration platform where users can suggest projects they want to work on, and other users can join them. The backend API is built using NestJS and MongoDB and is responsible for handling the data and business logic of the platform.

**Prerequisites:**

- Node.js and npm installed
- MongoDB installed
- Environment variables configured (e.g., JWT secret, MongoDB URL)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

---

## Configure environment variables

Create a `.env` file in the root of the backend folder and add the following variables:

```plaintext
MONGODB_URL=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

## Authentication

Authentication is required for most endpoints. The backend uses JWT for authentication. Clients will start by authenticating with a username and password. Once authenticated, the server will issue a JWT that can be sent as a bearer token in the authorization header on subsequent requests.

**Public Endpoints (No Authentication Required):**

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/profile/:id`
- `GET /project`
- `GET /project/:id`

## Endpoints

### Auth Endpoints

#### Register a New User

- **URL:** `POST /auth/register`
- **Body Parameters:**
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string"
  }
  ```

#### Login

- **URL:** `POST /auth/login`
- **Body Parameters:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "access_token": "string",
    "user": {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string"
    }
  }
  ```

#### Get User Profile

- **URL:** `GET /auth/profile`
- **Headers:**
  - `Authorization: Bearer <JWT>`
- **Response:**
  ```json
  {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string"
  }
  ```

#### Update User Profile

- **URL:** `PATCH /auth/profile`
- **Headers:**
  - `Authorization: Bearer <JWT>`
- **Body Parameters:**
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string"
  }
  ```

#### Delete User Profile

- **URL:** `DELETE /auth/profile`
- **Headers:**
  - `Authorization: Bearer <JWT>`
- **Response:**
  ```json
  {
    "message": "User deleted successfully"
  }
  ```

### Project Endpoints

#### Create a New Project

- **URL:** `POST /project`
- **Body Parameters:**
  ```json
  {
    "title": "string",
    "description": "string",
    "owner": "string",
    "members": ["string"],
    "level": "string",
    "language": "string",
    "image": "string",
    "start": "string"
  }
  ```
- **Response:**
<details>
<summary>resopnse</summary>
<pre><code>
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "owner": {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string"
    },
    "members": [
      {
        "id": "string",
        "firstName": "string",
        "lastName": "string",
        "email": "string"
      }
    ],
    "level": "string",
    "language": "string",
    "image": "string",
    "start": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
  </code></pre>
</details>

#### Get All Projects

- **URL:** `GET /project`
- **Response:**
<details>
<summary>response</summary>
<pre><code>
  [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "owner": {
        "id": "string",
        "firstName": "string",
        "lastName": "string",
        "email": "string"
      },
      "members": [
        {
          "id": "string",
          "firstName": "string",
          "lastName": "string",
          "email": "string"
        }
      ],
      "level": "string",
      "language": "string",
      "image": "string",
      "start": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
  </code></pre>
</details>

#### Get a Project by ID

- **URL:** `GET /project/:id`
- **Response:**
<details>
<summary>response</summary>
<pre><code>
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "owner": {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string"
    },
    "members": [
      {
        "id": "string",
        "firstName": "string",
        "lastName": "string",
        "email": "string"
      }
    ],
    "level": "string",
    "language": "string",
    "image": "string",
    "start": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
  </code></pre>
</details>

#### Update a Project

- **URL:** `PUT /project/:id`
- **Body Parameters:**
  ```json
  {
    "title": "string",
    "description": "string",
    "owner": "string",
    "members": ["string"],
    "level": "string",
    "language": "string",
    "image": "string",
    "start": "string"
  }
  ```
- **Response:**
<details>
<summary>response</summary>
<pre><code>
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "owner": {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string"
    },
    "members": [
      {
        "id": "string",
        "firstName": "string",
        "lastName": "string",
        "email": "string"
      }
    ],
    "level": "string",
    "language": "string",
    "image": "string",
    "start": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
  </code></pre>
</details>

#### Delete a Project

- **URL:** `DELETE /project/:id`
- **Response:**
  ```json
  {
    "message": "Project deleted successfully"
  }
  ```

#### Add a Member to a Project

- **URL:** `PATCH /project/:projectId/add-member/:userId`
- **Response:**
<details>
<summary>response</summary>
<pre><code>
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "owner": {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string"
    },
    "members": [
      {
        "id": "string",
        "firstName": "string",
        "lastName": "string",
        "email": "string"
      }
    ],
    "level": "string",
    "language": "string",
    "image": "string",
    "start": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
  </code></pre>
</details>

#### Remove a Member from a Project

- **URL:** `PATCH /project/:projectId/remove-member/:userId`
- **Response:**
<details>
<summary>response</summary>
<pre><code>
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "owner": {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string"
    },
    "members": [
      {
        "id": "string",
        "firstName": "string",
        "lastName": "string",
        "email": "string"
      }
    ],
    "level": "string",
    "language": "string",
    "image": "string",
    "start": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
  </code></pre>
</details>

## Data Models

### User

```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Project

<details>
  <summary>Project</summary>
  <pre><code>
{
  "id": "string",
  "title": "string",
  "description": "string",
  "owner": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string"
  },
  "members": [
    {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string"
    }
  ],
  "level": "string",
  "language": "string",
  "image": "string",
  "start": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
  </code></pre>
</details>

## Stay in touch

- Author - [Jukunye Shira](https://jukunyes.vercel.app/)
- Linkedin - [Jukunye](www.linkedin.com/in/jukunye)
