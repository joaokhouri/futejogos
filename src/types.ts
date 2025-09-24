// src/types.ts

export type Jogador = {
  id: number;
  nomeExibicao: string;
  nomeJogo: string; // O nome para a lógica do jogo
  nomeCompleto: string;
  nacionalidade: string;
  fotoUrl: string;
  clubes: string[];
  numeroCamisa: number | null;
};

export type ResultadoLetra = {
  letra: string;
  status: 'correto' | 'presente' | 'ausente';
};

export interface ModalProps {
  status: 'vitoria' | 'derrota';
  jogador: Jogador;
  tentativas: number;
  palpites: (ResultadoLetra[] | null)[];
  onClose: () => void; // Uma função para fechar o modal
}

export interface GridProps {
  palpites: (ResultadoLetra[] | null)[];
  palpiteAtual: string;
  tentativaAtual: number;
  // MUDANÇA: O Grid agora recebe o objeto do jogador para ser inteligente
  respostaDoDia: Jogador | null;
  statusJogo: 'jogando' | 'vitoria' | 'derrota';
  linhaInvalida: boolean;
  linhaAnimando: number | null; // << ADICIONE ESTA LINHA
}

export interface TecladoProps {
  onKeyPress: (letra: string) => void;
  letrasUsadas: { [key: string]: string };
  statusJogo: 'jogando' | 'vitoria' | 'derrota';
}

export interface EstadoSalvo {
  data: string; // A data no formato 'AAAA-MM-DD'
  resposta: Jogador;
  palpites: (ResultadoLetra[] | null)[];
  tentativaAtual: number;
  status: 'jogando' | 'vitoria' | 'derrota';
  letrasUsadas: { [key: string]: string };
}

export interface Estatisticas {
  vitorias: number;
  derrotas: number;
}
