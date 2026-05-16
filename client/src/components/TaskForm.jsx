import { useState } from 'react';
import ErrorMessage from './ErrorMessage.jsx';

function TaskForm({
  initialTask = null,
  onSubmit,
  onCancel,
  submitButtonText = 'Save Task'
}) {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(
    initialTask?.description || ''
  );
  const [status, setStatus] = useState(initialTask?.status || 'todo');
  const [priority, setPriority] = useState(initialTask?.priority || 'medium');
  const [dueDate, setDueDate] = useState(
    initialTask?.due_date ? String(initialTask.due_date).split('T')[0] : ''
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (title.trim() === '') {
      setError('Task title is required');
      return;
    }

    try {
      setSubmitting(true);

      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        due_date: dueDate || null
      });
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <form className="form-card task-form" onSubmit={handleSubmit} noValidate>
      <div>
        <p className="eyebrow">
          {initialTask ? 'Edit Task' : 'New Task'}
        </p>
        <h2>{initialTask ? 'Update Task' : 'Add Task'}</h2>
      </div>

      <ErrorMessage message={error} />

      <label htmlFor="task-title">
        Task Title
        <input
          id="task-title"
          name="title"
          type="text"
          value={title}
          maxLength="100"
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Build the task form"
          required
        />
      </label>

      <label htmlFor="task-description">
        Description
        <textarea
          id="task-description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Describe what needs to be done."
          rows="5"
        />
      </label>

      <div className="form-row">
        <label htmlFor="task-status">
          Status
          <select
            id="task-status"
            name="status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </label>

        <label htmlFor="task-priority">
          Priority
          <select
            id="task-priority"
            name="priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>

      <label htmlFor="task-due-date">
        Due Date
        <input
          id="task-due-date"
          name="due_date"
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
      </label>

      <div className="form-actions">
        <button className="button" type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : submitButtonText}
        </button>

        <button
          className="button secondary"
          type="button"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TaskForm;