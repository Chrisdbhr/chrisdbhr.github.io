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

// Known engines that should maintain their capitalization
const KNOWN_ENGINES = {
  'unity': 'Unity',
  'unreal': 'Unreal',
  'unreal engine': 'Unreal Engine',
  'construct 2': 'Construct 2',
  'construct 3': 'Construct 3',
  'godot': 'Godot',
  'godot engine': 'Godot Engine'
};

export const normalizeEngineName = (engine) => {
  if (!engine) return 'Outro';

  // First convert to lowercase for comparison
  const lowerEngine = engine.toLowerCase();

  // Check if this is a known engine
  for (const [key, value] of Object.entries(KNOWN_ENGINES)) {
    if (lowerEngine.includes(key)) {
      // Return the properly capitalized version
      return value;
    }
  }

  // For unknown engines, remove version numbers and trim
  return engine
    .replace(/Engine/gi, '') // Remove 'Engine' suffix first
    // Remove complex version numbers (e.g., ' 2023.1', ' 4.25', etc.)
    // Matches space followed by 4 digits (year based) or space followed by numbers with dots (major.minor)
    // This allows single digits like '2' in 'Construct 2' to be preserved.
    .replace(/(\s\d{4}.*)|(\s\d+\.\d+.*)/g, '')
    .trim();
};