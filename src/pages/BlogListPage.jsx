import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const DIRECTUS_URL = "https://cms.chrisjogos.com"
const API_URL = `${DIRECTUS_URL}/items/blog_posts?fields=id,title,date_published,cover_image.id&filter[status][_eq]=published&sort=-date_published`

function BlogListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        
        const allPosts = data.data.map((item) => {
          let imageUrl = null;
          if (item.cover_image) {
            imageUrl = `${DIRECTUS_URL}/assets/${item.cover_image.id}`;
          }

          return {
            title: item.title || "Sem título",
            link: `/blog/${item.id}`,
            pubDate: new Date(item.date_published || Date.now()).toLocaleDateString('pt-BR'),
            imageUrl: imageUrl,
          };
        });
        setPosts(allPosts);
      } catch (error) {
        console.error("Erro ao buscar posts do blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="blog-list-page">
      <h2>Blog</h2>
      <p>Artigos e devlogs sobre meus projetos.</p>
      
      {loading && <p>Carregando posts...</p>}
      
      <div className="blog-post-grid">
        {posts.map((post, index) => (
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
    </div>
  )
}

export default BlogListPage