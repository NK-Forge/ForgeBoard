import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import TaskBoard from '../components/TaskBoard.jsx';
import TaskFilters from '../components/TaskFilters.jsx';
import {
  deleteTask,
  getProjectById,
  getTasksByProjectId,
  updateTask
} from '../services/api.js';

function ProjectDetail() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProjectDetails = async () => {
      try {
        const [projectData, taskData] = await Promise.all([
          getProjectById(projectId),
          getTasksByProjectId(projectId)
        ]);

        setProject(projectData);
        setTasks(taskData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjectDetails();
  }, [projectId]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === 'all' || task.priority === priorityFilter;

      return matchesStatus && matchesPriority;
    });
  }, [tasks, statusFilter, priorityFilter]);

  const handleResetFilters = () => {
    setStatusFilter('all');
    setPriorityFilter('all');
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      setError('');

      const updatedTask = await updateTask(taskId, { status });

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId ? updatedTask : task
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const shouldDelete = window.confirm('Delete this task?');

    if (!shouldDelete) {
      return;
    }

    try {
      setError('');

      await deleteTask(taskId);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <main className="page">
        <LoadingMessage message="Loading project details..." />
      </main>
    );
  }

  if (error && !project) {
    return (
      <main className="page">
        <ErrorMessage message={error} />
        <Link className="button secondary" to="/projects">
          Back to Projects
        </Link>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Project Detail</p>
          <h1>{project.name}</h1>
          <p>{project.description || 'No description provided.'}</p>
        </div>

        <div className="heading-actions">
          <Link className="button secondary" to="/projects">
            Back to Projects
          </Link>

          <Link className="button" to={`/projects/${project.id}/edit`}>
            Edit Project
          </Link>
        </div>
      </section>

      <ErrorMessage message={error} />

      <TaskFilters
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onResetFilters={handleResetFilters}
      />

      {filteredTasks.length === 0 ? (
        <section className="empty-state">
          <h2>No tasks found</h2>
          <p>
            This project does not have tasks matching the current filters yet.
          </p>
        </section>
      ) : (
        <TaskBoard
          tasks={filteredTasks}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteTask}
        />
      )}
    </main>
  );
}

export default ProjectDetail;