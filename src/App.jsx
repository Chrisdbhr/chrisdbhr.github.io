import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GameDetailPage from './pages/GameDetailPage'
import ProfileSidebar from './components/ProfileSidebar'
import BlogListPage from './pages/BlogListPage'
import BlogPostPage from './pages/BlogPostPage'

function App() {
  return (
    <div className="app-container">
      <header className="main-header">
        <Link to="/" className="site-title-link">
          <h1>ChrisJogos</h1>
          <span>Portfólio de Projetos & Meu Blog</span>
        </Link>
      </header>
      
      <div className="page-layout">
        <ProfileSidebar />
        
        <main className="main-content-area">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:gameId" element={<GameDetailPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </main>
      </div>

      <footer className="main-footer">
        <p>© 2025 Enigmatic Comma. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default App