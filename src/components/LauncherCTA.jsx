import React from 'react'

// Puxa a mesma URL do DownloadButton
const LAUNCHER_INSTALLER_URL = "https://launcher.chrisjogos.com";

function LauncherCTA() {
  return (
    <div className="launcher-cta-container">
      <div className="launcher-cta-icon">🚀</div>
      <div className="launcher-cta-content">
        <h3>Conheça o Launcher Oficial</h3>
        <p>
          A forma mais fácil de baixar e manter todos os meus jogos
          sempre atualizados, direto no seu PC.
        </p>
      </div>
      <div className="launcher-cta-action">
        <a 
          href={LAUNCHER_INSTALLER_URL} 
          className="button-primary"
        >
          Baixar o Launcher
        </a>
      </div>
    </div>
  )
}

export default LauncherCTA