import React, { useState, useEffect } from 'react'
import GameCard from '../components/GameCard'
import BlogFeed from '../components/BlogFeed'
import ContactForm from '../components/ContactForm'
import { baseURL, fieldsQuery } from '../mockData'
import LauncherCTA from '../components/LauncherCTA'
import DiscordCTA from '../components/DiscordCTA'

const normalizeEngineName = (engine) => {
  if (!engine) return 'Outro';
  return engine
    .replace(/[0-9]/g, '')
    .replace(/Engine/gi, '')
    .trim();
};

const getEngineStats = (games) => {
  const stats = games.reduce((acc, game) => {
    const engineName = normalizeEngineName(game.engine);
    acc[engineName] = (acc[engineName] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(stats).sort((a, b) => a[0].localeCompare(b[0]));
};

function HomePage() {
  const [totalGames, setTotalGames] = useState([]);
  const [unreleasedGames, setUnreleasedGames] = useState([]);
  const [groupedReleasedGames, setGroupedReleasedGames] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`${baseURL}/items/games?${fieldsQuery}`);
        const data = await response.json();
        
        setTotalGames(data.data);
        
        const now = new Date();
        
        const futureGames = data.data
          .filter(g => new Date(g.release_date) > now)
          .sort((a, b) => new Date(a.release_date) - new Date(b.release_date)); 

        setUnreleasedGames(futureGames);

        const pastGames = data.data
          .filter(g => new Date(g.release_date) <= now)
          .sort((a, b) => new Date(b.release_date) - new Date(a.release_date)); 

        const grouped = pastGames.reduce((acc, game) => {
          const year = new Date(game.release_date).getFullYear();
          if (!acc[year]) acc[year] = [];
          acc[year].push(game);
          return acc;
        }, {});
        
        setGroupedReleasedGames(grouped);

      } catch (error) {
        console.error("Erro ao buscar os jogos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const totalGameCount = totalGames.length;
  const totalEngineStats = getEngineStats(totalGames);
  const sortedYears = Object.keys(groupedReleasedGames).sort((a, b) => b - a); 

  return (
    <div className="page-content fade-in">
      
      <LauncherCTA />
      
      <div className="home-section">
        <div className="home-section-header">
          <h2>Meus Jogos ({totalGameCount})</h2>
          {!loading && totalEngineStats.length > 0 && (
            <div className="engine-stats-total">
              {totalEngineStats.map(([engine, count]) => (
                <span key={engine} className="engine-stat-item">
                  {engine} ({count})
                </span>
              ))}
            </div>
          )}
        </div>
        
        {loading && <p>Carregando jogos...</p>}

        {!loading && unreleasedGames.length > 0 && (
          <section className="year-group">
            <h3 className="year-title upcoming-title">Próximos Lançamentos</h3>
            <div className="game-grid">
              {unreleasedGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        )}
        
        {!loading && sortedYears.map((year) => {
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
      
      <div className="home-section">
        <BlogFeed />
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