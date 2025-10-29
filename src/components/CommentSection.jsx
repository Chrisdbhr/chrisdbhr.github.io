import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const DIRECTUS_URL = "https://cms.chrisjogos.com"
const API_URL = `${DIRECTUS_URL}/items/comments`

function CommentSection({ relation }) {
  const { user, token } = useAuth(); // <-- Use o contexto
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [relationKey, relationId] = Object.entries(relation)[0];

  const fetchComments = async () => {
     setLoading(true);
     let filter = `filter[${relationKey}][_eq]=${relationId}`; 
     let sort = `sort=-date_created`;
 
     // Lista explícita de campos (sem *) e com a relação correta (user_created)
     let fields = `fields=id,content,date_created,user_created.first_name`; 
     
     try {
       const response = await fetch(`${API_URL}?${filter}&${sort}&${fields}`);
       if (!response.ok) throw new Error("Falha ao carregar comentários.");
       
       const data = await response.json();
       setComments(data.data);
     } catch (err) {
       setError(err.message);
     } finally {
       setLoading(false);
     }
   };
  
  useEffect(() => {
    if (relationId) {
      fetchComments();
    }
  }, [relationId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return;
    
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const body = {
      content: content,
      status: 'published',
      [relationKey]: relationId
      // O 'owner' será definido automaticamente pelo Directus por causa do token
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // <-- Envie o token!
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Não foi possível enviar seu comentário.");
      
      // Recarrega os comentários para incluir o nome
      await fetchComments(); 
      setSuccess("Comentário enviado!");
      setContent('');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comentários</h3>
      
      {user ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <h4>Deixe um comentário como {user.first_name}</h4>
          {error && <p className="comment-message error">{error}</p>}
          {success && <p className="comment-message success">{success}</p>}
          <div className="form-group">
            <textarea 
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={submitting}
              required
            ></textarea>
          </div>
          <button type="submit" className="button-primary" disabled={submitting}>
            {submitting ? "Enviando..." : "Enviar Comentário"}
          </button>
        </form>
      ) : (
        <div className="comment-form">
          <p>Você precisa <Link to="/login">fazer login</Link> para comentar.</p>
        </div>
      )}

      <div className="comment-list">
         {loading && <p>Carregando comentários...</p>}
         {comments.map((comment) => (
           <div key={comment.id} className="comment-item">
             <strong>
               {comment.user_created 
                 ? `${comment.user_created.first_name}` 
                 : 'Usuário'}
             </strong>
             <span>{new Date(comment.date_created).toLocaleDateString('pt-BR')}</span>
             <p>{comment.content}</p>
           </div>
         ))}
       </div>
    </div>
  );
}

export default CommentSection;