import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Importe o Auth
import { Link } from 'react-router-dom';

const DIRECTUS_URL = "https://cms.chrisjogos.com";

function ContactForm() {
  const { user, token } = useAuth(); // Use o Auth
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message || !user) return;

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const body = {
      message: message,
      // 'owner' será pego pelo token
    };

    try {
      const response = await fetch(`${DIRECTUS_URL}/items/contact_messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar sua mensagem. Tente novamente.");
      }
      
      setSuccess("Mensagem enviada com sucesso! Responderei assim que possível.");
      setMessage('');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <h3>Fale Comigo</h3>

      {user ? (
        <form onSubmit={handleSubmit} className="contact-form">
          <p>Enviando como <strong>{user.first_name}</strong> ({user.email}).</p>

          {error && <p className="comment-message error">{error}</p>}
          {success && <p className="comment-message success">{success}</p>}

          <div className="form-group">
            <label htmlFor="message">Sua Mensagem</label>
            <textarea
              id="message"
              rows="6"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={submitting}
              required
            ></textarea>
          </div>
          <button type="submit" className="button-primary" disabled={submitting}>
            {submitting ? "Enviando..." : "Enviar Mensagem"}
          </button>
        </form>
      ) : (
        <div className="comment-form" style={{ textAlign: 'center' }}>
          <p>Você precisa <Link to="/login">fazer login</Link> para enviar uma mensagem.</p>
        </div>
      )}
    </div>
  );
}

export default ContactForm;