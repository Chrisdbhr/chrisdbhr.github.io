import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import TableOfContents from '../components/TableOfContents'
import { getReadingTime, extractToc } from '../utils/textUtils'
import { getAssetUrl, baseURL } from '../utils'

function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [tocItems, setTocItems] = useState([]);
  const [readingTime, setReadingTime] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const API_URL = `${baseURL}/items/blog_posts/${slug}?fields=id,title,date_published,content,cover_image.id,cover_image.type`
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
          throw new Error("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
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
        <title>Loading Post... - ChrisJogos</title>
        <p>Loading post...</p>
      </>
    );
  }
  
  if (!post) {
    return (
      <>
        <title>Post Not Found - ChrisJogos</title>
        <p>Post not found.</p>
      </>
    );
  }

  const imageUrl = post.cover_image 
    ? getAssetUrl(post.cover_image.id, 1000, '', post.cover_image.type) // Otimizado para 1000px de largura
    : null;
    
  const pubDate = new Date(post.date_published || Date.now()).toLocaleDateString('pt-BR');

  const description = post.content
    ? post.content.substring(0, 155).replace(/(\r\n|\n|\r|#|!|\[|\]|\*)/gm, " ").trim() + "..."
    : "Read this post on ChrisJogos blog.";

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
                &bull; {readingTime} min read
              </span>
            )}
          </div>

          {imageUrl && (
            <img 
              src={imageUrl} 
              alt={`Cover image of ${post.title}`} 
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