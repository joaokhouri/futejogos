// src/components/Grid.tsx (Versão Final Simplificada)
import type { GridProps } from '../types';

const Grid: React.FC<GridProps> = ({
  palpites,
  palpiteAtual,
  tentativaAtual,
  respostaDoDia,
  linhaAnimando,
  linhaInvalida,
}) => {
  const nomeDoJogador = respostaDoDia?.nomeJogo || '';
  const tamanhoPalavra = nomeDoJogador.length;

  const getTamanhos = (tamanho: number) => {
    switch (true) {
      case tamanho <= 5:
        return { celula: 'w-16 h-16 md:w-20 md:h-20', fonte: 'text-3xl md:text-4xl' };
      case tamanho <= 7:
        return { celula: 'w-14 h-14 md:w-16 md:h-16', fonte: 'text-2xl md:text-3xl' };
      default:
        return { celula: 'w-10 h-10 md:w-12 md:h-12', fonte: 'text-xl md:text-2xl' };
    }
  };
  const tamanhos = getTamanhos(tamanhoPalavra);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {Array.from({ length: 6 }).map((_, indexLinha) => {
        const palpite = palpites[indexLinha];
        const éLinhaAtual = indexLinha === tentativaAtual;

        return (
          <div
            key={indexLinha}
            className={`flex justify-center gap-1.5 ${
              éLinhaAtual && linhaInvalida ? 'animacao-shake' : ''
            }`}
          >
            {Array.from({ length: tamanhoPalavra }).map((_, indexLetra) => {
              const charDaResposta = nomeDoJogador[indexLetra];
              if (charDaResposta === ' ') {
                return <div key={indexLetra} className={`w-4 ${tamanhos.celula.split(' ')[1]}`} />;
              }

              let letra: string | undefined;
              let statusClasse = 'border-2 border-gray-600';
              let palpiteIndex = 0;
              for (let i = 0; i < indexLetra; i++) {
                if (nomeDoJogador[i] !== ' ') palpiteIndex++;
              }

              const celulaNoPalpite =
                indexLinha < tentativaAtual && palpite ? palpite[palpiteIndex] : null;

              if (éLinhaAtual) {
                letra = palpiteAtual[palpiteIndex];
                if (letra) statusClasse = 'border-2 border-gray-400 animate-pop';
              } else if (celulaNoPalpite) {
                letra = celulaNoPalpite.letra;
                statusClasse =
                  celulaNoPalpite.status === 'correto'
                    ? 'bg-green-600 text-white border-green-600'
                    : celulaNoPalpite.status === 'presente'
                    ? 'bg-yellow-500 text-white border-yellow-500'
                    : 'bg-gray-700 text-white border-gray-700';
              }

              const estaAnimando = linhaAnimando === indexLinha;

              return (
                // UMA ÚNICA DIV PARA A CÉLULA
                <div
                  key={indexLetra}
                  className={`flex items-center justify-center rounded-md transition-all duration-500 ${
                    tamanhos.celula
                  } ${statusClasse} ${estaAnimando ? '' : ''}`}
                  // A animação e a cor acontecem ao mesmo tempo
                >
                  <span className={`font-bold uppercase ${tamanhos.fonte}`}>{letra}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
