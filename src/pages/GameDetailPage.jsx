import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { baseURL, fieldsQuery, getHashedColor } from '../mockData'
import ScreenshotGallery from '../components/ScreenshotGallery'
import DownloadButton from '../components/DownloadButton'
import ReactMarkdown from 'react-markdown'
import StarRating from '../components/StarRating'

function GameDetailPage() {
  const { gameId } = useParams()
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      if (!gameId) return;
      
      setLoading(true);
      try {
        // Query já foi atualizada no mockData.js
        const response = await fetch(`${baseURL}/items/games/${gameId}?${fieldsQuery}`);
        const data = await response.json();
        setGame(data.data); 
      } catch (error) {
        console.error("Erro ao buscar o jogo:", error);
        setGame(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
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

  // --- FUNÇÃO HELPER PARA TRAILER ---
  // Converte 'watch?v=ID' para 'embed/ID'
  const getEmbedUrl = (url) => {
    if (!url) return null;
    try {
      const videoUrl = new URL(url);
      if (videoUrl.hostname.includes('youtube.com')) {
        return `https://www.youtube.com/embed/${videoUrl.searchParams.get('v')}`;
      }
      // Adicionar outros (Vimeo, etc) aqui se precisar
      return url; // Retorna a URL original se não for YouTube
    } catch (e) {
      return url;
    }
  }
  
  const trailerEmbedUrl = getEmbedUrl(game.trailer_url);

  return (
    <div className="page-content game-detail-page fade-in">
      <Link to="/" className="button-back">
        &larr; Voltar
      </Link>

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

          {/* Galeria vira secundária se o trailer existir */}
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
             
             <div className="detail-rating-container">
                <strong>Nota:</strong>
                <StarRating rating={game.rating} />
             </div>

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
                   style={{ backgroundColor: getHashedColor(tag.tags_id) }}
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

export default GameDetailPage