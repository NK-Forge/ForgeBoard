import React from 'react';
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import TaskFilters from '../components/TaskFilters.jsx';

describe('TaskFilters', () => {
  it('calls filter handlers when selections change', () => {
    const handleStatusChange = vi.fn();
    const handlePriorityChange = vi.fn();
    const handleResetFilters = vi.fn();

    render(
      <TaskFilters
        statusFilter="all"
        priorityFilter="all"
        onStatusChange={handleStatusChange}
        onPriorityChange={handlePriorityChange}
        onResetFilters={handleResetFilters}
      />
    );

    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: 'done' }
    });

    fireEvent.change(screen.getByLabelText(/priority/i), {
      target: { value: 'high' }
    });

    fireEvent.click(screen.getByRole('button', { name: /reset filters/i }));

    expect(handleStatusChange).toHaveBeenCalledWith('done');
    expect(handlePriorityChange).toHaveBeenCalledWith('high');
    expect(handleResetFilters).toHaveBeenCalledTimes(1);
  });
});