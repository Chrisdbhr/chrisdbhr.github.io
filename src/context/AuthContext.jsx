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
  const [loading, setLoading] = useState(true);

  /**
   * Nova função que busca o usuário confiando no cookie de sessão.
   * Ela será usada no login, no registro e no carregamento da página.
   */
  const fetchUser = async () => {
    try {
      const response = await fetch(`${DIRECTUS_URL}/users/me?fields=id,first_name,email,description`, {
        // A MÁGICA: Envia o cookie de sessão junto com a requisição
        credentials: 'include' 
      });

      if (!response.ok) throw new Error("Sessão não encontrada ou expirada.");
      
      const data = await response.json();
      if (data.data) {
        setUser(data.data);
        return data.data; // Retorna o usuário
      } else {
        throw new Error("Não foi possível buscar os dados do usuário.");
      }
    } catch (error) {
      setUser(null);
      return null;
    }
  };

  /**
   * Tenta buscar o usuário ao carregar o app.
   * Se o cookie de sessão ainda for válido, o usuário será logado.
   */
  useEffect(() => {
    fetchUser().finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const response = await fetch(`${DIRECTUS_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    
    // Se a resposta NÃO foi OK (ex: 401 Invalid Credentials)
    if (!response.ok) {
      const data = await response.json();
      const firstError = data.errors?.[0];
      throw new Error(translateDirectusError(firstError));
    }

    // Se a resposta foi OK (ex: 204 No Content), o cookie foi definido.
    // Não tente ler response.json() de uma resposta vazia.
    
    // Agora buscamos os dados do usuário.
    const user = await fetchUser(); 
    
    // Se o fetchUser retornou um usuário, sucesso.
    if (user) {
      return true;
    }

    // Se o usuário é nulo, o fetchUser falhou (o 401 que você está vendo).
    // Isso é causado pelo problema de CORS.
    throw new Error("Login bem-sucedido, mas falha ao buscar dados do usuário. Verifique o CORS do servidor.");
  };
  
  const register = async (email, password, first_name) => {
    // ATENÇÃO: Verifique se este ID é o mesmo do seu docker-compose!
    const DEFAULT_ROLE_ID = "4370253b-b47a-42a1-9a70-f0ec1cda7af6"; 

    const response = await fetch(`${DIRECTUS_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Não precisa de 'credentials' aqui, pois é um endpoint público
      body: JSON.stringify({
        first_name: first_name,
        email: email,
        password: password,
        role: DEFAULT_ROLE_ID 
      })
    });
    
    if (response.ok) {
      // Se registrou, faz o login para criar a sessão
      return await login(email, password);
    } else {
      const errorData = await response.json();
      const firstError = errorData.errors?.[0];
      throw new Error(translateDirectusError(firstError));
    }
  };

  const logout = async () => {
    // Invalida a sessão no servidor
    await fetch(`${DIRECTUS_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    fetchUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}