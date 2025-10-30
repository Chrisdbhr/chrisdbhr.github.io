import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const token = searchParams.get('access_token');
    
    if (token) {
      // Usamos a nova função do AuthContext
      loginWithToken(token).then(() => {
        // Redireciona para a Home após logar
        navigate('/');
      });
    } else {
      // Se não houver token (ex: erro do Google), volta pra home
      console.error("Callback de autenticação sem token.");
      navigate('/');
    }
  }, [searchParams, loginWithToken, navigate]);

  // Mostra um "Carregando..." enquanto o processo ocorre
  return (
    <div className="auth-page">
      <h2>Autenticando...</h2>
      <p>Por favor, aguarde.</p>
    </div>
  );
}

export default AuthCallbackPage;