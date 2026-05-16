const statusLabels = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done'
};

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High'
};

const formatDueDate = (dueDate) => {
  if (!dueDate) {
    return 'No due date';
  }

  return String(dueDate).split('T')[0];
};

function TaskCard({ task, onStatusChange, onEdit, onDelete }) {
  return (
    <article className="task-card">
      <div>
        <h3>{task.title}</h3>
        <p>{task.description || 'No description provided.'}</p>
      </div>

      <div className="task-meta">
        <span className={`badge priority-${task.priority}`}>
          {priorityLabels[task.priority] || task.priority}
        </span>

        <span className="due-date">Due: {formatDueDate(task.due_date)}</span>
      </div>

      <label className="status-control" htmlFor={`task-status-${task.id}`}>
        Status
        <select
          id={`task-status-${task.id}`}
          value={task.status}
          onChange={(event) => onStatusChange(task.id, event.target.value)}
        >
          <option value="todo">{statusLabels.todo}</option>
          <option value="in_progress">{statusLabels.in_progress}</option>
          <option value="done">{statusLabels.done}</option>
        </select>
      </label>

      <div className="card-actions">
        <button
          className="button secondary"
          type="button"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="button danger"
          type="button"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskCard;