import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const DIRECTUS_URL = "https://cms.chrisjogos.com";

function InteractiveStarRating({ gameId }) {
  const { user, token, loading: authLoading } = useAuth();
  
  const [savedRating, setSavedRating] = useState(null); // Sua nota salva (1-5)
  const [hoverRating, setHoverRating] = useState(null); // Onde o mouse está (1-5)
  const [userRatingId, setUserRatingId] = useState(null); // O ID da sua avaliação
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const displayRating = hoverRating || savedRating;
  
  // 1. Busca a avaliação *deste* usuário para *este* jogo
  useEffect(() => {
    if (authLoading || !user) {
      setIsLoading(false);
      return;
    }

    const fetchUserRating = async () => {
      setIsLoading(true);
      const filter = `filter[owner][id][_eq]=${user.id}&filter[related_game][id][_eq]=${gameId}`;
      const fields = 'id,rating_value';
      
      try {
        const response = await fetch(`${DIRECTUS_URL}/items/ratings?${filter}&${fields}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
          setUserRatingId(data.data[0].id);
          setSavedRating(data.data[0].rating_value);
        } else {
          setSavedRating(null);
          setUserRatingId(null);
        }
      } catch (err) {
        console.warn("Erro ao buscar nota do usuário:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRating();
  }, [user, gameId, token, authLoading]);

  // 2. Envia a avaliação (Cria NOVO ou Atualiza EXISTENTE)
  const submitRating = async (ratingValue) => {
    if (isSubmitting || !user) return;
    setIsSubmitting(true);
    setError(null);

    const isUpdating = !!userRatingId;
    const url = isUpdating 
      ? `${DIRECTUS_URL}/items/ratings/${userRatingId}`
      : `${DIRECTUS_URL}/items/ratings`;
      
    const method = isUpdating ? 'PATCH' : 'POST';

    const body = {
      rating_value: ratingValue,
      related_game: gameId
      // 'owner' é definido pelo token
    };

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      if (!data.data) throw new Error("Falha ao salvar nota.");

      setSavedRating(data.data.rating_value);
      setUserRatingId(data.data.id); 
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || isLoading) return <p>Carregando avaliação...</p>;

  if (!user) {
    return (
      <div className="star-rating-widget">
        <p><Link to="/login">Faça login</Link> para avaliar.</p>
      </div>
    );
  }

  return (
    <div className="star-rating-widget interactive">
      <h4>Sua Avaliação</h4>
      <div className="stars-container" onMouseLeave={() => setHoverRating(null)}>
        {[1, 2, 3, 4, 5].map((starValue) => {
          let icon = displayRating >= starValue ? <FaStar /> : <FaRegStar />;

          return (
            <span
              key={starValue}
              className="star-icon"
              onMouseOver={() => setHoverRating(starValue)}
              onClick={() => submitRating(starValue)}
            >
              {icon}
            </span>
          );
        })}
      </div>
      {displayRating && (
        <p className="rating-display-text">
          {isSubmitting ? "Salvando..." : `Sua nota: ${displayRating} / 5`}
        </p>
      )}
      {error && <p className="comment-message error">{error}</p>}
    </div>
  );
}

export default InteractiveStarRating;