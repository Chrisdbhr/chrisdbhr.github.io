import React from 'react';

function TableOfContents({ items }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className="toc-sidebar">
      <h4>Neste Artigo</h4>
      <ul>
        {items.map((item) => (
          <li key={item.id} className={`toc-item-level-${item.level}`}>
            <a href={`#${item.id}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TableOfContents;