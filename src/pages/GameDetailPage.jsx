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
            // 1. Se tem Steam ID, mostra o widget
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
            // 2. Senão, se tem executável, mostra o botão de download
            <DownloadButton game={game} />
          ) : (
            // 3. Senão, checamos as outras opções:
            //    Se NÃO tem web, NEM Google, NEM Apple, E NEM GITHUB...
            (!game.web_version_url && !game.google_play_url && !game.app_store_url && !game.github_url) ? (
              // ...então o jogo está realmente "Em breve"
              <button className="button-primary button-disabled" disabled>
                Em breve
              </button>
            ) : (
              // ...se TIVER qualquer um desses outros links, não mostramos nada aqui,
              // pois os links já vão aparecer nos blocos abaixo.
              null
            )
          )}

          {/* 4. LINKS ADICIONADOS DE VOLTA (com base no turno anterior) */}
          <div className="game-links">
            {/* Link de Jogar Online */}
            {game.web_version_url && (
              <a
                href={game.web_version_url}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary button-play-web"
              >
                <i className="fas fa-play"></i> Jogue Agora (Online)
              </a>
            )}

            {/* Link do Código Fonte (GitHub) */}
            {game.github_url && (
              <a
                href={game.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary button-github"
              >
                <i className="fab fa-github"></i> Código Fonte
              </a>
            )}
          </div>

          {/* Links das Lojas de Aplicativo */}
          {(game.google_play_url || game.app_store_url) && (
            <div className="sidebar-info-box">
              <div className="game-store-links">
                {game.google_play_url && (
                  <a
                    href={game.google_play_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-secondary button-googleplay"
                  >
                    <i className="fab fa-google-play"></i> Google Play
                  </a>
                )}
                {game.app_store_url && (
                  <a
                    href={game.app_store_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-secondary button-appstore"
                  >
                    <i className="fab fa-apple"></i> App Store
                  </a>
                )}
              </div>
            </div>
          )}

          {/* O restante dos seus blocos de Detalhes e Tags */}
          <div className="sidebar-info-box">
            <h4>Detalhes</h4>
            <p><strong>Motor:</strong> {game.engine}</p>
            {game.release_date && ( // Corrigido: game.release_date em vez de translation
              <p><strong>Lançamento:</strong> {new Date(game.release_date).toLocaleDateString('pt-BR')}</p>
            )}
            {translation.playtime && (
              <p><strong>Tempo de Jogo:</strong> {translation.playtime}</p>
            )}

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