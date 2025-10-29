import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

/**
 * Exibe uma classificação de 5 estrelas estática.
 * Lida com notas decimais (ex: 3.8) para exibir meias-estrelas.
 * @param {object} props
 * @param {number} props.rating - A nota de 0 a 5.
 */
function StarRating({ rating }) {
  const roundedRating = Math.round(rating * 2) / 2; // Arredonda para 0.5, 1, 1.5, etc.

  return (
    <div className="star-rating static">
      {[1, 2, 3, 4, 5].map((starValue) => {
        if (roundedRating >= starValue) {
          // Estrela cheia
          return <FaStar key={starValue} />;
        }
        if (roundedRating >= starValue - 0.5) {
          // Meia estrela
          return <FaStarHalfAlt key={starValue} />;
        }
        // Estrela vazia
        return <FaRegStar key={starValue} />;
      })}
    </div>
  );
}

export default StarRating;