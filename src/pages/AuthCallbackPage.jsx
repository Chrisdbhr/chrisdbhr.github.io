import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DIRECTUS_URL = "https://cms.chrisjogos.com";

/**
 * Atualiza o perfil do usuário (função "dispare e esqueça")
 * Agora confia no cookie de sessão, não precisa mais de token.
 */
const updateUserData = (user) => {
  if (user.description) {
    return;
  }
  
  const userData = {
    language: navigator.language,
    platform: navigator.platform,
    userAgent: navigator.userAgent
  };
  const description = `Language: ${userData.language} | Platform: ${userData.platform} | UserAgent: ${userData.userAgent}`;

  fetch(`${DIRECTUS_URL}/users/me`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ description: description })
  }).catch(err => {
    console.error("Falha ao atualizar dados do usuário:", err);
  });
};


function AuthCallbackPage() {
  const navigate = useNavigate();
  // Renomeamos para 'fetchUser' para clareza
  const { fetchUser } = useAuth(); 

  useEffect(() => {
    // Assim que a página carrega, o cookie do Google já foi definido.
    // Nós apenas pedimos ao AuthContext para buscar os dados do usuário.
    fetchUser().then((user) => {
      if (user) {
        // Se o usuário foi buscado, coletamos os dados extras
        updateUserData(user);
      }
      // Logado ou não, mandamos para a home
      navigate('/'); 
    });
  }, [fetchUser, navigate]);

  return (
    <div className="auth-page">
      <h2>Autenticando...</h2>
      <p>Por favor, aguarde.</p>
    </div>
  );
}

export default AuthCallbackPage;