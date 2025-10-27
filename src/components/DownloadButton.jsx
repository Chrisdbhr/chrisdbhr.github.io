import React, { useState, useEffect, useRef } from 'react'

// IMPORTANTE: Mude para a URL real do instalador do seu launcher
const LAUNCHER_INSTALLER_URL = "https://launcher.chrisjogos.com";

function DownloadButton({ game }) {
  const [showInstallerLink, setShowInstallerLink] = useState(false);
  const timeoutRef = useRef(null);

  const handleDownloadClick = () => {
    // 1. Define o que acontece se o protocolo falhar
    timeoutRef.current = setTimeout(() => {
      // O protocolo falhou (ou demorou demais), oferece o instalador
      setShowInstallerLink(true);
    }, 2500); // 2.5 segundos de espera

    // 2. Tenta abrir o protocolo
    // Ex: chrisjogos://install/Resultarias
    window.location.href = `chrisjogos://install/${game.id}`;
  };
  
  // 3. Detecta se o protocolo ABRIU (focando fora da página)
  useEffect(() => {
    const handleBlur = () => {
      // O usuário clicou "Abrir" no popup do protocolo.
      // A janela perdeu o foco, então cancelamos o download do .exe
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('blur', handleBlur);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  if (showInstallerLink) {
    return (
      <div className="download-fallback">
        <p>Parece que você não tem o Launcher.</p>
        <a 
          href={LAUNCHER_INSTALLER_URL} 
          className="button-primary button-download"
        >
          Baixar o Launcher
        </a>
         <button onClick={() => setShowInstallerLink(false)} className="button-secondary">
           Já tenho, tentar novamente
         </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleDownloadClick} 
      className="button-primary button-download"
    >
      Jogar via Launcher
      {game.latest_version && <span>Versão {game.latest_version}</span>}
    </button>
  )
}

export default DownloadButton