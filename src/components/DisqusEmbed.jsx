import React, { useEffect } from 'react';

function DisqusEmbed({ shortname, config }) {
  useEffect(() => {
    // Se não tiver shortname ou um identificador de post, não faz nada
    if (!shortname || !config.identifier) {
      return;
    }

    // 1. Configura as variáveis globais que o script do Disqus vai ler
    window.disqus_config = function () {
      this.page.url = config.url;
      this.page.identifier = config.identifier;
      this.page.title = config.title;
    };
    
    const scriptId = 'disqus-embed-script';
    let script = document.getElementById(scriptId);

    // 2. Se o script já existe (de uma navegação anterior), 
    // removemos para forçar o recarregamento com a nova config
    if (script) {
      script.remove();
    }

    // 3. Cria a tag <script>
    const d = document;
    script = d.createElement('script');
    script.id = scriptId;
    script.src = `https://${shortname}.disqus.com/embed.js`;
    script.setAttribute('data-timestamp', +new Date());
    
    // 4. Adiciona o script ao body para carregar
    (d.head || d.body).appendChild(script);

    // 5. Função de limpeza quando o componente desmontar (usuário navegar)
    return () => {
      const script = document.getElementById(scriptId);
      if (script) {
        script.remove();
      }
      
      // Limpa as configs globais para garantir que a próxima página carregue certo
      delete window.disqus_config;
    };
  }, [shortname, config.identifier, config.url, config.title]); // Roda de novo se o post mudar

  return (
    <div id="disqus_thread">
      {/* O script do Disqus vai popular este div */}
    </div>
  );
}

export default DisqusEmbed;