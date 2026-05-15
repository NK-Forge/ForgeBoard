import TaskCard from './TaskCard.jsx';

function TaskColumn({ title, tasks, onStatusChange, onDelete }) {
  return (
    <section className="task-column">
      <div className="task-column-header">
        <h2>{title}</h2>
        <span>{tasks.length}</span>
      </div>

      {tasks.length === 0 ? (
        <p className="empty-column">No tasks in this column.</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TaskColumn;