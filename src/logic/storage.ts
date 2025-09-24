// src/logic/storage.ts
import type { EstadoSalvo, Estatisticas } from '../types';

const CHAVE_STORAGE = 'futejogos-termo-estado';
const CHAVE_STORAGE_ESTADO = 'futejogos-termo-estado';
const CHAVE_STORAGE_ESTATS = 'futejogos-termo-estats';

// Salva o estado do jogo no localStorage
export function salvarEstado(estado: EstadoSalvo): void {
  const estadoString = JSON.stringify(estado);
  localStorage.setItem(CHAVE_STORAGE, estadoString);
}

// Carrega o estado do jogo do localStorage
export function carregarEstado(): EstadoSalvo | null {
  const estadoString = localStorage.getItem(CHAVE_STORAGE);
  if (estadoString) {
    return JSON.parse(estadoString) as EstadoSalvo;
  }
  return null;
}

// Carrega as estatísticas
export function carregarEstatisticas(): Estatisticas {
  const estatsString = localStorage.getItem(CHAVE_STORAGE_ESTATS);
  if (estatsString) {
    return JSON.parse(estatsString);
  }
  // Se não houver nada salvo, retorna um placar zerado
  return { vitorias: 0, derrotas: 0 };
}

// Salva as estatísticas
export function salvarEstatisticas(estats: Estatisticas): void {
  localStorage.setItem(CHAVE_STORAGE_ESTATS, JSON.stringify(estats));
}
