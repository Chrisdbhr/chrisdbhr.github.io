import React from 'react'
import { FaUnity } from 'react-icons/fa'
import { SiConstruct2, SiUnrealengine } from 'react-icons/si' // Importação corrigida

// Mapeia o nome da engine (como vem do seu CMS) para o ícone
const engineMap = {
  unity: <FaUnity title="Unity" />,
  unreal: <SiUnrealengine title="Unreal Engine" />, // Uso corrigido
  construct2: <SiConstruct2 title="Construct 2" />,
}

function EngineIcon({ engine }) {
  if (!engine) return null;

  const icon = engineMap[engine.toLowerCase()];
  if (!icon) {
    // Fallback se não encontrar o ícone
    return <span className="engine-text">{engine}</span>
  }

  return <div className="engine-icon">{icon}</div>
}

export default EngineIcon