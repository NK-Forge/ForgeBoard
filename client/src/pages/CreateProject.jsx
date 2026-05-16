import { useNavigate } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm.jsx';
import { createProject } from '../services/api.js';

function CreateProject() {
  const navigate = useNavigate();

  const handleCreateProject = async (projectData) => {
    await createProject(projectData);
    navigate('/projects');
  };

  return (
    <main className="page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">New Project</p>
          <h1>Create Project</h1>
          <p>Add a new project to ForgeBoard and start organizing its tasks.</p>
        </div>
      </section>

      <ProjectForm
        onSubmit={handleCreateProject}
        submitButtonText="Create Project"
      />
    </main>
  );
}

export default CreateProject;