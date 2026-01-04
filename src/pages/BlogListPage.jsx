import React, { useState, useEffect } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { getAssetUrl, baseURL } from '../utils'

// 2. Exporte o loader
export async function loader() {
  const filter = import.meta.env.DEV
    ? "filter[status][_in]=published,draft"
    : "filter[status][_eq]=published";

  const API_URL = `${baseURL}/items/blog_posts?fields=id,title,date_published,cover_image.id,cover_image.type&${filter}&sort=-date_published`

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    const allPosts = data.data.map((item) => {
      let imageUrl = null;
      if (item.cover_image) {
        // Usando getAssetUrl para otimizar cards do blog (400px de largura, 16:9)
        imageUrl = getAssetUrl(item.cover_image.id, 400, 'height=225&fit=cover', item.cover_image.type);
      }

      return {
        title: item.title || "No Title",
        link: `/blog/${item.id}`,
        pubDate: new Date(item.date_published || Date.now()).toLocaleDateString('pt-BR'),
        imageUrl: imageUrl,
      };
    });
    return allPosts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

function BlogListPage() {
  const posts = useLoaderData();

  return (
    <>
      <title>Blog - ChrisJogos</title>
      <meta name="description" content="Articles and devlogs about my game projects." />
      <meta property="og:title" content="Blog - ChrisJogos" />
      <meta property="og:description" content="Articles and devlogs about my game projects." />

      <div className="blog-list-page">
        <h2>Blog</h2>
        <p>Articles and devlogs about my projects.</p>

        <div className="blog-post-grid">
          {posts.map((post, index) => (
            <Link
              key={index}
              to={post.link}
              className="blog-post-card"
            >
              <div className="blog-post-image-container">
                {post.imageUrl ? (
                  <img src={post.imageUrl} alt={`Cover image of ${post.title}`} />
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
    </>
  )
}

export default BlogListPage