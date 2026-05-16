import React from 'react';
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TaskForm from '../components/TaskForm.jsx';

describe('TaskForm', () => {
  it('submits new task data', async () => {
    const handleSubmit = vi.fn().mockResolvedValue();
    const handleCancel = vi.fn();

    render(
      <TaskForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitButtonText="Create Task"
      />
    );

    fireEvent.change(screen.getByLabelText(/task title/i), {
      target: { value: 'Build frontend tests' }
    });

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Add tests for task components' }
    });

    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: 'in_progress' }
    });

    fireEvent.change(screen.getByLabelText(/priority/i), {
      target: { value: 'high' }
    });

    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: '2026-05-22' }
    });

    fireEvent.click(screen.getByRole('button', { name: /create task/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        title: 'Build frontend tests',
        description: 'Add tests for task components',
        status: 'in_progress',
        priority: 'high',
        due_date: '2026-05-22'
      });
    });
  });

  it('shows an error when title is missing', async () => {
    const handleSubmit = vi.fn().mockResolvedValue();

    render(
      <TaskForm
        onSubmit={handleSubmit}
        onCancel={() => {}}
        submitButtonText="Create Task"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /create task/i }));

    expect(await screen.findByText('Task title is required')).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('calls onCancel when cancel is clicked', () => {
    const handleCancel = vi.fn();

    render(
      <TaskForm
        onSubmit={() => {}}
        onCancel={handleCancel}
        submitButtonText="Create Task"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});