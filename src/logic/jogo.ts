// src/logic/jogo.ts (Versão Final Limpa)
import type { Jogador, ResultadoLetra } from '../types';

export function selecionarJogadorDoDia(listaDeJogadores: Jogador[]): Jogador {
  // Filtra a lista para garantir que só temos jogadores válidos. (Mantemos isso por segurança)
  const jogadoresValidos = listaDeJogadores.filter((j) => j && j.nomeJogo);

  if (jogadoresValidos.length === 0) {
    console.error('ERRO: Nenhum jogador válido foi encontrado em jogadores.json.');
    // Retorna um jogador "fantasma" para não quebrar a aplicação
    return {
      id: 0,
      nomeExibicao: 'ERRO',
      nomeJogo: 'ERRO',
      nomeCompleto: 'Verifique o console',
      nacionalidade: '',
      fotoUrl: '',
      clubes: [],
      numeroCamisa: 0,
    };
  }

  // --- Lógica do Modo Dev (Mantemos os avisos úteis) ---
  const urlParams = new URLSearchParams(window.location.search);
  const devJogadorNome = urlParams.get('dev');

  if (devJogadorNome) {
    const nomeBusca = devJogadorNome.toUpperCase().trim();
    const jogadorEncontrado = jogadoresValidos.find((j) => j.nomeJogo.toUpperCase() === nomeBusca);

    if (jogadorEncontrado) {
      console.warn(`MODO DEV ATIVO: Forçando jogador "${jogadorEncontrado.nomeExibicao}"`);
      return jogadorEncontrado;
    } else {
      console.warn(`MODO DEV: Jogador "${nomeBusca}" não encontrado. Usando jogador do dia.`);
    }
  }

  // --- Lógica Normal da Data ---
  const hoje = new Date();
  const dataInicio = new Date(hoje.getFullYear(), 0, 1);
  const diffTime = Math.abs(hoje.getTime() - dataInicio.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const indiceDoDia = diffDays % jogadoresValidos.length;
  return jogadoresValidos[indiceDoDia];
}

// A função compararPalpite (não precisa de mudanças)
export function compararPalpite(palpite: string, resposta: string): ResultadoLetra[] {
  const respostaSemEspacos = resposta.replace(/ /g, '');
  const palpiteArray = palpite.toUpperCase().split('');
  const respostaArray = respostaSemEspacos.toUpperCase().split('');
  const resultadoTemp: (ResultadoLetra | undefined)[] = new Array(respostaArray.length);

  // Primeiro passo: verdes
  for (let i = 0; i < palpiteArray.length; i++) {
    if (palpiteArray[i] === respostaArray[i]) {
      resultadoTemp[i] = { letra: palpiteArray[i], status: 'correto' };
      respostaArray[i] = '';
    }
  }

  // Segundo passo: amarelos
  for (let i = 0; i < palpiteArray.length; i++) {
    if (resultadoTemp[i]) continue;
    const indexNaResposta = respostaArray.indexOf(palpiteArray[i]);
    if (indexNaResposta !== -1) {
      resultadoTemp[i] = { letra: palpiteArray[i], status: 'presente' };
      respostaArray[indexNaResposta] = '';
    } else {
      resultadoTemp[i] = { letra: palpiteArray[i], status: 'ausente' };
    }
  }

  return resultadoTemp as ResultadoLetra[];
}
