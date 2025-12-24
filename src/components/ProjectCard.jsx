import React from 'react'
import { Link } from 'react-router-dom'
import { getAssetUrl, getHashedColor } from '../utils'
import { normalizeEngineName } from '../utils/textUtils';

function ProjectCard({ project }) {
  const translation = project.translations.find(t => t.language === 'pt-BR') || project.translations[0] || { title: 'Título não disponível' }
  // getAssetUrl() agora usa o padrão de 800px wide e webp
  const imageUrl = getAssetUrl(project.card_image?.id) 

  let firstLineSynopsis = '';
  if (translation.synopsis) {
    firstLineSynopsis = translation.synopsis
      .split('\n')[0]
      .replace(/([*_~]|<br\s*\/?>|\[.*?\]\(.*?\))/g, '')
      .trim();
  }

  const engineName = normalizeEngineName(project.engine);
  const isUnreleased = new Date(project.release_date) > new Date();
  
  // Se project_type for null, padroniza para 'project'
  const projectType = project.project_type || 'project';

  return (
    <Link to={`/project/${project.id}`} className="game-card">
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
          {project.tags.slice(0, 3).map((tag) => (
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
          
          {project.engine && (
            <span className="engine-name">{project.engine}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
export default ProjectCard