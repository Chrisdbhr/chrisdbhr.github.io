import React from 'react'
// 1. Importe o useLoaderData para receber os dados
import { useLoaderData } from 'react-router-dom' 
import GameCard from '../components/GameCard'
import BlogFeed from '../components/BlogFeed'
import ContactForm from '../components/ContactForm'
import { baseURL, fieldsQuery } from '../mockData'
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
  const response = await fetch(`${baseURL}/items/games?${fieldsQuery}`);
  const data = await response.json();
  const totalGames = data.data;

  // Toda a lógica que estava no seu useEffect/useState agora vive aqui
  const now = new Date();
  
  const unreleasedGames = totalGames
    .filter(g => new Date(g.release_date) > now)
    .sort((a, b) => new Date(a.release_date) - new Date(b.release_date)); 

  const pastGames = totalGames
    .filter(g => new Date(g.release_date) <= now)
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date)); 

  const groupedReleasedGames = pastGames.reduce((acc, game) => {
    const year = new Date(game.release_date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(game);
    return acc;
  }, {});
  
  const totalGameCount = totalGames.length;
  const totalEngineStats = getEngineStats(totalGames);
  const sortedYears = Object.keys(groupedReleasedGames).sort((a, b) => b - a);
  
  // O loader retorna um objeto com tudo que a página precisa
  return { 
    totalGames, 
    unreleasedGames, 
    groupedReleasedGames, 
    totalGameCount, 
    totalEngineStats, 
    sortedYears 
  };
}

// --- COMPONENTE PRINCIPAL ---
function HomePage() {
  // 3. Pegue os dados do loader. Sem loading, sem useEffect!
  const {
    totalGameCount,
    totalEngineStats,
    unreleasedGames,
    groupedReleasedGames,
    sortedYears
  } = useLoaderData();

  // 4. A página agora renderiza imediatamente com os dados.
  //    (Removi o 'loading' e 'totalGames' do topo)
  return (
    <div className="page-content fade-in">
      
      <LauncherCTA />
      
      <div className="home-section">
        <BlogFeed />
      </div>

      <div className="home-section">
        <div className="home-section-header">
          <h2>Meus Jogos e Projetos ({totalGameCount})</h2>
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

        {unreleasedGames.length > 0 && (
          <section className="year-group">
            <h3 className="year-title upcoming-title">Próximos Lançamentos</h3>
            <div className="game-grid">
              {unreleasedGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        )}
        
        {sortedYears.map((year) => {
          const yearGames = groupedReleasedGames[year];
          const yearEngineStats = getEngineStats(yearGames);
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
                {yearGames.map((game) => (
                  <GameCard key={game.id} game={game} />
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