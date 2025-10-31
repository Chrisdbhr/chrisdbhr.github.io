import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import TableOfContents from '../components/TableOfContents'
import { getReadingTime, extractToc } from '../utils/textUtils'

const DIRECTUS_URL = "https://cms.chrisjogos.com"

function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [tocItems, setTocItems] = useState([]);
  const [readingTime, setReadingTime] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const API_URL = `${DIRECTUS_URL}/items/blog_posts/${slug}?fields=id,title,date_published,content,cover_image.id`
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        
        if (data.data) {
          setPost(data.data);
          setReadingTime(getReadingTime(data.data.content));
          setTocItems(extractToc(data.data.content));
        } else {
          throw new Error("Post não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <>
        <title>Carregando Post... - ChrisJogos</title>
        <p>Carregando post...</p>
      </>
    );
  }
  
  if (!post) {
    return (
      <>
        <title>Post Não Encontrado - ChrisJogos</title>
        <p>Post não encontrado.</p>
      </>
    );
  }

  const imageUrl = post.cover_image 
    ? `${DIRECTUS_URL}/assets/${post.cover_image.id}` 
    : null;
    
  const pubDate = new Date(post.date_published || Date.now()).toLocaleDateString('pt-BR');

  const description = post.content
    ? post.content.substring(0, 155).replace(/(\r\n|\n|\r|#|!|\[|\]|\*)/gm, " ").trim() + "..."
    : "Leia este post no blog ChrisJogos.";

  return (
    <div className="blog-post-layout">
      
      <title>{`${post.title} - ChrisJogos`}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph (para Discord, Facebook, etc.) */}
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      
      {/* Twitter Cards (para o Twitter) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      <article className="blog-post-detail">
        <header className="blog-post-header">
          <h1>{post.title}</h1>
          <div className="blog-post-meta">
            <span className="blog-post-date">{pubDate}</span>
            {readingTime > 0 && (
              <span className="blog-post-reading-time">
                &bull; {readingTime} min de leitura
              </span>
            )}
          </div>

          {imageUrl && (
            <img 
              src={imageUrl} 
              alt={`Capa de ${post.title}`} 
              className="blog-post-cover-image"
            />
          )}
        </header>
        
        <div className="blog-post-body">
          <ReactMarkdown
            rehypePlugins={[
              rehypeRaw, 
              rehypeSlug 
            ]}
          >
            {post.content}
          </ReactMarkdown>
        </div>
        
      </article>

      <aside className="blog-post-sidebar-container">
        <TableOfContents items={tocItems} />
      </aside>
    </div>
  )
}

export default BlogPostPage