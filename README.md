# ForgeBoard

ForgeBoard is a full-stack project and task management application built with React, Node.js, Express, PostgreSQL, and Neon.

The app helps users create projects, manage tasks, organize work by status and priority, and track progress through a simple task-board interface.

---

## Live Demo

[ForgeBoard Live Demo](https://forgeboard.onrender.com/)

---

## Purpose

ForgeBoard was built to demonstrate clean full-stack fundamentals across a practical project-management workflow:

* React frontend application structure
* Node.js and Express API design
* PostgreSQL data modeling
* Project and task CRUD workflows
* Basic security middleware
* Frontend and backend tests
* Deployment-ready configuration

This project focuses on clarity, maintainability, and end-to-end application behavior rather than visual complexity.

---

## Features

### Projects

* View all projects from the dashboard
* Create new projects
* Edit existing projects
* Delete projects
* Track project progress based on task completion

### Tasks

* View tasks for a selected project
* Create new tasks
* Edit existing tasks
* Delete tasks
* Update task status
* Filter tasks by status
* Filter tasks by priority
* Organize tasks into board columns:

  * To Do
  * In Progress
  * Done

---

## Tech Stack

### Frontend

* React
* React Router
* Vite
* CSS
* Vitest
* React Testing Library

### Backend

* Node.js
* Express.js
* PostgreSQL
* pg
* dotenv
* cors
* helmet
* morgan
* Vitest
* Supertest

### Database and Deployment

* Neon PostgreSQL
* Render-ready production configuration

---

## Project Structure

```txt
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

---

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

---

## API Routes

### Health Check

```txt
GET /api/health
```

### Projects

```txt
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id
```

### Tasks

```txt
GET    /api/projects/:projectId/tasks
POST   /api/projects/:projectId/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

---

## Security and Reliability Notes

ForgeBoard includes basic application security and validation practices:

* `helmet` for common HTTP security headers
* `cors` with environment-aware configuration
* `express.json({ limit: '10kb' })` to limit request body size
* Environment variables for database connection strings
* Parameterized SQL queries to reduce SQL injection risk
* ID validation middleware
* Input validation for project and task data
* Centralized error handling middleware
* Backend route tests with Supertest
* Frontend component tests with React Testing Library

---

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

For production deployment:

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

For same-origin production deployment, `VITE_API_URL` can be left unset.

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/NK-Forge/ForgeBoard.git
cd ForgeBoard
```

### 2. Install dependencies and build

From the repository root:

```bash
npm run build
```

This installs server dependencies, installs client dependencies, and builds the React client.

For active local development, dependencies can also be installed separately:

```bash
cd server
npm install

cd ../client
npm install
```

### 3. Set up the database

Use the Neon SQL Editor or a PostgreSQL client to run:

```txt
server/db/schema.sql
server/db/seed.sql
```

### 4. Start the backend server

```bash
cd server
npm run dev
```

The API runs at:

```txt
http://localhost:4001/api
```

Health check:

```txt
http://localhost:4001/api/health
```

### 5. Start the frontend dev server

In another terminal:

```bash
cd client
npm run dev
```

The React app runs at:

```txt
http://localhost:5173
```

---

## Testing

### Run all tests from the root

```bash
npm test
```

### Run backend tests only

```bash
cd server
npm run test:run
```

### Run frontend tests only

```bash
cd client
npm run test:run
```

---

## Build

Build the full app from the repository root:

```bash
npm run build
```

This installs dependencies and builds the React client into `client/dist`.

---

## Production Start

After building, start the production server:

```bash
cd server
NODE_ENV=production npm start
```

The Express server serves both the API and the built React app.

---

## Render Deployment Notes

ForgeBoard is prepared for a single-service Render deployment.

### Render Web Service Settings

```txt
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

Leave `VITE_API_URL` unset for same-origin production deployment unless deploying the client and API separately.

---

## Current Status

Implemented:

* React frontend
* Node.js and Express backend
* PostgreSQL database schema
* Neon database support
* CRUD workflows for projects and tasks
* Basic security middleware
* Input and ID validation
* Backend route tests
* Frontend component tests
* Render-ready deployment configuration

---

## Future Improvements

Possible future enhancements include:

* User authentication
* Drag-and-drop task movement between columns
* Search for projects and tasks
* Project archiving
* Due date reminders
* Project completion percentage display
* More detailed dashboard analytics
* Stronger validation and database constraints
* CI workflow for automated test/build verification
