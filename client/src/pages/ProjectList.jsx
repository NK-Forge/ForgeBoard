import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { deleteProject, getProjects } from '../services/api.js';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleDeleteProject = async (projectId) => {
    const shouldDelete = window.confirm(
      'Delete this project and all of its tasks?'
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteProject(projectId);
      setProjects((currentProjects) =>
        currentProjects.filter((project) => project.id !== projectId)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <main className="page">
        <LoadingMessage message="Loading projects..." />
      </main>
    );
  }

  return (
    <main className="page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Project Dashboard</p>
          <h1>My Projects</h1>
          <p>Track active work, task progress, priorities, and completion.</p>
        </div>

        <Link className="button" to="/projects/new">
          New Project
        </Link>
      </section>

      <ErrorMessage message={error} />

      {projects.length === 0 ? (
        <section className="empty-state">
          <h2>No projects yet</h2>
          <p>Create your first project to start organizing tasks.</p>
          <Link className="button" to="/projects/new">
            Create Project
          </Link>
        </section>
      ) : (
        <section className="project-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={handleDeleteProject}
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default ProjectList;