import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function UserAuthWidget() {
  // Adicione 'loading' do contexto
  const { user, loading, logout } = useAuth();

  // Função para garantir que o logout seja assíncrono
  const handleLogout = () => {
    logout();
    // O setUser(null) no contexto vai forçar a re-renderização
  };

  // 1. Estado de Carregamento
  // Mostra um placeholder enquanto o fetchUser() inicial está rodando
  if (loading) {
    return (
      <div className="user-auth-widget">
        <span>Carregando...</span>
      </div>
    );
  }

  // 2. Estado Logado
  // Se 'user' existe, mostra o nome e o botão de sair
  if (user) {
    return (
      <div className="user-auth-widget">
        <span className="user-greeting">Olá, {user.first_name || user.email}</span>
        {/* Usando seus estilos e chamando a função correta */}
        <button onClick={handleLogout} className="button-secondary button-small">
          Sair
        </button>
      </div>
    );
  }

  // 3. Estado Deslogado
  // Se 'user' é nulo e não está carregando
  return (
    <div className="user-auth-widget">
      {/* Usando seus estilos */}
      <Link to="/login" className="button-primary button-small">Login</Link>
      <Link to="/register" className="button-secondary button-small">Registrar</Link>
    </div>
  );
}

export default UserAuthWidget;