// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importa o novo Layout e as páginas
import Layout from './components/Layout';
import Home from './pages/Home';
import Termo from './pages/Termoo';

import './index.css';

const router = createBrowserRouter([
  {
    // Esta é a rota "pai"
    path: '/',
    element: <Layout />, // Ela renderiza nosso Layout com o Header
    // As rotas abaixo são as "filhas"
    children: [
      {
        index: true, // Isso marca esta como a página padrão para "/"
        element: <Home />,
      },
      {
        path: 'termo', // O caminho é relativo ao pai, então vira "/termo"
        element: <Termo />,
      },
      // Quando criarmos o jogo "Grid", adicionaremos aqui:
      // { path: "grid", element: <GridGame /> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
