import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function UserAuthWidget() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="user-auth-widget">
        <span>Carregando...</span>
      </div>
    );
  }

  if (user) {
    return (
      <div className="user-auth-widget">
        <span className="user-greeting">Olá, {user.first_name || user.email}</span>
        <button onClick={logout} className="button-secondary button-small">
          Sair
        </button>
      </div>
    );
  }

  return (
    <div className="user-auth-widget">
      <Link to="/login" className="button-primary button-small">Login</Link>
      <Link to="/register" className="button-secondary button-small">Registrar</Link>
    </div>
  );
}

export default UserAuthWidget;