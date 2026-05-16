import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import TaskBoard from '../components/TaskBoard.jsx';

describe('TaskBoard', () => {
  const tasks = [
    {
      id: 1,
      title: 'Plan MVP',
      description: 'Define core scope',
      status: 'todo',
      priority: 'high',
      due_date: '2026-05-20'
    },
    {
      id: 2,
      title: 'Build API',
      description: 'Create Express routes',
      status: 'in_progress',
      priority: 'medium',
      due_date: '2026-05-21'
    },
    {
      id: 3,
      title: 'Write Tests',
      description: 'Add frontend tests',
      status: 'done',
      priority: 'low',
      due_date: null
    }
  ];

  it('groups tasks into status columns', () => {
    render(
      <TaskBoard
        tasks={tasks}
        onStatusChange={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByRole('heading', { name: 'To Do' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'In Progress' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Done' })).toBeInTheDocument();

    expect(screen.getByText('Plan MVP')).toBeInTheDocument();
    expect(screen.getByText('Build API')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  it('shows an empty column message when a column has no tasks', () => {
    render(
      <TaskBoard
        tasks={[]}
        onStatusChange={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getAllByText('No tasks in this column.')).toHaveLength(3);
  });
});