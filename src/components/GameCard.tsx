// src/components/GameCard.tsx
import { Link } from 'react-router-dom';

interface GameCardProps {
  title: string;
  description: string;
  imageUrl: string;
  linkTo: string;
  isAvailable?: boolean;
  vitorias?: number;
  derrotas?: number;
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  imageUrl,
  linkTo,
  isAvailable = true,
  // 1. RECEBENDO AS NOVAS PROPS
  vitorias,
  derrotas,
}) => {
  const content = (
    <>
      <div className="relative w-full aspect-video overflow-hidden rounded-t-lg">
        <img
          src={imageUrl}
          alt={`Imagem do jogo ${title}`}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isAvailable ? 'group-hover:scale-105' : 'filter grayscale'
          }`}
        />

        {!isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">EM BREVE</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">{description}</p>
        {/* 2. ADICIONANDO O BLOCO JSX DO PLACAR */}
        {/* Este bloco só será renderizado se as props de placar existirem */}
        {isAvailable && vitorias !== undefined && derrotas !== undefined && (
          <div className="mt-4 flex justify-around border-t border-gray-700 pt-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{vitorias}</p>
              <p className="text-xs text-gray-500 uppercase">Vitórias</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-400">{derrotas}</p>
              <p className="text-xs text-gray-500 uppercase">Derrotas</p>
            </div>
          </div>
        )}
      </div>
    </>
  );

  if (!isAvailable) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg cursor-not-allowed opacity-60">
        {content}
      </div>
    );
  }

  return (
    <Link
      to={linkTo}
      className="block bg-gray-800 rounded-lg shadow-lg group transition-all hover:shadow-green-500/20 hover:-translate-y-1"
    >
      {content}
    </Link>
  );
};

export default GameCard;
