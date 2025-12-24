export const baseURL = "https://cms.chrisjogos.com";

const baseQuery = "fields=*,translations.*,tags.tags_id,tags_translations.*,card_image.id,genres.genres_id,steam_id,trailer_url,web_version_url,screenshots.directus_files_id";

const filter = import.meta.env.DEV
  ? "filter[status][_in]=published,draft"
  : "filter[status][_eq]=published";

export const fieldsQuery = `${baseQuery}&${filter}`;

const DEFAULT_IMAGE_WIDTH = 800;

/**
 * Retorna a URL otimizada de um asset do Directus, aplicando WEBP e limite de largura por padrão.
 * @param {string} id ID do asset.
 * @param {number} [width=800] Largura máxima.
 * @param {string} [options=''] Parâmetros adicionais (ex: 'height=120&fit=cover').
 * @returns {string | null} URL otimizada.
 */
export const getAssetUrl = (id, width = DEFAULT_IMAGE_WIDTH, options = '') => {
  if (!id) return null;
  
  let params = `?format=webp&width=${width}`;
  if (options) {
    params += `&${options}`;
  }
  
  return `${baseURL}/assets/${id}${params}`;
};

export function getHashedColor(tagString) {
  let hash = 0;
  if (tagString.length === 0) return 'hsl(0, 0%, 30%)';

  for (let i = 0; i < tagString.length; i++) {
    const char = tagString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Converte para 32bit integer
  }
  
  const hue = Math.abs(hash) % 360;
  // Usamos 60% de saturação e 35% de luminosidade
  // É uma cor escura, mas colorida, perfeita para texto claro por cima
  return `hsl(${hue}, 60%, 35%)`;
}