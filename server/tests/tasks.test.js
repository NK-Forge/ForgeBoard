const request = require('supertest');
const app = require('../index');

let projectId;

beforeEach(async () => {
  const response = await request(app)
    .post('/api/projects')
    .send({
      name: 'Task Route Test Project',
      description: 'Created for task route testing'
    });

  projectId = response.body.id;
});

afterEach(async () => {
  if (projectId) {
    await request(app).delete(`/api/projects/${projectId}`);
    projectId = null;
  }
});

describe('task routes', () => {
  it('GET /api/projects/:projectId/tasks returns an array', async () => {
    const response = await request(app).get(`/api/projects/${projectId}/tasks`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /api/projects/:projectId/tasks creates a task', async () => {
    const response = await request(app)
      .post(`/api/projects/${projectId}/tasks`)
      .send({
        title: 'Create Task Test',
        description: 'Testing task creation',
        status: 'todo',
        priority: 'high',
        due_date: '2026-05-20'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.project_id).toBe(projectId);
    expect(response.body.title).toBe('Create Task Test');
    expect(response.body.status).toBe('todo');
    expect(response.body.priority).toBe('high');
  });

  it('POST /api/projects/:projectId/tasks rejects missing title', async () => {
    const response = await request(app)
      .post(`/api/projects/${projectId}/tasks`)
      .send({
        title: ''
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Task title is required');
  });

  it('POST /api/projects/:projectId/tasks rejects invalid status', async () => {
    const response = await request(app)
      .post(`/api/projects/${projectId}/tasks`)
      .send({
        title: 'Invalid Status Test',
        status: 'blocked'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Task status must be todo, in_progress, or done');
  });

  it('POST /api/projects/:projectId/tasks rejects invalid priority', async () => {
    const response = await request(app)
      .post(`/api/projects/${projectId}/tasks`)
      .send({
        title: 'Invalid Priority Test',
        priority: 'urgent'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Task priority must be low, medium, or high');
  });

  it('PUT /api/tasks/:id updates a task', async () => {
    const createResponse = await request(app)
      .post(`/api/projects/${projectId}/tasks`)
      .send({
        title: 'Task Before Update',
        description: 'Before update',
        status: 'todo',
        priority: 'medium'
      });

    const taskId = createResponse.body.id;

    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({
        title: 'Task After Update',
        status: 'done',
        priority: 'high'
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(taskId);
    expect(response.body.title).toBe('Task After Update');
    expect(response.body.status).toBe('done');
    expect(response.body.priority).toBe('high');
  });

  it('PUT /api/tasks/:id returns 404 for missing task', async () => {
    const response = await request(app)
      .put('/api/tasks/999999999')
      .send({
        status: 'done'
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Task not found');
  });

  it('DELETE /api/tasks/:id deletes a task', async () => {
    const createResponse = await request(app)
      .post(`/api/projects/${projectId}/tasks`)
      .send({
        title: 'Task To Delete',
        description: 'Testing delete task'
      });

    const taskId = createResponse.body.id;

    const response = await request(app).delete(`/api/tasks/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Task deleted successfully');

    const tasksResponse = await request(app).get(`/api/projects/${projectId}/tasks`);
    const deletedTask = tasksResponse.body.find((task) => task.id === taskId);

    expect(deletedTask).toBeUndefined();
  });

  it('returns 400 for invalid task ID', async () => {
    const response = await request(app)
      .put('/api/tasks/not-a-number')
      .send({
        status: 'done'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid id');
  });
});