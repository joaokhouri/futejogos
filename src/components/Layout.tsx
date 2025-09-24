// src/components/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  // O objeto de estilo para o fundo (continua o mesmo)
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `
      radial-gradient(at 80% 20%, hsla(270, 70%, 55%, 0.20) 0px, transparent 50%),
      radial-gradient(at 20% 80%, hsla(220, 80%, 60%, 0.20) 0px, transparent 50%)
    `,
    backgroundColor: '#0E111C',
  };

  return (
    // ESTE É O CONTAINER PRINCIPAL DA PÁGINA
    // min-h-screen: Garante que ele tenha no mínimo a altura da tela.
    // flex flex-col: Organiza os filhos (Header, div do conteúdo, Footer) em uma coluna.
    <div style={backgroundStyle} className="min-h-screen flex flex-col text-gray-200">
      <Header />

      {/* ESTE É O CONTAINER DO CONTEÚDO PRINCIPAL */}
      {/* flex-grow: A MÁGICA! Diz para esta div crescer e ocupar todo o espaço vazio. */}
      {/* flex flex-col: Organiza o conteúdo da página (o Outlet) em uma coluna. */}
      <div className="w-full max-w-7xl mx-auto flex-grow flex flex-col p-4 box-border">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
