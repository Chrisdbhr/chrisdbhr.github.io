import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function UserAuthWidget() {
  const { user, logout } = useAuth();

  return (
    <div className="user-auth-widget">
      {user ? (
        <>
          <span>Olá, {user.first_name || user.email}</span>
          <button onClick={logout} className="button-secondary button-small">Sair</button>
        </>
      ) : (
        <>
          <Link to="/login" className="button-primary button-small">Login</Link>
          <Link to="/register" className="button-secondary button-small">Registrar</Link>
        </>
      )}
    </div>
  );
}

export default UserAuthWidget;