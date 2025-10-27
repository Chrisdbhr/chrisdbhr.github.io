import React, { useState } from 'react'
import { getAssetUrl } from '../mockData'

function ScreenshotGallery({ screenshots }) {
  // Ordena por prioridade (maior primeiro)
  const sortedScreenshots = [...screenshots].sort((a, b) => b.priority - a.priority);
  
  const [selectedImage, setSelectedImage] = useState(
    sortedScreenshots.length > 0 ? getAssetUrl(sortedScreenshots[0].file) : null
  );

  if (screenshots.length === 0) {
    return <div className="screenshot-gallery-placeholder">Sem screenshots disponíveis.</div>
  }

  return (
    <div className="screenshot-gallery">
      <div className="gallery-main-image">
        {selectedImage && <img src={selectedImage} alt="Screenshot principal" />}
      </div>
      <div className="gallery-thumbnails">
        {sortedScreenshots.map((ss) => {
          const imageUrl = getAssetUrl(ss.file);
          return (
            <img
              key={ss.file}
              src={imageUrl}
              alt="Thumbnail"
              className={selectedImage === imageUrl ? 'active' : ''}
              onClick={() => setSelectedImage(imageUrl)}
            />
          );
        })}
      </div>
    </div>
  )
}

export default ScreenshotGallery