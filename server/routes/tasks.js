const express = require('express');
const pool = require('../db');
const validateId = require('../middleware/validateId');

const router = express.Router();

const validStatuses = ['todo', 'in_progress', 'done'];
const validPriorities = ['low', 'medium', 'high'];

const validateTaskInput = (req, res, next) => {
  const { title, description, status, priority, due_date } = req.body;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({
      error: 'Task title is required'
    });
  }

  if (title.trim().length > 100) {
    return res.status(400).json({
      error: 'Task title must be 100 characters or fewer'
    });
  }

  if (description !== undefined && description !== null && typeof description !== 'string') {
    return res.status(400).json({
      error: 'Task description must be text'
    });
  }

  if (status !== undefined && !validStatuses.includes(status)) {
    return res.status(400).json({
      error: 'Task status must be todo, in_progress, or done'
    });
  }

  if (priority !== undefined && !validPriorities.includes(priority)) {
    return res.status(400).json({
      error: 'Task priority must be low, medium, or high'
    });
  }

  if (
    due_date !== undefined &&
    due_date !== null &&
    due_date !== '' &&
    !/^\d{4}-\d{2}-\d{2}$/.test(due_date)
  ) {
    return res.status(400).json({
      error: 'Task due date must use YYYY-MM-DD format'
    });
  }

  next();
};

const validatePartialTaskInput = (req, res, next) => {
  const { title, description, status, priority, due_date } = req.body;

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        error: 'Task title cannot be blank'
      });
    }

    if (title.trim().length > 100) {
      return res.status(400).json({
        error: 'Task title must be 100 characters or fewer'
      });
    }
  }

  if (description !== undefined && description !== null && typeof description !== 'string') {
    return res.status(400).json({
      error: 'Task description must be text'
    });
  }

  if (status !== undefined && !validStatuses.includes(status)) {
    return res.status(400).json({
      error: 'Task status must be todo, in_progress, or done'
    });
  }

  if (priority !== undefined && !validPriorities.includes(priority)) {
    return res.status(400).json({
      error: 'Task priority must be low, medium, or high'
    });
  }

  if (
    due_date !== undefined &&
    due_date !== null &&
    due_date !== '' &&
    !/^\d{4}-\d{2}-\d{2}$/.test(due_date)
  ) {
    return res.status(400).json({
      error: 'Task due date must use YYYY-MM-DD format'
    });
  }

  next();
};

router.get('/projects/:projectId/tasks', validateId('projectId'), async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const projectResult = await pool.query(
      'SELECT id FROM projects WHERE id = $1',
      [projectId]
    );

    if (projectResult.rows.length === 0) {
      return res.status(404).json({
        error: 'Project not found'
      });
    }

    const result = await pool.query(
      `
        SELECT *
        FROM tasks
        WHERE project_id = $1
        ORDER BY created_at DESC
      `,
      [projectId]
    );

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/projects/:projectId/tasks',
  validateId('projectId'),
  validateTaskInput,
  async (req, res, next) => {
    try {
      const { projectId } = req.params;
      const { title, description, status, priority, due_date } = req.body;

      const projectResult = await pool.query(
        'SELECT id FROM projects WHERE id = $1',
        [projectId]
      );

      if (projectResult.rows.length === 0) {
        return res.status(404).json({
          error: 'Project not found'
        });
      }

      const result = await pool.query(
        `
          INSERT INTO tasks (
            project_id,
            title,
            description,
            status,
            priority,
            due_date
          )
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *
        `,
        [
          projectId,
          title.trim(),
          description ? description.trim() : null,
          status || 'todo',
          priority || 'medium',
          due_date || null
        ]
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      next(err);
    }
  }
);

router.put('/tasks/:id', validateId('id'), validatePartialTaskInput, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, due_date } = req.body;

    const existingTask = await pool.query(
      'SELECT * FROM tasks WHERE id = $1',
      [id]
    );

    if (existingTask.rows.length === 0) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    const currentTask = existingTask.rows[0];

    const result = await pool.query(
      `
        UPDATE tasks
        SET
          title = $1,
          description = $2,
          status = $3,
          priority = $4,
          due_date = $5,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $6
        RETURNING *
      `,
      [
        title !== undefined ? title.trim() : currentTask.title,
        description !== undefined
          ? description
            ? description.trim()
            : null
          : currentTask.description,
        status !== undefined ? status : currentTask.status,
        priority !== undefined ? priority : currentTask.priority,
        due_date !== undefined ? due_date || null : currentTask.due_date,
        id
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

router.delete('/tasks/:id', validateId('id'), async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
        DELETE FROM tasks
        WHERE id = $1
        RETURNING *
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    res.json({
      message: 'Task deleted successfully',
      task: result.rows[0]
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;