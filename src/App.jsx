import { Link, Outlet } from 'react-router-dom';
import ProfileSidebar from './components/ProfileSidebar';
import UserAuthWidget from './components/UserAuthWidget';

function App() {
  return (
    <div className="app-container">
      <header className="main-header">
        <Link to="/" className="site-title-link">
          <h1>ChrisJogos</h1>
          <span>Portfólio de Projetos & Blog</span>
        </Link>
        <UserAuthWidget />
      </header>

      <div className="page-layout">
        <ProfileSidebar />

        <main className="main-content-area">
          <Outlet />
        </main>
      </div>

      <footer className="main-footer">
        <p>© 2025 Enigmatic Comma. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;