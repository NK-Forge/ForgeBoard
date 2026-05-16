import React from 'react';
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard.jsx';

describe('ProjectCard', () => {
  const project = {
    id: 1,
    name: 'Final PERN App',
    description: 'Build ForgeBoard',
    task_count: '4',
    completed_task_count: '2'
  };

  it('renders project information and progress', () => {
    render(
      <MemoryRouter>
        <ProjectCard project={project} onDelete={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText('Final PERN App')).toBeInTheDocument();
    expect(screen.getByText('Build ForgeBoard')).toBeInTheDocument();
    expect(screen.getByText('2 of 4 tasks complete')).toBeInTheDocument();
  });

  it('renders a fallback description when none is provided', () => {
    render(
      <MemoryRouter>
        <ProjectCard
          project={{
            ...project,
            description: ''
          }}
          onDelete={() => {}}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('No description provided.')).toBeInTheDocument();
  });

  it('calls onDelete with the project id when delete is clicked', () => {
    const handleDelete = vi.fn();

    render(
      <MemoryRouter>
        <ProjectCard project={project} onDelete={handleDelete} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    expect(handleDelete).toHaveBeenCalledWith(1);
  });
});