import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa'; // Ícone do Google

const DIRECTUS_URL = "https://cms.chrisjogos.com";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [authProviders, setAuthProviders] = useState([]); // Estado para os provedores
  const { login } = useAuth();
  const navigate = useNavigate();

  // 1. Busca os provedores de login (Google, etc.) do Directus
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch(`${DIRECTUS_URL}/auth`);
        const data = await response.json();
        setAuthProviders(data.data || []);
      } catch (err) {
        console.error("Falha ao buscar provedores de login:", err);
      }
    };
    fetchProviders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  // 2. Prepara a URL de login do Google
  const googleProvider = authProviders.find(p => p.name === 'google');
  let googleLoginUrl = null;
  if (googleProvider) {
    // Define para onde o Google deve nos enviar de volta
    // ${window.location.origin} funciona para localhost E produção
    const redirectUrl = `${window.location.origin}/auth/callback`;
    googleLoginUrl = `${DIRECTUS_URL}/auth/login/google?redirect=${encodeURIComponent(redirectUrl)}`;
  }

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit}>
        <h2>Login na Enigma Net</h2>
        {error && <p className="comment-message error">{error}</p>}
        
        {/* --- 3. Botão do Google --- */}
        {googleLoginUrl && (
          <a href={googleLoginUrl} className="button-primary button-google">
            <FaGoogle style={{ marginRight: '10px' }} />
            Continuar com Google
          </a>
        )}

        {googleLoginUrl && <p className="auth-divider">ou</p>}

        {/* --- Formulário de Email/Senha --- */}
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="button-primary">Entrar</button>
        <p>Não tem uma conta? <Link to="/register">Registre-se</Link></p>
      </form>
    </div>
  );
}

export default LoginPage;