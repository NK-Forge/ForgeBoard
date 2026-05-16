import { useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage.jsx';

function ProjectForm({
  initialProject = null,
  onSubmit,
  submitButtonText = 'Save Project'
}) {
  const [name, setName] = useState(initialProject?.name || '');
  const [description, setDescription] = useState(
    initialProject?.description || ''
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (name.trim() === '') {
      setError('Project name is required');
      return;
    }

    try {
      setSubmitting(true);

      await onSubmit({
        name: name.trim(),
        description: description.trim()
      });
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <ErrorMessage message={error} />

      <label htmlFor="project-name">
        Project Name
        <input
          id="project-name"
          name="name"
          type="text"
          value={name}
          maxLength="100"
          onChange={(event) => setName(event.target.value)}
          placeholder="Final PERN App"
          required
        />
      </label>

      <label htmlFor="project-description">
        Description
        <textarea
          id="project-description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Describe the goal of this project."
          rows="6"
        />
      </label>

      <div className="form-actions">
        <button className="button" type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : submitButtonText}
        </button>

        <Link className="button secondary" to="/projects">
          Cancel
        </Link>
      </div>
    </form>
  );
}

export default ProjectForm;