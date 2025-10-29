import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaRegStar, FaStar } from "react-icons/fa";

const DIRECTUS_URL = "https://cms.chrisjogos.com";

function InteractiveStarRating({ gameId }) {
  const { user, token } = useAuth();
  
  const [currentRating, setCurrentRating] = useState(0); 
  const [hoverRating, setHoverRating] = useState(0);
  const [existingRatingId, setExistingRatingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // 1. EFEITO DE CARREGAMENTO: Buscar a avaliação existente
  useEffect(() => {
    if (!gameId || !user || !user.id || !token) {
      setCurrentRating(0);
      setExistingRatingId(null);
      return;
    }

    const fetchUserRating = async () => {
      setIsLoading(true);
      setError(null); // Limpa erros antigos ao recarregar
      
      const filter = `filter[related_game][_eq]=${gameId}&filter[user_created][_eq]=${user.id}`;
      const fields = "fields=id,rating_value";
      
      try {
        const response = await fetch(`${DIRECTUS_URL}/items/ratings?${filter}&${fields}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        // Se o token for inválido, o !response.ok será pego abaixo
        if (!response.ok) throw new Error("Não foi possível buscar sua nota.");

        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
          const userRating = data.data[0];
          setCurrentRating(userRating.rating_value);
          setExistingRatingId(userRating.id);
        } else {
          setCurrentRating(0);
          setExistingRatingId(null);
        }
      } catch (err) {
        console.error("Erro ao buscar avaliação:", err);
        // Não mostre o erro de "buscar" se o usuário deslogar, etc.
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRating();
  }, [gameId, user, token]);

  // 2. FUNÇÃO DE ENVIO (POST ou PATCH)
  const handleSubmitRating = async (ratingValue) => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      let response;
      const payload = {
        rating_value: ratingValue,
        related_game: gameId,
      };

      let url = `${DIRECTUS_URL}/items/ratings`;
      let method = 'POST';

      if (existingRatingId) {
        // --- ATUALIZAR (PATCH) ---
        url = `${DIRECTUS_URL}/items/ratings/${existingRatingId}?fields=id,rating_value`;
        method = 'PATCH';
      } else {
        // --- CRIAR (POST) ---
        url = `${DIRECTUS_URL}/items/ratings?fields=id,rating_value`;
        method = 'POST';
      }

      response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(method === 'POST' ? payload : { rating_value: ratingValue })
      });

      // --- CORREÇÃO DE ERRO ---
      if (!response.ok) {
        let errorMessage = `Falha ao salvar: ${response.statusText}`;
        try {
          // Tenta ler o JSON de erro, se houver
          const errData = await response.json();
          errorMessage = errData.errors?.[0]?.message || errorMessage;
        } catch (e) {
          // Captura o erro 'Unexpected end of JSON' se a resposta de erro
          // (ex: 401) estiver vazia.
          console.error("A resposta de ERRO estava vazia:", e);
          errorMessage = `Erro ${response.status}. Verifique se você está logado.`;
        }
        throw new Error(errorMessage);
      }
      
      // --- CORREÇÃO DE SUCESSO ---
      // Verificamos o corpo ANTES de tentar ler o JSON
      const responseClone = response.clone();
      const responseText = await responseClone.text();

      if (responseText) {
        // O corpo tem conteúdo, podemos ler o JSON
        const savedData = await response.json();
        setCurrentRating(savedData.data.rating_value);
        setExistingRatingId(savedData.data.id);
        setSuccessMessage("Sua nota foi salva!");
      } else {
        // O corpo está VAZIO, mesmo sendo sucesso.
        // Isso é 99% de certeza um problema de permissão de LEITURA no Directus.
        setCurrentRating(ratingValue); // Atualiza o visual
        setSuccessMessage("Nota salva!"); // Dá o feedback
        
        // Deixa um aviso técnico para você
        const permError = "A nota foi salva, mas o Directus retornou um corpo vazio. Verifique as permissões de LEITURA (Read) para a role na coleção 'ratings'.";
        console.warn(permError);
        setError(permError); // Mostra o erro real
      }

    } catch (err) {
      console.error("Erro ao salvar avaliação:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. RENDERIZAÇÃO
  if (!user) {
    return (
      <div className="star-rating-widget">
        <h4>Avalie este jogo</h4>
        <p className="rating-display-text">
          <a href="/login">Faça login</a> para deixar sua nota.
        </p>
      </div>
    );
  }

  const stars = [1, 2, 3, 4, 5];
  const displayText = {
    0: "Deixe sua nota",
    1: "Muito Ruim",
    2: "Ruim",
    3: "Ok",
    4: "Bom",
    5: "Excelente!"
  };

  return (
    <div className="star-rating-widget interactive">
      <h4>{existingRatingId ? "Mude sua nota" : "Deixe sua nota"}</h4>
      <div 
        className="stars-container" 
        onMouseLeave={() => setHoverRating(0)}
        style={{ opacity: isLoading ? 0.5 : 1 }}
      >
        {stars.map((starValue) => {
          const ratingToShow = hoverRating || currentRating;
          const StarIcon = starValue <= ratingToShow ? FaStar : FaRegStar;

          return (
            <StarIcon
              key={starValue}
              className="star-icon"
              onClick={() => handleSubmitRating(starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
            />
          );
        })}
      </div>
      <p className="rating-display-text">
        {displayText[hoverRating || currentRating]}
      </p>

      {error && <p className="comment-message error">{error}</p>}
      {successMessage && <p className="comment-message success">{successMessage}</p>}
    </div>
  );
}

export default InteractiveStarRating;