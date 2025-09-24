import { useState, useEffect, useCallback } from 'react';
import Grid from '../components/Grid';
import Teclado from '../components/Teclado';
import Modal from '../components/Modal';
import ModalInstrucoes from '../components/ModalInstrucoes';
import { selecionarJogadorDoDia, compararPalpite } from '../logic/jogo.ts';
import { salvarEstado, carregarEstado } from '../logic/storage.ts';
import type { Jogador, ResultadoLetra, EstadoSalvo } from '../types';
import { carregarEstatisticas, salvarEstatisticas } from '../logic/storage.ts';

const NUMERO_TENTATIVAS = 6;

export default function TermoPage() {
  const [respostaDoDia, setRespostaDoDia] = useState<Jogador | null>(null);
  const [mostrarInstrucoes, setMostrarInstrucoes] = useState<boolean>(false);
  const [palpites, setPalpites] = useState<(ResultadoLetra[] | null)[]>(
    Array(NUMERO_TENTATIVAS).fill(null)
  );
  const [palpiteAtual, setPalpiteAtual] = useState<string>('');
  const [tentativaAtual, setTentativaAtual] = useState<number>(0);
  const [letrasUsadas, setLetrasUsadas] = useState<{ [key: string]: string }>({});
  const [statusJogo, setStatusJogo] = useState<'jogando' | 'vitoria' | 'derrota'>('jogando');
  const [modalEstaAberto, setModalEstaAberto] = useState<boolean>(false);
  const [linhaAnimando, setLinhaAnimando] = useState<number | null>(null);
  const [linhaInvalida, setLinhaInvalida] = useState<boolean>(false);

  useEffect(() => {
    const jaViuInstrucoes = localStorage.getItem('futejogos-instrucoes-vistas');
    if (!jaViuInstrucoes) {
      setMostrarInstrucoes(true);
    }
    const estadoSalvo = carregarEstado();
    const hojeString = new Date().toISOString().split('T')[0];

    if (estadoSalvo && estadoSalvo.data === hojeString) {
      setRespostaDoDia(estadoSalvo.resposta);
      setPalpites(estadoSalvo.palpites);
      setTentativaAtual(estadoSalvo.tentativaAtual);
      setStatusJogo(estadoSalvo.status);
      setLetrasUsadas(estadoSalvo.letrasUsadas || {});
      if (estadoSalvo.status !== 'jogando') {
        setModalEstaAberto(true);
      }
    } else {
      fetch('/jogadores.json')
        .then((response) => {
          // --- PONTO DE DEBUG 1: A RESPOSTA DA REDE ---

          if (!response.ok) {
            throw new Error(`Erro de rede ao buscar jogadores.json: ${response.statusText}`);
          }
          return response.json();
        })
        .then((jogadores: Jogador[]) => {
          // --- PONTO DE DEBUG 2: OS DADOS DO JSON ---

          const jogadorDoDia = selecionarJogadorDoDia(jogadores);
          setRespostaDoDia(jogadorDoDia);
        });
    }
  }, []);

  function handleCloseInstrucoes() {
    localStorage.setItem('futejogos-instrucoes-vistas', 'true');
    setMostrarInstrucoes(false);
  }

  useEffect(() => {
    // Não salva nada se o jogo ainda não começou
    if (!respostaDoDia || (statusJogo === 'jogando' && tentativaAtual === 0)) {
      return;
    }
    const estadoParaSalvar: EstadoSalvo = {
      data: new Date().toISOString().split('T')[0],
      resposta: respostaDoDia,
      palpites,
      tentativaAtual,
      status: statusJogo,
      letrasUsadas,
    };
    salvarEstado(estadoParaSalvar);
  }, [palpites, statusJogo, respostaDoDia, tentativaAtual, letrasUsadas]); // Roda sempre que os palpites ou o status do jogo mudam

  const submeterPalpite = useCallback(() => {
    const nomeParaJogo = respostaDoDia?.nomeJogo;
    if (
      !nomeParaJogo ||
      palpiteAtual.length !== nomeParaJogo.length ||
      tentativaAtual >= NUMERO_TENTATIVAS ||
      statusJogo !== 'jogando'
    ) {
      setLinhaInvalida(true);
      setTimeout(() => setLinhaInvalida(false), 600);
      return;
    }

    const resultado = compararPalpite(palpiteAtual, nomeParaJogo);
    if (!resultado) return;

    // Atualiza o estado dos palpites IMEDIATAMENTE.
    // A transição no CSS do Grid vai animar a mudança de cor.
    const novosPalpites = [...palpites];
    novosPalpites[tentativaAtual] = resultado;
    setPalpites(novosPalpites);

    // Atualiza o teclado
    const novoStatusLetras = { ...letrasUsadas };
    resultado.forEach(({ letra, status }) => {
      const statusAtual = novoStatusLetras[letra];
      if (statusAtual === 'correto') return;
      if (status === 'correto' || (status === 'presente' && statusAtual !== 'correto')) {
        novoStatusLetras[letra] = status;
        return;
      }
      if (!statusAtual) {
        novoStatusLetras[letra] = status;
      }
    });
    setLetrasUsadas(novoStatusLetras);

    // Avança a tentativa e limpa o input
    setTentativaAtual((prev) => prev + 1);
    setPalpiteAtual('');

    const estatsAtuais = carregarEstatisticas();
    // Checa a vitória/derrota
    if (palpiteAtual === nomeParaJogo) {
      setTimeout(() => {
        setStatusJogo('vitoria');
        setModalEstaAberto(true);
        salvarEstatisticas({ ...estatsAtuais, vitorias: estatsAtuais.vitorias + 1 });
      }, 500); // Pequeno atraso para o usuário ver o resultado
    } else if (tentativaAtual + 1 === NUMERO_TENTATIVAS) {
      setTimeout(() => {
        setStatusJogo('derrota');
        setModalEstaAberto(true);
        salvarEstatisticas({ ...estatsAtuais, derrotas: estatsAtuais.derrotas + 1 });
      }, 500);
    }
  }, [palpiteAtual, respostaDoDia, tentativaAtual, palpites, letrasUsadas, statusJogo]);

  const handleKeyPress = useCallback(
    (letra: string) => {
      if (letra === 'ENTER') {
        submeterPalpite();
        return;
      }
      if (letra === '⌫' || letra === 'BACKSPACE') {
        setPalpiteAtual((prev) => prev.slice(0, -1));
        return;
      }
      const tamanhoValido = respostaDoDia?.nomeJogo.replace(/ /g, '').length || 0;
      if (tamanhoValido > 0 && palpiteAtual.length < tamanhoValido && /^[A-Z]$/.test(letra)) {
        setPalpiteAtual((prev) => prev + letra);
      }
      if (statusJogo !== 'jogando') return; // TRAVA O TECLADO
    },
    [palpiteAtual, respostaDoDia, submeterPalpite, statusJogo]
  );

  function handleCloseModal() {
    setModalEstaAberto(false); // APENAS FECHA O MODAL
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      handleKeyPress(event.key.toUpperCase());
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  return (
    <>
      {mostrarInstrucoes && <ModalInstrucoes onClose={handleCloseInstrucoes} />}
      {modalEstaAberto && respostaDoDia && statusJogo !== 'jogando' && (
        <Modal
          status={statusJogo} // Agora o TypeScript tem 100% de certeza que o tipo é compatível
          jogador={respostaDoDia}
          tentativas={tentativaAtual}
          onClose={handleCloseModal}
          palpites={palpites}
        />
      )}

      <div className="w-full flex-grow flex items-end justify-center mt-4">
        <Grid
          palpites={palpites}
          palpiteAtual={palpiteAtual}
          tentativaAtual={tentativaAtual}
          respostaDoDia={respostaDoDia}
          statusJogo={statusJogo}
          linhaAnimando={linhaAnimando}
          linhaInvalida={linhaInvalida}
        />
      </div>
      <div className="w-full mt-18">
        <Teclado onKeyPress={handleKeyPress} letrasUsadas={letrasUsadas} statusJogo={statusJogo} />
      </div>
      <div className="text-center text-sm text-gray-400 mt-4 p-4 border-t border-gray-700">
        <p>Acerte o nome do jogador secreto. As cores indicam o quão perto você está.</p>
      </div>
    </>
  );
}
