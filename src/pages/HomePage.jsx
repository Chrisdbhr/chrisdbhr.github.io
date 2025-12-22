import React from 'react'
// 1. Importe o useLoaderData para receber os dados
import { useLoaderData } from 'react-router-dom' 
import ProjectCard from '../components/ProjectCard'
import BlogFeed from '../components/BlogFeed'
import ContactForm from '../components/ContactForm'
import { baseURL, fieldsQuery } from '../utils'
import LauncherCTA from '../components/LauncherCTA'
import DiscordCTA from '../components/DiscordCTA'
import { normalizeEngineName } from '../utils/textUtils';

// --- FUNÇÕES HELPER ---
// (Coloquei as funções que estavam no topo do seu arquivo aqui)
const getEngineStats = (games) => {
  const stats = games.reduce((acc, game) => {
    const engineName = normalizeEngineName(game.engine);
    acc[engineName] = (acc[engineName] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(stats).sort((a, b) => a[0].localeCompare(b[0]));
};

// 2. EXPORTE O SEU LOADER (que o main.jsx importa)
export async function loader() {
  const response = await fetch(`${baseURL}/items/projects?${fieldsQuery}`);
  const data = await response.json();
  const totalProjects = data.data;

  // Toda a lógica que estava no seu useEffect/useState agora vive aqui
  const now = new Date();
  
  const unreleasedProjects = totalProjects
    .filter(g => new Date(g.release_date) > now)
    .sort((a, b) => new Date(a.release_date) - new Date(b.release_date)); 

  const pastProjects = totalProjects
    .filter(g => new Date(g.release_date) <= now)
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date)); 

  const groupedReleasedProjects = pastProjects.reduce((acc, project) => {
    const year = new Date(project.release_date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(project);
    return acc;
  }, {});
  
  const totalProjectsCount = totalProjects.length;
  const totalEngineStats = getEngineStats(totalProjects);
  const sortedYears = Object.keys(groupedReleasedProjects).sort((a, b) => b - a);
  
  // O loader retorna um objeto com tudo que a página precisa
  return { 
    totalProjects, 
    unreleasedProjects: unreleasedProjects, 
    groupedReleasedProjects: groupedReleasedProjects, 
    totalProjectsCount: totalProjectsCount, 
    totalEngineStats, 
    sortedYears 
  };
}

// --- COMPONENTE PRINCIPAL ---
function HomePage() {
  // 3. Pegue os dados do loader. Sem loading, sem useEffect!
  const {
    totalProjectsCount,
    totalEngineStats,
    unreleasedProjects,
    groupedReleasedProjects,
    sortedYears
  } = useLoaderData();

  // 4. A página agora renderiza imediatamente com os dados.
  return (
    <div className="page-content fade-in">
      
      <LauncherCTA />
      
      <div className="home-section">
        <BlogFeed />
      </div>

      <div className="home-section">
        <div className="home-section-header">
          <h2>Meus Jogos e Projetos ({totalProjectsCount})</h2>
          {totalEngineStats.length > 0 && (
            <div className="engine-stats-total">
              {totalEngineStats.map(([engine, count]) => (
                <span key={engine} className="engine-stat-item">
                  {engine} ({count})
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* O 'loading' se foi, o roteador cuida disso */}

        {unreleasedProjects.length > 0 && (
          <section className="year-group">
            <h3 className="year-title upcoming-title">Próximos Lançamentos</h3>
            <div className="game-grid">
              {unreleasedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}
        
        {sortedYears.map((year) => {
          const yearProjects = groupedReleasedProjects[year];
          const yearEngineStats = getEngineStats(yearProjects);
          return (
            <section key={year} className="year-group">
              <div className="home-section-header">
                <h3 className="year-title">{year}</h3>
                <div className="engine-stats-year">
                  {yearEngineStats.map(([engine, count]) => (
                    <span key={engine} className="engine-stat-item-year">
                      {engine} ({count})
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="game-grid">
                {yearProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="home-contact-layout">
        <div className="home-section">
          <ContactForm />
        </div>
        <div className="home-section discord-home-widget">
          <DiscordCTA />
        </div>
      </div>
    </div>
  )
}

export default HomePage