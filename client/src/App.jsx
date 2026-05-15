import { Link, Route, Routes } from 'react-router-dom';

function HomePage() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Final PERN App</p>
        <h1>ForgeBoard</h1>
        <p>
          A project tracker for organizing projects, tasks, priorities, and progress.
        </p>
        <Link className="button" to="/projects">
          View Projects
        </Link>
      </section>
    </main>
  );
}

function ProjectsPlaceholder() {
  return (
    <main className="page">
      <h1>Projects</h1>
      <p>The project dashboard will be built here next.</p>
    </main>
  );
}

function App() {
  return (
    <>
      <header className="site-header">
        <Link className="logo" to="/">
          ForgeBoard
        </Link>
        <nav>
          <Link to="/projects">Projects</Link>
          <Link to="/projects/new">New Project</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPlaceholder />} />
        <Route path="/projects/new" element={<ProjectsPlaceholder />} />
      </Routes>
    </>
  );
}

export default App;