import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { baseURL, fieldsQuery, getHashedColor } from '../utils'
import ScreenshotGallery from '../components/ScreenshotGallery'
import DownloadButton from '../components/DownloadButton'
import ReactMarkdown from 'react-markdown'

function GameDetailPage() {
  const { projectId } = useParams()
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!projectId) return;

    // --- 1. Busca os dados do Jogo ---
    const fetchGame = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseURL}/items/projects/${projectId}?${fieldsQuery}`);
        const data = await response.json();
        setProject(data.data);
      } catch (error) {
        console.error("Erro ao buscar o jogo:", error);
        setProject(null);
      }
    };

    const loadAllData = async () => {
      setLoading(true);
      await fetchGame();
      setLoading(false);
    }

    loadAllData();

  }, [projectId]);

  if (loading) {
    return <div className="page-content"><h2>Carregando...</h2></div>;
  }

  if (!project) {
    return (
      <div className="page-content fade-in">
        <h2>Jogo não encontrado</h2>
        <Link to="/" className="button-primary">
          &larr; Voltar para a Home
        </Link>
      </div>
    )
  }

  const translation = project.translations.find(t => t.language === 'pt-BR') || project.translations[0];

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

  const trailerEmbedUrl = getEmbedUrl(project.trailer_url);

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
            <ScreenshotGallery screenshots={project.screenshots} />
          )}

          {trailerEmbedUrl && project.screenshots.length > 0 && (
            <ScreenshotGallery screenshots={project.screenshots} />
          )}

          <div className="game-synopsis">
            <ReactMarkdown>
              {translation.synopsis}
            </ReactMarkdown>
          </div>

        </div>

        <aside className="game-detail-sidebar">

          {project.steam_id ? (
            // 1. Se tem Steam ID, mostra o widget
            <div className="steam-widget-container">
              <iframe
                src={`https://store.steampowered.com/widget/${project.steam_id}/`}
                frameBorder="0"
                width="100%"
                height="190"
                title="Steam Widget"
              ></iframe>
            </div>
          ) : project.executable_path ? (
            // 2. Senão, se tem executável, mostra o botão de download
            <DownloadButton project={project} />
          ) : (
            // 3. Senão, checamos as outras opções:
            //    Se NÃO tem web, NEM Google, NEM Apple, E NEM GITHUB...
            (!project.web_version_url && !project.google_play_url && !project.app_store_url && !project.github_url) ? (
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
            {project.web_version_url && (
              <a
                href={project.web_version_url}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary button-play-web"
              >
                <i className="fas fa-play"></i> Jogue Agora (Online)
              </a>
            )}

            {/* Link do Código Fonte (GitHub) */}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary button-github"
              >
                <i className="fab fa-github"></i> Código Fonte
              </a>
            )}
          </div>

          {/* Links das Lojas de Aplicativo */}
          {(project.google_play_url || project.app_store_url) && (
            <div className="sidebar-info-box">
              <div className="game-store-links">
                {project.google_play_url && (
                  <a
                    href={project.google_play_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-secondary button-googleplay"
                  >
                    <i className="fab fa-google-play"></i> Google Play
                  </a>
                )}
                {project.app_store_url && (
                  <a
                    href={project.app_store_url}
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
            {project.engine && (
              <p><strong>Motor:</strong> {project.engine}</p>
            )}
            {project.release_date && (
              <p><strong>Lançamento:</strong> {new Date(project.release_date).toLocaleDateString('pt-BR')}</p>
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
              {project.tags.map((tag) => (
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