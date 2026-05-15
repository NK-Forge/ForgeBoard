const express = require('express');
const pool = require('../db');
const validateId = require('../middleware/validateId');

const router = express.Router();

const validateProjectInput = (req, res, next) => {
  const { name, description } = req.body;

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      error: 'Project name is required'
    });
  }

  if (name.trim().length > 100) {
    return res.status(400).json({
      error: 'Project name must be 100 characters or fewer'
    });
  }

  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({
      error: 'Project description must be text'
    });
  }

  next();
};

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT
        projects.id,
        projects.name,
        projects.description,
        projects.created_at,
        projects.updated_at,
        COUNT(tasks.id) AS task_count,
        COUNT(tasks.id) FILTER (WHERE tasks.status = 'done') AS completed_task_count
      FROM projects
      LEFT JOIN tasks ON projects.id = tasks.project_id
      GROUP BY projects.id
      ORDER BY projects.created_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

router.post('/', validateProjectInput, async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const result = await pool.query(
      `
        INSERT INTO projects (name, description)
        VALUES ($1, $2)
        RETURNING *
      `,
      [name.trim(), description ? description.trim() : null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validateId('id'), async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
        SELECT
          projects.id,
          projects.name,
          projects.description,
          projects.created_at,
          projects.updated_at,
          COUNT(tasks.id) AS task_count,
          COUNT(tasks.id) FILTER (WHERE tasks.status = 'done') AS completed_task_count
        FROM projects
        LEFT JOIN tasks ON projects.id = tasks.project_id
        WHERE projects.id = $1
        GROUP BY projects.id
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Project not found'
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', validateId('id'), validateProjectInput, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const result = await pool.query(
      `
        UPDATE projects
        SET
          name = $1,
          description = $2,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING *
      `,
      [name.trim(), description ? description.trim() : null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Project not found'
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', validateId('id'), async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
        DELETE FROM projects
        WHERE id = $1
        RETURNING *
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Project not found'
      });
    }

    res.json({
      message: 'Project deleted successfully',
      project: result.rows[0]
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;