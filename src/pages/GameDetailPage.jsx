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

  // --- HOOK 2: Disqus Comments (Revised) ---
  useEffect(() => {
    // Check if data is ready
    if (!game || loading) return; // Wait until game is loaded

    // --- Define config function ---
    const configureDisqus = () => {
      const translation = game.translations.find(t => t.language === 'pt-BR') || game.translations[0];
      // Define config for Disqus within this scope
      window.disqus_config = function () {
        this.page.url = window.location.href;
        this.page.identifier = `game_${gameId}`;
        this.page.title = translation.title || game.id;
      };
    };

    // --- Function to load/reset Disqus ---
    const loadDisqus = () => {
      // Ensure the target div exists
      if (!document.getElementById('disqus_thread')) {
          console.warn("Disqus container 'disqus_thread' not found.");
          return;
      }

      // Configure before resetting or loading
      configureDisqus();

      if (window.DISQUS) {
        // If Disqus is already loaded, reset it
        // Use a timeout to ensure reset happens after potential DOM updates
        setTimeout(() => {
            window.DISQUS.reset({
              reload: true,
              // config function is now global via window.disqus_config
            });
            console.log("Disqus reset executed.");
        }, 0); // 0ms timeout pushes to end of event loop
      } else {
        // If Disqus script isn't loaded yet, load it
        const script = document.createElement('script');
        script.src = `https://chrisdbhr.disqus.com/embed.js`; // Use your actual shortname
        script.setAttribute('data-timestamp', +new Date());
        script.id = 'disqus-embed-script';
        script.async = true; // Load asynchronously

        // Use setTimeout to ensure body exists before appending
        setTimeout(() => {
          if (document.body) {
            document.body.appendChild(script);
            console.log("Disqus script appended.");
          } else {
            console.error("Disqus script could not be appended: document.body not found even after timeout.");
          }
        }, 0); // 0ms timeout
      }
    };

    // --- Execute loading ---
    loadDisqus();

    // --- Cleanup function ---
    return () => {
      // Attempt to remove the script when dependencies change or component unmounts
      // This helps prevent duplicate script loading issues
      const scriptToRemove = document.getElementById('disqus-embed-script');
      if (scriptToRemove && scriptToRemove.parentNode) {
         // Check parentNode exists before trying removeChild
         try {
            scriptToRemove.parentNode.removeChild(scriptToRemove);
            console.log("Disqus script removed on cleanup.");
         } catch (e) {
             console.warn("Could not remove Disqus script during cleanup:", e);
         }
      }
      // Reset the global config variable if needed
      // window.disqus_config = undefined;
      // Note: DISQUS.reset handles most SPA cleanup, but removing the script adds robustness
    };

  }, [game, gameId, loading]);

  // --- Conditional Returns (NOW AFTER ALL HOOKS) ---
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
      return url; 
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

export default GameDetailPage;