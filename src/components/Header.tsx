// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// Se você criou o componente Icon.tsx, pode importá-lo.
// Senão, podemos manter os SVGs diretamente como abaixo.

const Header: React.FC = () => {
  return (
    // O padding do header agora é responsivo: p-2 no mobile, p-4 no desktop
    <header className="sticky top-0 z-10 w-full bg-gray-950/70 backdrop-blur-sm border-b border-gray-800">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between p-2 md:p-4 box-border">
        {/* Botão de Ajuda */}
        <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
          </svg>
          {/* O texto "Ajuda" fica ESCONDIDO por padrão (mobile)... */}
          <span className="hidden md:inline font-semibold">Ajuda</span>
          {/* ... e aparece como 'inline' em telas médias (md) ou maiores */}
        </button>

        <Link to="/">
          {/* O tamanho do título também é responsivo */}
          <img src="/images/logo.png" alt="Logo FuteJogos" className="h-8 md:h-10 w-auto" />
        </Link>

        {/* Botão de Estatísticas */}
        <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
          {/* O texto "Estatísticas" também é responsivo */}
          <span className="hidden md:inline font-semibold">Estatísticas</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M16 8v14.4c0 1.2-1.2 2-2.4 1.6L2 17.4V2c0-1.2 1.2-2 2.4-1.6L16 8zM2 3.4v12l10.8 6.2V9.6L2 3.4zM22 2c-1.2 0-2 .8-2 2v16c0 1.2.8 2 2 2s2-.8 2-2V4c0-1.2-.8-2-2-2z" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
