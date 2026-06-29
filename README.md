# ForgeBoard

ForgeBoard is a final PERN stack project tracker built with React, Node.js, Express, PostgreSQL, and Neon. The app lets users create projects, manage tasks, organize work by status and priority, and track progress through a simple task-board interface.

## Project Objective

Live @ [https://forgeboard.onrender.com]

This project brings together the core full-stack skills covered in the course:

- Create a front-end using React.js
- Create a server using Node.js and Express.js
- Use a PostgreSQL database to store application data
- Set up basic application security
- Create tests to verify code behavior
- Prepare the application for deployment on Render

## Features

### Projects

- View all projects from the dashboard
- Create a new project
- Edit an existing project
- Delete a project
- View project progress based on completed tasks

### Tasks

- View tasks for a single project
- Create a new task
- Edit an existing task
- Delete a task
- Update task status from a dropdown
- Filter tasks by status
- Filter tasks by priority
- Organize tasks into board columns:
  - To Do
  - In Progress
  - Done

## Tech Stack

### Front-End

- React
- React Router
- Vite
- CSS
- Vitest
- React Testing Library

### Back-End

- Node.js
- Express.js
- PostgreSQL
- pg
- dotenv
- cors
- helmet
- morgan
- Vitest
- Supertest

### Database and Deployment

- Neon PostgreSQL
- Render

## Project Structure

```text
ForgeBoard/
  client/
    src/
      components/
      pages/
      services/
      tests/
      App.jsx
      main.jsx
      index.css
    index.html
    package.json
  server/
    db/
      index.js
      schema.sql
      seed.sql
    middleware/
      errorHandler.js
      validateId.js
    routes/
      projects.js
      tasks.js
    tests/
      projects.test.js
      tasks.test.js
    index.js
    package.json
  package.json
  README.md
```

## Database Schema

### projects

```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### tasks

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'todo',
  priority VARCHAR(20) NOT NULL DEFAULT 'medium',
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Routes

### Health Check

```text
GET /api/health
```

### Projects

```text
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id
```

### Tasks

```text
GET    /api/projects/:projectId/tasks
POST   /api/projects/:projectId/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

## Security Features

ForgeBoard includes basic security measures appropriate for a course-level PERN application:

- `helmet` for common HTTP security headers
- `cors` with environment-aware configuration
- `express.json({ limit: '10kb' })` to limit request body size
- Environment variables for database connection strings
- Parameterized SQL queries to reduce SQL injection risk
- ID validation middleware
- Input validation for project and task data
- Centralized error handling middleware

## Environment Variables

### Server

Create `server/.env` using `server/.env.example` as a guide.

```env
PORT=4001
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
DIRECT_URL=postgresql://username:password@host/database?sslmode=require
CORS_ORIGIN=
NODE_ENV=development
```

For production on Render, set:

```env
DATABASE_URL=your_neon_pooled_connection_string
NODE_ENV=production
```

`DIRECT_URL` is useful for schema setup or migrations, but it is not required at runtime for this version of the app.

### Client

Create `client/.env` using `client/.env.example` as a guide.

```env
VITE_API_URL=http://localhost:4001/api
```

For Render production deployment, `VITE_API_URL` can be left unset because the client uses same-origin `/api` in production.

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/NK-Forge/ForgeBoard.git
cd ForgeBoard
```

### 2. Install dependencies

From the repo root:

```bash
npm run build
```

This installs server dependencies, installs client dependencies, and builds the React client.

For active local development, you can also install dependencies separately:

```bash
cd server
npm install

cd ../client
npm install
```

### 3. Set up the database

Use the Neon SQL Editor or a PostgreSQL client to run:

```text
server/db/schema.sql
server/db/seed.sql
```

### 4. Start the back-end server

```bash
cd server
npm run dev
```

The API runs at:

```text
http://localhost:4001/api
```

Health check:

```text
http://localhost:4001/api/health
```

### 5. Start the front-end dev server

In another terminal:

```bash
cd client
npm run dev
```

The React app runs at:

```text
http://localhost:5173
```

## Testing

### Run all tests from the root

```bash
npm test
```

### Run back-end tests only

```bash
cd server
npm run test:run
```

### Run front-end tests only

```bash
cd client
npm run test:run
```

## Build

Build the full app from the repo root:

```bash
npm run build
```

This installs dependencies and builds the React client into `client/dist`.

## Production Start

After building, start the production server:

```bash
cd server
NODE_ENV=production npm start
```

The Express server serves both the API and the built React app.

## Render Deployment Notes

ForgeBoard is prepared for a single-service Render deployment.

### Render Web Service Settings

Use these settings in Render:

```text
Build Command: npm run build
Start Command: npm start
```

### Render Environment Variables

```env
DATABASE_URL=your_neon_pooled_connection_string
NODE_ENV=production
```

Optional:

```env
CORS_ORIGIN=
```

Leave `VITE_API_URL` unset for the production build unless deploying the client and API separately.

## Future Improvements

Possible future enhancements include:

- User authentication
- Drag-and-drop task movement between columns
- Search projects and tasks
- Project archiving
- Due date reminders
- Project completion percentage display
- More detailed dashboard analytics
- More advanced validation and database constraints

## Final Project Status

ForgeBoard meets the final PERN project requirements:

- React front-end complete
- Node and Express server complete
- PostgreSQL database connected through Neon
- CRUD functionality implemented for projects and tasks
- Basic security middleware and validation included
- Back-end route tests included
- Front-end component tests included
- Prepared for Render deployment
