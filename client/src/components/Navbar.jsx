import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="site-header">
      <Link className="logo" to="/">
        ForgeBoard
      </Link>

      <nav>
        <Link to="/projects">Projects</Link>
        <Link to="/projects/new">New Project</Link>
      </nav>
    </header>
  );
}

export default Navbar;