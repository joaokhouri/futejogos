// src/components/Teclado.tsx
import React from 'react';
import type { TecladoProps } from '../types';

const Teclado: React.FC<TecladoProps> = ({ onKeyPress, letrasUsadas, statusJogo }) => {
  const linha1 = 'QWERTYUIOP'.split('');
  const linha2 = 'ASDFGHJKL'.split('');
  const linha3 = 'ZXCVBNM'.split('');

  // Variável que decide se os botões estarão travados
  const jogoTerminou = statusJogo !== 'jogando';

  const getStatusClasse = (letra: string) => {
    const status = letrasUsadas[letra];
    if (status === 'correto') return 'bg-green-600 text-white';
    if (status === 'presente') return 'bg-yellow-500 text-white';
    if (status === 'ausente') return 'bg-gray-700 text-white';
    return 'bg-gray-500 hover:bg-gray-600';
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-lg mx-auto">
      {/* Linhas 1, 2 e 3 com a propriedade 'disabled' */}
      <div className="flex justify-center gap-1.5">
        {linha1.map((letra) => (
          <button
            onClick={() => onKeyPress(letra)}
            key={letra}
            disabled={jogoTerminou}
            className={`h-12 md:h-14 flex-1 rounded-md font-bold uppercase transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${getStatusClasse(
              letra
            )}`}
          >
            {letra}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-1.5">
        {linha2.map((letra) => (
          <button
            onClick={() => onKeyPress(letra)}
            key={letra}
            disabled={jogoTerminou}
            className={`h-12 md:h-14 flex-1 rounded-md font-bold uppercase transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${getStatusClasse(
              letra
            )}`}
          >
            {letra}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-1.5">
        <button
          onClick={() => onKeyPress('ENTER')}
          disabled={jogoTerminou}
          className="h-12 md:h-14 flex-[1.5] rounded-md text-xs font-bold uppercase bg-gray-500 hover:bg-gray-600 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          ENTER
        </button>
        {linha3.map((letra) => (
          <button
            onClick={() => onKeyPress(letra)}
            key={letra}
            disabled={jogoTerminou}
            className={`h-12 md:h-14 flex-[1.5] rounded-md text-xs font-bold uppercase bg-gray-500 hover:bg-gray-600 disabled:opacity-60 disabled:cursor-not-allowed ${getStatusClasse(
              letra
            )}`}
          >
            {letra}
          </button>
        ))}
        <button
          onClick={() => onKeyPress('⌫')}
          disabled={jogoTerminou}
          className="h-12 md:h-14 flex-[1.5] rounded-md text-xs font-bold uppercase bg-gray-500 hover:bg-gray-600 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          ⌫
        </button>
      </div>
    </div>
  );
};

export default Teclado;
