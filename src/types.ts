// src/types.ts

export type Passagem = {
  clube: string;
  inicio: number;
  fim: number | null; // Nulo se o jogador ainda estiver no clube
};

export type Jogador = {
  id: number;
  nomeExibicao: string; // Ex: "Ronaldinho"
  nomeJogo: string; // Ex: "RONALDINHO"
  nomeCompleto: string; // Ex: "Ronaldo de Assis Moreira"
  apelido?: string; // Opcional, ex: "Bruxo"
  nacionalidade: string; // Ex: "Brasil"
  data_nascimento?: string; // Opcional, ex: "1980-03-21"
  posicoes_gerais: string[]; // MACRO, ex: ["Meio-campista", "Atacante"]
  posicoes_especificas: string[]; // MICRO, ex: ["Meia Armador", "Ponta Esquerda"]
  numero_camisa_iconica: number | null; // O número principal, ex: 10
  numeros_camisa: number[]; // Todos os números que já usou, ex: [10, 49, 80]
  clubeAtual: string; // O clube mais recente ou icônico para a camisa
  passagens: Passagem[]; // O histórico completo de carreira
  fotoUrl: string;
};

// Descreve a estrutura de um clube
export type Clube = {
  nome: string;
  pais: string;
  // Mantemos este objeto para o JSON, o script vai separar
  cor_primaria: string;
  cor_secundaria: string;
  tipo: 'Clube' | 'Seleção'; // Adicionamos o novo campo
  // logoUrl foi removido
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
