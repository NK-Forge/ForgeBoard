INSERT INTO projects (name, description)
VALUES
  (
    'Final PERN App',
    'Build ForgeBoard, a full-stack project tracker using React, Express, Node, and PostgreSQL.'
  ),
  (
    'Portfolio Updates',
    'Update project descriptions, screenshots, and deployment links for portfolio review.'
  );

INSERT INTO tasks (project_id, title, description, status, priority, due_date)
VALUES
  (
    1,
    'Plan the MVP',
    'Define the core features needed for the first working version.',
    'done',
    'high',
    '2026-05-15'
  ),
  (
    1,
    'Create the database schema',
    'Create projects and tasks tables with a one-to-many relationship.',
    'in_progress',
    'high',
    '2026-05-16'
  ),
  (
    1,
    'Build the Express API',
    'Create REST routes for projects and tasks.',
    'todo',
    'high',
    '2026-05-17'
  ),
  (
    2,
    'Review portfolio projects',
    'Check project descriptions and deployment links.',
    'todo',
    'medium',
    '2026-05-20'
  );