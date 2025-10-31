import React, { useState, useEffect } from 'react';

const DIRECTUS_URL = "https://cms.chrisjogos.com";

function ContactForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Efeito para buscar o email salvo no localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem('contactEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message || !email) {
      setError("Por favor, preencha o email e a mensagem.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const body = {
      email: email,
      message: message,
    };

    try {
      // API pública, sem token de autorização
      const response = await fetch(`${DIRECTUS_URL}/items/contact_messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar sua mensagem. Tente novamente.");
      }
      
      setSuccess("Mensagem enviada com sucesso! Responderei assim que possível.");
      setMessage(''); // Limpa a mensagem
      localStorage.setItem('contactEmail', email); // Salva o email
      
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <h3>Fale Comigo</h3>
      <p>Envie sua mensagem diretamente para mim. Responderei no email fornecido assim que possível.</p>

      <form onSubmit={handleSubmit} className="contact-form">
        {error && <p className="comment-message error">{error}</p>}
        {success && <p className="comment-message success">{success}</p>}

        <div className="form-group">
          <label htmlFor="email">Seu Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
            required
          />
        </div>

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
    </div>
  );
}

export default ContactForm;