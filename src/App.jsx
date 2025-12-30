import { Link, Outlet } from 'react-router-dom';
import ProfileSidebar from './components/ProfileSidebar';

function App() {
  return (
    <div className="app-container">
      <header className="main-header">
        <Link to="/" className="site-title-link">
          <h1>ChrisJogos</h1>
          <span>Projects Portfolio & Blog</span>
        </Link>
      </header>

      <div className="page-layout">
        <ProfileSidebar />

        <main className="main-content-area">
          <Outlet />
        </main>
      </div>

      <footer className="main-footer">
        <p>© 2025 Enigmatic Comma. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;