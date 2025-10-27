import React from 'react'

// Para fazer funcionar, crie uma conta no Formspree.io,
// crie um formulário e cole o endpoint aqui.
const FORM_ENDPOINT = "https://formspree.io/f/movpveel"; 

function ContactForm() {
  return (
    <div className="contact-form-container">
      <h3>Entre em Contato</h3>
      <p>Envie sua mensagem, proposta ou feedback.</p>
      <form action={FORM_ENDPOINT} method="POST" className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensagem</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit" className="button-primary">Enviar Mensagem</button>
      </form>
    </div>
  )
}

export default ContactForm