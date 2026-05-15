import TaskColumn from './TaskColumn.jsx';

function TaskBoard({ tasks, onStatusChange, onDelete }) {
  const todoTasks = tasks.filter((task) => task.status === 'todo');
  const inProgressTasks = tasks.filter((task) => task.status === 'in_progress');
  const doneTasks = tasks.filter((task) => task.status === 'done');

  return (
    <section className="task-board" aria-label="Project task board">
      <TaskColumn
        title="To Do"
        tasks={todoTasks}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
      />

      <TaskColumn
        title="In Progress"
        tasks={inProgressTasks}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
      />

      <TaskColumn
        title="Done"
        tasks={doneTasks}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
      />
    </section>
  );
}

export default TaskBoard;