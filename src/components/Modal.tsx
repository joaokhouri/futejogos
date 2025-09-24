// src/components/Modal.tsx
import React, { useState } from 'react';
import type { ModalProps } from '../types';
import { gerarTextoDeCompartilhamento, iniciarCompartilhamento } from '../logic/share';

const Modal: React.FC<ModalProps> = ({ status, jogador, tentativas, onClose, palpites }) => {
  const [textoBotao, setTextoBotao] = useState('Compartilhar');

  const handleShare = async () => {
    // Agora passamos nomeJogo, pois é o nome sem espaços
    const texto = gerarTextoDeCompartilhamento(palpites, tentativas, jogador.nomeJogo);
    const resultado = await iniciarCompartilhamento(texto);

    // O feedback para o usuário agora depende do método usado
    if (resultado.sucesso) {
      if (resultado.metodo === 'copy') {
        setTextoBotao('Copiado!');
        setTimeout(() => setTextoBotao('Compartilhar'), 2000);
      }
      // Se o método for 'share', o próprio sistema operacional já dá o feedback. Não fazemos nada.
    } else {
      setTextoBotao('Erro!');
      setTimeout(() => setTextoBotao('Compartilhar'), 2000);
    }
  };

  const mensagemTitulo = status === 'vitoria' ? 'Parabéns!' : 'Não foi dessa vez!';
  const mensagemSubtitulo =
    status === 'vitoria'
      ? `Você acertou em ${tentativas} de 6 tentativas!`
      : 'O jogador secreto era:';

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-10 p-4">
      <div className="bg-gray-800 text-white p-6 rounded-2xl text-center max-w-sm w-full flex flex-col items-center shadow-lg md:max-w-md">
        <h2 className="text-3xl font-bold mb-2">{mensagemTitulo}</h2>
        <p className="text-gray-300 mb-4">{mensagemSubtitulo}</p>

        {/* Usamos nomeExibicao aqui para o nome bonito */}
        <p className="text-3xl font-bold uppercase tracking-widest">{jogador.nomeExibicao}</p>
        <p className="text-sm text-gray-400 mb-6">{jogador.nomeCompleto}</p>

        <div className="flex gap-4 w-full">
          <button
            onClick={handleShare}
            className="flex-1 p-3 text-lg font-bold text-white uppercase bg-green-600 rounded-lg hover:bg-green-700 transition-all"
          >
            {textoBotao}
          </button>
          <button
            onClick={onClose}
            className="flex-1 p-3 text-lg font-bold text-white uppercase bg-gray-600 rounded-lg hover:bg-gray-700 transition-all"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
