import React from 'react'
import { Link } from 'react-router-dom'
import { getAssetUrl, getHashedColor } from '../utils'
import { normalizeEngineName } from '../utils/textUtils';

function GameCard({ game }) {
  const translation = game.translations.find(t => t.language === 'pt-BR') || game.translations[0] || { title: 'Título não disponível' }
  const imageUrl = getAssetUrl(game.card_image?.id)

  let firstLineSynopsis = '';
  if (translation.synopsis) {
    firstLineSynopsis = translation.synopsis
      .split('\n')[0]
      .replace(/([*_~]|<br\s*\/?>|\[.*?\]\(.*?\))/g, '')
      .trim();
  }

  const engineName = normalizeEngineName(game.engine);
  const isUnreleased = new Date(game.release_date) > new Date();
  
  const projectType = game.project_type || 'game';

  return (
    <Link to={`/game/${game.id}`} className="game-card">
      <div className="game-card-image-container">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Capa de ${translation.title}`}
            className="game-card-image"
          />
        ) : (
          <div className="game-card-image-placeholder">Sem Imagem</div>
        )}
        
        {isUnreleased && (
          <div className="unreleased-banner">Em Breve</div>
        )}
      </div>

      <div className="game-card-content">
        <h3>{translation.title}</h3>
        
        {firstLineSynopsis && (
          <p className="game-card-synopsis">{firstLineSynopsis}</p>
        )}

        <div className="game-card-tags">
          {game.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag.tags_id} 
              className="game-tag"
              style={{ 
                backgroundColor: getHashedColor(tag.tags_id),
              }}
            >
              {tag.tags_id}
            </span>
          ))}
        </div>

        {/* --- FOOTER ATUALIZADO --- */}
        <div className="game-card-footer">
          <div className="game-card-footer-left">
            <span 
              className="game-tag-outline"
              style={{ 
                borderColor: getHashedColor(projectType),
                color: getHashedColor(projectType) 
              }}
            >
              {projectType}
            </span>
          </div>
          
          {game.engine && (
            <span className="engine-name">{game.engine}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
export default GameCard