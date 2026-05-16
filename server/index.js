const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const pool = require('./db');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');

const app = express();

const PORT = process.env.PORT || 4001;
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');

const corsOptions =
  process.env.NODE_ENV === 'production'
    ? { origin: process.env.CORS_ORIGIN || false }
    : {};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.get('/api/health', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT NOW() AS current_time');

    res.json({
      status: 'ok',
      database: 'connected',
      currentTime: result.rows[0].current_time
    });
  } catch (err) {
    next(err);
  }
});

app.use('/api/projects', projectRoutes);
app.use('/api', taskRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(clientDistPath));

  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }

    if (req.method !== 'GET') {
      return next();
    }

    return res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`ForgeBoard server is running on port ${PORT}`);
  });
}

module.exports = app;