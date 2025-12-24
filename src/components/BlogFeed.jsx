import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAssetUrl } from '../utils' // <--- Importado

const DIRECTUS_URL = "https://cms.chrisjogos.com"
// Esta é a URL correta para buscar a LISTA de posts
const API_URL = `${DIRECTUS_URL}/items/blog_posts?fields=id,title,date_published,cover_image.id&filter[status][_eq]=published&sort=-date_published&limit=4`

function BlogFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URL); // <-- Busca a lista
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        
        const feedPosts = data.data.map((item) => {
          let imageUrl = null;
          if (item.cover_image) {
            // Usando getAssetUrl para otimizar cards do blog (400px de largura, 16:9)
            imageUrl = getAssetUrl(item.cover_image.id, 400, 'height=225&fit=cover');
          }

          return {
            title: item.title || "Sem título",
            link: `/blog/${item.id}`, // <-- Link interno
            pubDate: new Date(item.date_published || Date.now()).toLocaleDateString('pt-BR'),
            imageUrl: imageUrl,
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
      
      <div className="blog-post-grid">
        {posts.map((post, index) => (
          // Usando <Link> para navegação interna
          <Link 
            key={index} 
            to={post.link} 
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
          </Link>
        ))}
      </div>
      
      <Link to="/blog" className="button-secondary blog-view-all">
        Ver todos os posts &rarr;
      </Link>
    </div>
  )
}

export default BlogFeed