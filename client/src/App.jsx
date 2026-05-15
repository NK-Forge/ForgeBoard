import { Link, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import CreateProject from './pages/CreateProject.jsx';
import EditProject from './pages/EditProject.jsx';
import ProjectList from './pages/ProjectList.jsx';

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

function PlaceholderPage({ title, message }) {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Coming Next</p>
        <h1>{title}</h1>
        <p>{message}</p>
      </section>
    </main>
  );
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/new" element={<CreateProject />} />
        <Route
          path="/projects/:projectId"
          element={
            <PlaceholderPage
              title="Project Detail"
              message="The task board will be built after project creation and editing."
            />
          }
        />
        <Route path="/projects/:projectId/edit" element={<EditProject />} />
      </Routes>
    </>
  );
}

export default App;