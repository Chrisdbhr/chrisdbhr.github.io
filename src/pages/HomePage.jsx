import React, { useState } from 'react'
// 1. Importe o useLoaderData para receber os dados
import { useLoaderData } from 'react-router-dom' 
import ProjectCard from '../components/ProjectCard'
import BlogFeed from '../components/BlogFeed'
import ContactForm from '../components/ContactForm'
import { baseURL, fieldsQuery } from '../utils'
import LauncherCTA from '../components/LauncherCTA'
import DiscordCTA from '../components/DiscordCTA'
import ProjectTypeFilter from '../components/ProjectTypeFilter'
import { normalizeEngineName } from '../utils/textUtils';

// --- FUNÇÕES HELPER ---
const getEngineStats = (games) => {
  const stats = games.reduce((acc, game) => {
    const engineName = normalizeEngineName(game.engine);
    acc[engineName] = (acc[engineName] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(stats).sort((a, b) => a[0].localeCompare(b[0]));
};

// 2. EXPORTE O SEU LOADER (que o main.jsx importa)
export async function loader() {
  const response = await fetch(`${baseURL}/items/projects?${fieldsQuery}`);
  const data = await response.json();
  const totalProjects = data.data;

  const now = new Date();
  
  const unreleasedProjects = totalProjects
    .filter(g => new Date(g.release_date) > now)
    .sort((a, b) => new Date(a.release_date) - new Date(b.release_date)); 

  const pastProjects = totalProjects
    .filter(g => new Date(g.release_date) <= now)
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date)); 

  const groupedReleasedProjects = pastProjects.reduce((acc, project) => {
    const year = new Date(project.release_date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(project);
    return acc;
  }, {});
  
  // Lógica para extrair tipos de projeto únicos
  const allProjectTypes = new Set();
  totalProjects.forEach(p => {
    // Se project_type for null, padroniza para 'project'
    const type = p.project_type || 'project'; 
    allProjectTypes.add(type);
  });
  const uniqueProjectTypes = Array.from(allProjectTypes).sort();
  
  const totalProjectsCount = totalProjects.length;
  const totalEngineStats = getEngineStats(totalProjects);
  const sortedYears = Object.keys(groupedReleasedProjects).sort((a, b) => b - a);
  
  // O loader retorna um objeto com tudo que a página precisa
  return { 
    totalProjects, 
    unreleasedProjects, 
    groupedReleasedProjects, 
    totalProjectsCount, 
    totalEngineStats, 
    sortedYears,
    uniqueProjectTypes // Retorna os tipos únicos
  };
}

// --- COMPONENTE PRINCIPAL ---
function HomePage() {
  // 3. Pegue os dados do loader. Sem loading, sem useEffect!
  const {
    totalProjectsCount,
    totalEngineStats,
    unreleasedProjects: initialUnreleased,
    groupedReleasedProjects: initialGrouped,
    sortedYears,
    uniqueProjectTypes
  } = useLoaderData();

  // Estado para os tipos de projeto que DEVEM ser excluídos
  const [excludedTypes, setExcludedTypes] = useState([]);
  
  // Função para alternar o estado de um tipo de projeto
  const handleToggleType = (type) => {
    setExcludedTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type); // Incluir (remover da lista de exclusão)
      } else {
        return [...prev, type]; // Excluir (adicionar à lista de exclusão)
      }
    });
  };
  
  // 5. Função de filtro: Aplica a lógica de exclusão
  const filterProjects = (projects) => {
    if (excludedTypes.length === 0) return projects;
    
    return projects.filter(project => {
      const type = project.project_type || 'project';
      return !excludedTypes.includes(type);
    });
  };
  
  // 6. Aplicar o filtro nos projetos e calcular quantos foram escondidos
  
  // Projetos futuros
  const filteredUnreleasedProjects = filterProjects(initialUnreleased);
  
  // Projetos passados (Agrupados)
  const filteredGroupedReleasedProjects = {};
  let totalVisibleProjects = filteredUnreleasedProjects.length;
  
  sortedYears.forEach(year => {
    const filtered = filterProjects(initialGrouped[year]);
    if (filtered.length > 0) {
      filteredGroupedReleasedProjects[year] = filtered;
    }
    // Sempre contamos os visíveis para o total
    totalVisibleProjects += filtered.length;
  });

  const projectsHidden = totalProjectsCount - totalVisibleProjects;

  return (
    <div className="page-content fade-in">
      
      <LauncherCTA />

      <div className="home-section">
        <BlogFeed />
      </div>

      {/* NOVO: Componente de Filtro */}
      <ProjectTypeFilter
        types={uniqueProjectTypes}
        excludedTypes={excludedTypes}
        onToggle={handleToggleType}
      />
      
      

      <div className="home-section">
        <div className="home-section-header">
          <h2>
            Meus Jogos e Projetos ({totalVisibleProjects}{totalVisibleProjects !== totalProjectsCount ? `/${totalProjectsCount}` : ''})
            {/* Mensagem de projetos ocultos integrada (Req 2) */}
            {projectsHidden > 0 && (
              <span className="hidden-count-message" style={{ marginLeft: '15px' }}>
                (+{projectsHidden} ocultos)
              </span>
            )}
          </h2>
          {totalEngineStats.length > 0 && (
            <div className="engine-stats-total">
              {totalEngineStats.map(([engine, count]) => (
                <span key={engine} className="engine-stat-item">
                  {engine} ({count})
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Renderização dos Projetos */}
        
        {/* Seção Próximos Lançamentos */}
        {(initialUnreleased.length > 0) && (
          <section className="year-group">
            <h3 className="year-title upcoming-title">Próximos Lançamentos</h3>
            {initialUnreleased.length === filteredUnreleasedProjects.length && filteredUnreleasedProjects.length === 0 ? (
                 <p style={{ textAlign: 'center', color: 'var(--color-grey)', padding: '20px 0' }}>
                   Nenhum projeto futuro listado.
                 </p>
            ) : filteredUnreleasedProjects.length === 0 && initialUnreleased.length > 0 ? (
                 <p style={{ textAlign: 'center', color: 'var(--color-grey)', padding: '20px 0' }}>
                   Todos os {initialUnreleased.length} projetos futuros foram ocultos pelos filtros.
                 </p>
            ) : (
              <div className="game-grid">
                {filteredUnreleasedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}

                {/* Card de Projetos Ocultos (Unreleased) */}
                {initialUnreleased.length > filteredUnreleasedProjects.length && (
                  <div className="game-card hidden-projects-card">
                    <div className="hidden-card-content">
                      <h4>+{initialUnreleased.length - filteredUnreleasedProjects.length} Projetos Ocultos</h4>
                      <p>Ajuste os filtros de tipo para visualizá-los.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}
        
        {/* Seção Projetos Lançados (Agrupados por Ano) */}
        {sortedYears.map((year) => {
          const initialYearProjects = initialGrouped[year];
          // Garante que filteredYearProjects seja um array, mesmo que vazio
          const filteredYearProjects = filteredGroupedReleasedProjects[year] || []; 
          
          const projectsHiddenInYear = initialYearProjects.length - filteredYearProjects.length;
          const allProjectsHidden = projectsHiddenInYear === initialYearProjects.length;

          // Se a lista inicial tem projetos, mas todos foram filtrados (Req 3, Caso A)
          if (allProjectsHidden && initialYearProjects.length > 0) {
            return (
              <section key={year} className="year-group">
                <div className="home-section-header">
                  <h3 className="year-title">{year}</h3>
                </div>
                <p style={{ textAlign: 'center', color: 'var(--color-grey)', padding: '20px 0' }}>
                  Todos os {initialYearProjects.length} projetos de {year} foram ocultos pelos filtros.
                </p>
              </section>
            );
          }

          // Se não houver projetos visíveis, não renderiza a seção
          if (filteredYearProjects.length === 0) return null; 

          const yearEngineStats = getEngineStats(filteredYearProjects);
          return (
            <section key={year} className="year-group">
              <div className="home-section-header">
                <h3 className="year-title">{year}</h3>
                <div className="engine-stats-year">
                  {yearEngineStats.map(([engine, count]) => (
                    <span key={engine} className="engine-stat-item-year">
                      {engine} ({count})
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="game-grid">
                {filteredYearProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
                
                {/* Card de Projetos Ocultos (Req 3, Caso B) */}
                {projectsHiddenInYear > 0 && (
                  <div className="game-card hidden-projects-card">
                    <div className="hidden-card-content">
                      <h4>+{projectsHiddenInYear} Projetos Ocultos</h4>
                      <p>Ajuste os filtros de tipo para visualizá-los.</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })}
        
        {totalProjectsCount > 0 && totalVisibleProjects === 0 && (
            <p style={{ textAlign: 'center', marginTop: '40px', color: '#a0a0a0' }}>
                Nenhum projeto encontrado. Todos foram ocultos pelos filtros atuais.
            </p>
        )}
         {totalProjectsCount === 0 && (
            <p style={{ textAlign: 'center', marginTop: '40px', color: '#a0a0a0' }}>
                Nenhum projeto cadastrado no portfólio.
            </p>
        )}
      </div>

      <div className="home-contact-layout">
        <div className="home-section">
          <ContactForm />
        </div>
        <div className="home-section discord-home-widget">
          <DiscordCTA />
        </div>
      </div>
    </div>
  )
}

export default HomePage