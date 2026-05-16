function TaskFilters({
  statusFilter,
  priorityFilter,
  onStatusChange,
  onPriorityChange,
  onResetFilters
}) {
  return (
    <section className="filter-bar" aria-label="Task filters">
      <label htmlFor="status-filter">
        Status
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="all">All</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </label>

      <label htmlFor="priority-filter">
        Priority
        <select
          id="priority-filter"
          value={priorityFilter}
          onChange={(event) => onPriorityChange(event.target.value)}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <button className="button secondary" type="button" onClick={onResetFilters}>
        Reset Filters
      </button>
    </section>
  );
}

export default TaskFilters;