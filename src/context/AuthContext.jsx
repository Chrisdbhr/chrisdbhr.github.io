import React, { createContext, useState, useEffect, useContext } from 'react';

const DIRECTUS_URL = "https://cms.chrisjogos.com";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Tradutor de Erros do Directus
 */
function translateDirectusError(error) {
  if (!error) return "Ocorreu um erro desconhecido.";

  const code = error.extensions?.code;
  const field = error.extensions?.field;

  if (field === 'password' && (code === 'INVALID_FORMAT' || code === 'FAILED_VALIDATION')) {
    return "Senha inválida. Sua senha deve ter pelo menos 8 caracteres.";
  }
  if (code === 'RECORD_NOT_UNIQUE' && field === 'email') {
    return "Este email já está cadastrado. Tente fazer login.";
  }
  if (code === 'INVALID_CREDENTIALS') {
    return "Email ou senha incorretos.";
  }

  console.error("Erro do Directus não traduzido:", error);
  return error.message || "Ocorreu um erro. Tente novamente.";
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('auth_token'));
  const [loading, setLoading] = useState(true);

  // Função helper para buscar dados do usuário com um token
  const fetchUserWithToken = async (token) => {
    try {
      const response = await fetch(`${DIRECTUS_URL}/users/me?fields=id,first_name,email`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Token inválido");
      
      const data = await response.json();
      if (data.data) {
        setUser(data.data);
      } else {
        throw new Error("Não foi possível buscar os dados do usuário.");
      }
    } catch (error) {
      setUser(null);
      setToken(null);
      localStorage.removeItem('auth_token');
    }
  };

  // Ao carregar, verifica se há um token no localStorage e busca o usuário
  useEffect(() => {
    if (token) {
      fetchUserWithToken(token).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    // Roda apenas uma vez na montagem, com base no token inicial
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []); 

  const login = async (email, password) => {
    const response = await fetch(`${DIRECTUS_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, mode: 'json' })
    });
    
    const data = await response.json();
    
    if (data.data && data.data.access_token) {
      const new_token = data.data.access_token;
      setToken(new_token);
      localStorage.setItem('auth_token', new_token);
      await fetchUserWithToken(new_token); // Busca o usuário imediatamente
      return true;
    }
    
    const firstError = data.errors?.[0];
    throw new Error(translateDirectusError(firstError));
  };

  // Função chamada pela AuthCallbackPage
  const loginWithToken = async (newToken) => {
    if (newToken) {
      setLoading(true);
      setToken(newToken);
      localStorage.setItem('auth_token', newToken);
      await fetchUserWithToken(newToken);
      setLoading(false);
    }
  };

  const register = async (email, password, first_name) => {
    const DEFAULT_ROLE_ID = "4370253b-b47a-42a1-9a70-f0ec1cda7af6"; 

    const response = await fetch(`${DIRECTUS_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: first_name,
        email: email,
        password: password,
        role: DEFAULT_ROLE_ID 
      })
    });
    
    if (response.ok) {
      return await login(email, password);
    } else {
  	  const errorData = await response.json();
      const firstError = errorData.errors?.[0];
      throw new Error(translateDirectusError(firstError));
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
  };
  
  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    loginWithToken // <-- Essencial para o OAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} 
    </AuthContext.Provider>
  );
}