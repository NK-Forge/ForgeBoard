const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? '/api' : 'http://localhost:4001/api');

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
};

export const getProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  return handleResponse(response);
};

export const getProjectById = async (projectId) => {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}`);
  return handleResponse(response);
};

export const createProject = async (projectData) => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(projectData)
  });

  return handleResponse(response);
};

export const updateProject = async (projectId, projectData) => {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(projectData)
  });

  return handleResponse(response);
};

export const deleteProject = async (projectId) => {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
    method: 'DELETE'
  });

  return handleResponse(response);
};

export const getTasksByProjectId = async (projectId) => {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks`);
  return handleResponse(response);
};

export const createTask = async (projectId, taskData) => {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  });

  return handleResponse(response);
};

export const updateTask = async (taskId, taskData) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  });

  return handleResponse(response);
};

export const deleteTask = async (taskId) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE'
  });

  return handleResponse(response);
};