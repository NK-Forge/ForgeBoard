import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import ProjectForm from '../components/ProjectForm.jsx';
import { getProjectById, updateProject } from '../services/api.js';

function EditProject() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await getProjectById(projectId);
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId]);

  const handleUpdateProject = async (projectData) => {
    await updateProject(projectId, projectData);
    navigate('/projects');
  };

  if (loading) {
    return (
      <main className="page">
        <LoadingMessage message="Loading project..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <ErrorMessage message={error} />
      </main>
    );
  }

  return (
    <main className="page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Edit Project</p>
          <h1>Edit {project.name}</h1>
          <p>Update the project name or description.</p>
        </div>
      </section>

      <ProjectForm
        initialProject={project}
        onSubmit={handleUpdateProject}
        submitButtonText="Update Project"
      />
    </main>
  );
}

export default EditProject;