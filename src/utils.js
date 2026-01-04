export const baseURL = "https://cms.chrisjogos.com";

const baseQuery = "fields=*,translations.*,tags.tags_id,tags_translations.*,card_image.id,card_image.type,genres.genres_id,steam_id,trailer_url,web_version_url,screenshots.directus_files_id.id,screenshots.directus_files_id.type,related_posts.post_id.id,related_posts.post_id.title,related_posts.post_id.date_published,related_posts.post_id.cover_image.id,related_posts.post_id.cover_image.type,related_posts.post_id.status";

const filter = import.meta.env.DEV
  ? "filter[status][_in]=published,draft"
  : "filter[status][_eq]=published";

export const fieldsQuery = `${baseQuery}&${filter}`;

const DEFAULT_IMAGE_WIDTH = 800;

/**
 * Returns an optimized asset URL from Directus, applying WEBP format and width limit by default.
 * @param {string} id Asset ID.
 * @param {number} [width=800] Maximum width.
 * @param {string} [options=''] Additional parameters (e.g., 'height=120&fit=cover').
 * @param {string} [mimeType=''] The file MIME type (e.g., 'image/gif').
 * @returns {string | null} Optimized URL.
 */
export const getAssetUrl = (id, width = DEFAULT_IMAGE_WIDTH, options = '', mimeType = '') => {
  if (!id) return null;

  // If it's a GIF, return the original URL without optimization
  if (mimeType.toLowerCase() === 'image/gif') {
    return `${baseURL}/assets/${id}`;
  }

  let params = `?format=webp&width=${width}`;
  if (options) {
    params += `&${options}`;
  }

  return `${baseURL}/assets/${id}${params}`;
};

/**
 * Formats a date string to a readable format.
 * @param {string} dateString Date string to format.
 * @returns {string} Formatted date.
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getHashedColor(tagString) {
  let hash = 0;
  if (tagString.length === 0) return 'hsl(0, 0%, 30%)';

  for (let i = 0; i < tagString.length; i++) {
    const char = tagString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  const hue = Math.abs(hash) % 360;
  // Use 60% saturation and 35% lightness
  // It's a dark but colorful color, perfect for light text on top
  return `hsl(${hue}, 60%, 35%)`;
}