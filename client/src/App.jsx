import { Link, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import CreateProject from './pages/CreateProject.jsx';
import EditProject from './pages/EditProject.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
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

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/new" element={<CreateProject />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="/projects/:projectId/edit" element={<EditProject />} />
      </Routes>
    </>
  );
}

export default App;