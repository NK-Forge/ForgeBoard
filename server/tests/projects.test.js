const request = require('supertest');
const app = require('../index');

describe('project routes', () => {
  it('GET /api/projects returns an array', async () => {
    const response = await request(app).get('/api/projects');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /api/projects creates a project', async () => {
    const response = await request(app)
      .post('/api/projects')
      .send({
        name: 'Test Project',
        description: 'Created during automated testing'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test Project');

    await request(app).delete(`/api/projects/${response.body.id}`);
  });

  it('POST /api/projects rejects missing project name', async () => {
    const response = await request(app)
      .post('/api/projects')
      .send({
        name: ''
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Project name is required');
  });

  it('GET /api/projects/:id returns one project', async () => {
    const createResponse = await request(app)
      .post('/api/projects')
      .send({
        name: 'Single Project Test',
        description: 'Testing GET by ID'
      });

    const projectId = createResponse.body.id;

    const response = await request(app).get(`/api/projects/${projectId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(projectId);
    expect(response.body.name).toBe('Single Project Test');

    await request(app).delete(`/api/projects/${projectId}`);
  });

  it('GET /api/projects/:id returns 404 for missing project', async () => {
    const response = await request(app).get('/api/projects/999999999');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Project not found');
  });

  it('PUT /api/projects/:id updates a project', async () => {
    const createResponse = await request(app)
      .post('/api/projects')
      .send({
        name: 'Project Before Update',
        description: 'Before update'
      });

    const projectId = createResponse.body.id;

    const response = await request(app)
      .put(`/api/projects/${projectId}`)
      .send({
        name: 'Project After Update',
        description: 'After update'
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(projectId);
    expect(response.body.name).toBe('Project After Update');

    await request(app).delete(`/api/projects/${projectId}`);
  });

  it('DELETE /api/projects/:id deletes a project', async () => {
    const createResponse = await request(app)
      .post('/api/projects')
      .send({
        name: 'Project To Delete',
        description: 'Testing delete route'
      });

    const projectId = createResponse.body.id;

    const response = await request(app).delete(`/api/projects/${projectId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Project deleted successfully');

    const getResponse = await request(app).get(`/api/projects/${projectId}`);

    expect(getResponse.status).toBe(404);
  });

  it('returns 400 for invalid project ID', async () => {
    const response = await request(app).get('/api/projects/not-a-number');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid id');
  });
});