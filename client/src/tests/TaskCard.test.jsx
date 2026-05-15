import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import TaskCard from '../components/TaskCard.jsx';

describe('TaskCard', () => {
  const task = {
    id: 1,
    title: 'Build task forms',
    description: 'Create and edit task records',
    status: 'todo',
    priority: 'high',
    due_date: '2026-05-20'
  };

  it('renders task details', () => {
    render(
      <TaskCard
        task={task}
        onStatusChange={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText('Build task forms')).toBeInTheDocument();
    expect(screen.getByText('Create and edit task records')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Due: 2026-05-20')).toBeInTheDocument();
  });

  it('calls onStatusChange when the status select changes', () => {
    const handleStatusChange = vi.fn();

    render(
      <TaskCard
        task={task}
        onStatusChange={handleStatusChange}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: 'done' }
    });

    expect(handleStatusChange).toHaveBeenCalledWith(1, 'done');
  });

  it('calls edit and delete handlers', () => {
    const handleEdit = vi.fn();
    const handleDelete = vi.fn();

    render(
      <TaskCard
        task={task}
        onStatusChange={() => {}}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    expect(handleEdit).toHaveBeenCalledWith(task);
    expect(handleDelete).toHaveBeenCalledWith(1);
  });
});