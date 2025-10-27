import React from 'react'
import { FaStar } from 'react-icons/fa' // Ícone de estrela

function StarRating({ rating }) {
  // Converte a nota 0-10 para 0-5
  const score = Math.round(rating / 2);

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={index}
            className="star-icon"
            color={starValue <= score ? '#FFD700' : '#444'} // Amarelo para preenchida, cinza para vazia
          />
        );
      })}
    </div>
  )
}

export default StarRating