import React from 'react'
import { FaDiscord } from 'react-icons/fa'

function DiscordCTA() {
  return (
    <>
      <h3>Minha Comunidade</h3>
      <p>
        Conheça o Concord! Há +10 anos, jogamos, 
        trabalhamos e falamos da vida juntos.
      </p>
      <a 
        href="https://discord.chrisjogos.com/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="button-secondary discord-button"
      >
        <FaDiscord />
        Entrar no Discord
      </a>
    </>
  )
}

export default DiscordCTA