import React, { useState, useEffect } from 'react'

const RSS_PROXY_URL = "https://blog.chrisjogos.com/index.xml";

// Função helper para tentar extrair a imagem do post
function getPostImage(item) {
  // 1. Tenta tag <media:content>
  const mediaContent = item.querySelector("content[url]");
  if (mediaContent) return mediaContent.getAttribute("url");

  // 2. Tenta tag <enclosure>
  const enclosure = item.querySelector("enclosure[url]");
  if (enclosure) return enclosure.getAttribute("url");
  
  // 3. Tenta extrair <img> da tag <description>
  const description = item.querySelector("description")?.textContent;
  if (description) {
    const match = description.match(/<img.*?src=["'](.*?)["']/);
    if (match && match[1]) return match[1];
  }
  
  // 4. Tenta a tag <image> (padrão do Hugo)
  const image = item.querySelector("image")?.textContent;
  if (image) return image;

  return null; // Nenhuma imagem encontrada
}


function BlogFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(RSS_PROXY_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const str = await response.text();
        const data = new window.DOMParser().parseFromString(str, "text/xml");
        const items = data.querySelectorAll("item");

        // Mudei para 3 posts para caber melhor no grid
        const feedPosts = Array.from(items).slice(0, 3).map((item) => {
          const imageUrl = getPostImage(item);
          
          // Corrige URLs relativas (ex: /p/meu-post/img.jpg)
          let finalImageUrl = imageUrl;
          if (imageUrl && imageUrl.startsWith('/')) {
            finalImageUrl = `https://blog.chrisjogos.com${imageUrl}`;
          }

          return {
            title: item.querySelector("title")?.textContent || "Sem título",
            link: item.querySelector("link")?.textContent || "#",
            pubDate: new Date(item.querySelector("pubDate")?.textContent || Date.now()).toLocaleDateString('pt-BR'),
            imageUrl: finalImageUrl,
          };
        });
        setPosts(feedPosts);
      } catch (error) {
        console.error("Erro ao buscar posts do blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="blog-feed-container">
      <h3>Últimas do Blog</h3>
      {loading && <p>Carregando posts...</p>}
      
      {/* --- NOVO LAYOUT DE GRID PARA O BLOG --- */}
      <div className="blog-post-grid">
        {posts.map((post, index) => (
          <a 
            key={index} 
            href={post.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="blog-post-card"
          >
            <div className="blog-post-image-container">
              {post.imageUrl ? (
                <img src={post.imageUrl} alt={`Capa de ${post.title}`} />
              ) : (
                <div className="blog-post-image-placeholder"></div>
              )}
            </div>
            <div className="blog-post-content">
              <h4>{post.title}</h4>
              <span className="blog-post-date">{post.pubDate}</span>
            </div>
          </a>
        ))}
      </div>
      
      <a href="https://blog.chrisjogos.com" target="_blank" rel="noopener noreferrer" className="button-secondary blog-view-all">
        Ver todos os posts &rarr;
      </a>
    </div>
  )
}

export default BlogFeed