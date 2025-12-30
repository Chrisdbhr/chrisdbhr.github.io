// Função para "slugificar" um texto, igual ao rehype-slug faz
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Substitui espaços por -
    .replace(/[^\w-]+/g, '') // Remove caracteres inválidos
    .replace(/--+/g, '-'); // Remove hífens duplicados
}

/**
 * Calcula o tempo de leitura do texto.
 * Média de 225 palavras por minuto.
 */
export function getReadingTime(markdown) {
  if (!markdown) return 0;
  
  // Remove tags HTML e markdown para contar apenas palavras
  const text = markdown
    .replace(/<[^>]+>/g, '') // Remove HTML
    .replace(/[#*_-]/g, '');   // Remove markdown chars
    
  const words = text.split(/\s+/).filter(Boolean).length;
  const wpm = 225;
  
  return Math.ceil(words / wpm);
}

/**
 * Extrai cabeçalhos H2 e H3 do markdown para o TOC
 */
export function extractToc(markdown) {
  if (!markdown) return [];
  
  const headings = [];
  // Regex para encontrar linhas que começam com ## ou ###
  const matches = markdown.match(/^(##|###)\s(.+)/gm);
  
  if (matches) {
    matches.forEach((match) => {
      const level = match.startsWith('###') ? 3 : 2;
      const title = match.replace(/^(##|###)\s/, '').trim();
      const id = slugify(title);
      
      headings.push({
        id: id,
        title: title,
        level: level,
      });
    });
  }
  return headings;
}

export const normalizeEngineName = (engine) => {
  if (!engine) return 'Outro';
  
  return engine
    .replace(/[0-9.-]/g, '')
    .replace(/Engine/gi, '')
    .trim();
};