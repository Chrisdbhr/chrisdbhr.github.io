import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
  useRouteError,
} from "react-router-dom";

// Componentes
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './styles.css'; 

// Páginas
import HomePage, { loader as homePageLoader } from './pages/HomePage.jsx'; // Importa o loader
import GameDetailPage from './pages/GameDetailPage.jsx';
import BlogListPage, { loader as blogListPageLoader } from './pages/BlogListPage.jsx'; // Importa o loader
import BlogPostPage from './pages/BlogPostPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Oops! Algo deu errado.</h2>
      <p>{error.message || "Parece que o Chris subiu algo pra testar em produção e quebrou tudo kkkk"}</p>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App />
        <ScrollRestoration />
      </>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      // CORREÇÃO: Anexa os loaders às rotas
      { 
        index: true, 
        element: <HomePage />, 
        loader: homePageLoader // Loader da Home
      }, 
      { 
        path: "game/:gameId", 
        element: <GameDetailPage /> 
        // A página de detalhes continua buscando por si mesma, o que é bom
      },
      { 
        path: "blog", 
        element: <BlogListPage />, 
        loader: blogListPageLoader // Loader da Blog List
      },
      { path: "blog/:slug", element: <BlogPostPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ]
  },
]);

const InitialFallback = () => {
  return (
    // Você pode estilizar isso como uma página de loading completa,
    // mas por enquanto um div simples resolve o warning.
    <div style={{
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      fontFamily: 'sans-serif', 
      fontSize: '1.5rem',
      backgroundColor: '#141414', // Cor de fundo do seu site
      color: '#FFFFFF'           // Cor de texto do seu site
    }}>
      Carregando Portfólio...
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider 
        router={router} 
        fallbackElement={<InitialFallback />}
      />
    </AuthProvider>
  </React.StrictMode>,
);