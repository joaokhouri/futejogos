// src/components/Footer.tsx
import React from 'react';
import { icons as icon } from './Icons'; // Importa os caminhos dos ícones

// Um componente pequeno e reutilizável para o ícone social
const SocialIcon: React.FC<{ href: string; path: string }> = ({ href, path }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-500 hover:text-white transition-colors"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d={path} />
    </svg>
  </a>
);

const Footer: React.FC = () => {
  return (
    // mt-auto empurra o footer para a base, border-t adiciona uma linha sutil de separação
    <footer className="w-full mt-auto p-4 border-t border-gray-800">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Lado Esquerdo: Texto de Copyright */}
        <p className="text-gray-500 text-xs md:text-sm">
          FuteJogos &copy; {new Date().getFullYear()} - Um projeto feito por fãs de futebol.
        </p>

        {/* Lado Direito: Ícones das Redes Sociais */}
        <div className="flex items-center gap-4">
          <SocialIcon href="#" path={icon.twitter} />
          <SocialIcon href="#" path={icon.instagram} />
          <SocialIcon href="#" path={icon.discord} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
