import React, { useState } from 'react'
import { getAssetUrl } from '../utils'

// Definições de tamanho para otimização do Directus
const THUMBNAIL_WIDTH = 200;
const THUMBNAIL_HEIGHT = 120;
const MAIN_IMAGE_WIDTH = 1200;

/**
 * Gera a URL otimizada do asset do Directus, convertendo para WebP e aplicando limites de dimensão.
 * @param {string} id ID do arquivo no Directus
 * @param {number} width Largura desejada
 * @param {number} [height=null] Altura desejada (para thumbnails, usa fit=cover)
 * @returns {string | null} URL otimizada
 */
function getOptimizedAssetUrl(id, width, height = null) {
  if (!id) return null;
  // Inicia a URL com o formato webp e a largura
  let url = `${getAssetUrl(id)}?format=webp&width=${width}`;
  
  if (height) {
    // Para thumbnails, usamos altura e fit=cover para garantir o aspecto
    url += `&height=${height}&fit=cover`;
  }
  return url;
}


function ScreenshotGallery({ screenshots }) {
  // Inicializa a imagem principal com a URL otimizada de alta resolução
  const [selectedImage, setSelectedImage] = useState(
    screenshots.length > 0 
      ? getOptimizedAssetUrl(screenshots[0].directus_files_id, MAIN_IMAGE_WIDTH) 
      : null
  );

  if (screenshots.length === 0) {
    return <div className="screenshot-gallery-placeholder">Sem screenshots disponíveis.</div>
  }
  
  // O arquivo ID do screenshot atualmente selecionado
  const selectedFileId = selectedImage 
    ? screenshots.find(ss => selectedImage.includes(ss.directus_files_id))?.directus_files_id
    : null;

  const handleThumbnailClick = (fileId) => {
    // Ao clicar, define a URL otimizada para visualização principal
    setSelectedImage(getOptimizedAssetUrl(fileId, MAIN_IMAGE_WIDTH));
  };

  return (
    <div className="screenshot-gallery">
      <div className="gallery-main-image">
        {selectedImage && <img src={selectedImage} alt="Screenshot principal" />}
      </div>
      <div className="gallery-thumbnails">
        {screenshots.map((ss) => {
          // Geração da URL da thumbnail otimizada e em WebP
          const thumbnailUrl = getOptimizedAssetUrl(
            ss.directus_files_id, 
            THUMBNAIL_WIDTH, 
            THUMBNAIL_HEIGHT
          );
          
          // Comparamos o ID do arquivo para saber qual thumbnail está ativa
          const isSelected = ss.directus_files_id === selectedFileId;
          
          return (
            <img
              key={ss.directus_files_id}
              src={thumbnailUrl}
              alt="Thumbnail"
              className={isSelected ? 'active' : ''}
              onClick={() => handleThumbnailClick(ss.directus_files_id)}
              loading="lazy" // Otimização de carregamento
            />
          );
        })}
      </div>
    </div>
  )
}

export default ScreenshotGallery