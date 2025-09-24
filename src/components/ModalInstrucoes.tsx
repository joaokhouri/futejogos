// src/components/ModalInstrucoes.tsx

interface ModalInstrucoesProps {
  onClose: () => void;
}

const ModalInstrucoes: React.FC<ModalInstrucoesProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-20 p-4">
      <div className="bg-gray-800 text-white p-6 rounded-2xl max-w-md w-full flex flex-col items-center shadow-lg">
        <h2 className="text-3xl font-bold mb-4 uppercase tracking-wider">Como Jogar</h2>

        <div className="text-left space-y-4 w-full mb-6">
          <p>
            Adivinhe o <span className="font-bold text-green-400">JOGADOR SECRETO</span> em 6
            tentativas.
          </p>
          <p>
            Cada palpite deve ser um jogador válido. O tamanho do grid se ajusta ao nome do jogador.
          </p>

          <hr className="border-gray-600" />

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-md bg-green-600 flex items-center justify-center font-bold text-2xl">
              P
            </div>
            <p>
              A letra <span className="font-bold">P</span> existe no nome e está na{' '}
              <span className="font-bold text-green-400">posição correta</span>.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-md bg-yellow-500 flex items-center justify-center font-bold text-2xl">
              E
            </div>
            <p>
              A letra <span className="font-bold">E</span> existe no nome, mas está na{' '}
              <span className="font-bold text-yellow-500">posição errada</span>.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-md bg-gray-700 flex items-center justify-center font-bold text-2xl">
              L
            </div>
            <p>
              A letra <span className="font-bold">L</span>{' '}
              <span className="font-bold text-gray-400">não existe</span> no nome.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full p-3 text-lg font-bold text-white uppercase bg-green-600 rounded-lg hover:bg-green-700 transition-transform hover:scale-105"
        >
          Entendi!
        </button>
      </div>
    </div>
  );
};

export default ModalInstrucoes;
