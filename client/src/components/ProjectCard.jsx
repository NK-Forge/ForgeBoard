import { Link } from 'react-router-dom';

function ProjectCard({ project, onDelete }) {
  const taskCount = Number(project.task_count || 0);
  const completedTaskCount = Number(project.completed_task_count || 0);
  const progressText =
    taskCount === 0
      ? 'No tasks yet'
      : `${completedTaskCount} of ${taskCount} tasks complete`;

  return (
    <article className="project-card">
      <div>
        <h2>{project.name}</h2>
        <p>{project.description || 'No description provided.'}</p>
      </div>

      <p className="project-progress">{progressText}</p>

      <div className="card-actions">
        <Link className="button" to={`/projects/${project.id}`}>
          View Project
        </Link>

        <Link className="button secondary" to={`/projects/${project.id}/edit`}>
          Edit
        </Link>

        <button
          className="button danger"
          type="button"
          onClick={() => onDelete(project.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default ProjectCard;