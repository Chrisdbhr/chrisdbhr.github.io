import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { baseURL, fieldsQuery, getHashedColor } from '../mockData'
import ScreenshotGallery from '../components/ScreenshotGallery'
import DownloadButton from '../components/DownloadButton'
import ReactMarkdown from 'react-markdown'

const DIRECTUS_URL = "https://cms.chrisjogos.com";

function GameDetailPage() {
  const { gameId } = useParams()
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!gameId) return;
    
    // --- 1. Busca os dados do Jogo ---
    const fetchGame = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseURL}/items/games/${gameId}?${fieldsQuery}`);
        const data = await response.json();
        setGame(data.data); 
      } catch (error) {
        console.error("Erro ao buscar o jogo:", error);
        setGame(null);
      }
    };

    const loadAllData = async () => {
      setLoading(true);
      await fetchGame();
      setLoading(false);
    }
    
    loadAllData();

  }, [gameId]);

  if (loading) {
    return <div className="page-content"><h2>Carregando...</h2></div>;
  }

  if (!game) {
    return (
      <div className="page-content fade-in">
        <h2>Jogo não encontrado</h2>
        <Link to="/" className="button-primary">
          &larr; Voltar para a Home
        </Link>
      </div>
    )
  }

  const translation = game.translations.find(t => t.language === 'pt-BR') || game.translations[0];

  const getEmbedUrl = (url) => {
    if (!url) return null;
    try {
      const videoUrl = new URL(url);
      if (videoUrl.hostname.includes('youtube.com')) {
        return `https://www.youtube.com/embed/${videoUrl.searchParams.get('v')}`;
      }
      return url; 
    } catch (e) {
      return url;
    }
  }
  
  const trailerEmbedUrl = getEmbedUrl(game.trailer_url);

  return (
    <div className="page-content game-detail-page fade-in">
      <button onClick={() => navigate('/')} className="button-back">
        &larr; Voltar
      </button>
      <h2 className="game-title">{translation.title}</h2>
      
      <div className="game-detail-layout">
        <div className="game-detail-main">
          
          {trailerEmbedUrl ? (
            <div className="trailer-container">
              <iframe 
                src={trailerEmbedUrl}
                title="Trailer" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>
          ) : (
            <ScreenshotGallery screenshots={game.screenshots} />
          )}

          {trailerEmbedUrl && game.screenshots.length > 0 && (
            <ScreenshotGallery screenshots={game.screenshots} />
          )}

          <h3>Sinopse</h3>
          <div className="game-synopsis">
            <ReactMarkdown>
              {translation.synopsis}
            </ReactMarkdown>
          </div>
        </div>
        
        <aside className="game-detail-sidebar">
          
          {game.steam_id ? (
            <div className="steam-widget-container">
              <iframe 
                src={`https://store.steampowered.com/widget/${game.steam_id}/`} 
                frameBorder="0" 
                width="100%" 
                height="190"
                title="Steam Widget"
              ></iframe>
            </div>
          ) : game.executable_path ? (
            <DownloadButton game={game} />
          ) : (
            <button className="button-primary button-disabled" disabled>
              Em breve
            </button>
          )}

          {game.web_version_url && (
            <a 
              href={game.web_version_url}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary button-web"
            >
              Jogar Agora (Web)
            </a>
          )}

          <div className="sidebar-info-box">
             <h4>Detalhes</h4>
             <p><strong>Motor:</strong> {game.engine}</p>
             <p><strong>Lançamento:</strong> {new Date(game.release_date).toLocaleDateString('pt-BR')}</p>
             <p><strong>Tempo de Jogo:</strong> {translation.playtime}</p>

             {translation.rating_quote && (
                <blockquote className="rating-quote">
                  "{translation.rating_quote}"
                </blockquote>
             )}
          </div>

           <div className="sidebar-info-box">
             <h4>Tags</h4>
             <div className="game-detail-tags">
               {game.tags.map((tag) => (
                 <span 
                   key={tag.tags_id} 
                   className="game-tag"
                   style={{ 
                     background: getHashedColor(tag.tags_id),
                   }}
                 >
                   {tag.tags_id}
                 </span>
               ))}
             </div>
           </div>
        </aside>

      </div>
      

    </div>
  )
}

export default GameDetailPage;