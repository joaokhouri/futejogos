// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import GameCard from '../components/GameCard'; // Importa nosso novo componente
import { carregarEstatisticas } from '../logic/storage'; // Importa a função
import type { Estatisticas } from '../types';

const Home: React.FC = () => {
  const [estatsCraqueSecreto, setEstatsCraqueSecreto] = useState<Estatisticas | null>(null);
  useEffect(() => {
    setEstatsCraqueSecreto(carregarEstatisticas());
  }, []);
  return (
    // O 'main' agora é o container dos nossos cards
    <div className="w-full h-full flex flex-col justify-center">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Sua Arena de Desafios Diários
        </h2>
        <p className="text-lg md:text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
          Teste seu conhecimento sobre os maiores craques e a história do futebol. Um novo desafio
          todos os dias.
        </p>
      </div>

      {/* Grid responsivo para os cards dos jogos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card do Jogo 1: Craque Secreto (Disponível) */}
        <GameCard
          title="Craque Secreto"
          description="Adivinhe o jogador do dia em 6 tentativas."
          imageUrl="/images/craque-secreto-thumb.jpg"
          linkTo="/termo"
          isAvailable={true}
          vitorias={estatsCraqueSecreto?.vitorias}
          derrotas={estatsCraqueSecreto?.derrotas}
        />

        {/* Card do Jogo 2: Grid (Placeholder) */}
        <GameCard
          title="Grid da Fama"
          description="Preencha o grid com jogadores que cumprem os critérios."
          imageUrl="/images/embreve.jpg" // Podemos usar uma imagem placeholder
          linkTo="#"
          isAvailable={false} // Jogo ainda não disponível
          vitorias={estatsCraqueSecreto?.vitorias}
          derrotas={estatsCraqueSecreto?.derrotas}
        />
      </div>
    </div>
  );
};

export default Home;
