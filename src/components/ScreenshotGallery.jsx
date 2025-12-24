import React, { useState } from 'react'
import { getAssetUrl } from '../utils'

// Definições de tamanho para otimização do Directus
const THUMBNAIL_WIDTH = 200;
const THUMBNAIL_HEIGHT = 120;
const MAIN_IMAGE_WIDTH = 1200;

// O getAssetUrl agora aplica a otimização de formato e largura por padrão.
// A função local getOptimizedAssetUrl foi removida.

function ScreenshotGallery({ screenshots }) {
  // Inicializa a imagem principal com a URL otimizada de alta resolução
  const [selectedImage, setSelectedImage] = useState(
    screenshots.length > 0 
      ? getAssetUrl(screenshots[0].directus_files_id, MAIN_IMAGE_WIDTH) 
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
    setSelectedImage(getAssetUrl(fileId, MAIN_IMAGE_WIDTH));
  };

  return (
    <div className="screenshot-gallery">
      <div className="gallery-main-image">
        {selectedImage && <img src={selectedImage} alt="Screenshot principal" />}
      </div>
      <div className="gallery-thumbnails">
        {screenshots.map((ss) => {
          // Geração da URL da thumbnail otimizada, usando parâmetros de opção para fit/height
          const thumbnailUrl = getAssetUrl(
            ss.directus_files_id, 
            THUMBNAIL_WIDTH, 
            `height=${THUMBNAIL_HEIGHT}&fit=cover`
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