// src/logic/share.ts
import type { ResultadoLetra } from '../types';

const EMOJI_MAP = {
  correto: '🟩',
  presente: '🟨',
  ausente: '⬛',
};

// A função de gerar o texto continua a mesma
export function gerarTextoDeCompartilhamento(
  palpites: (ResultadoLetra[] | null)[],
  tentativaFinal: number,
  nomeJogo: string
): string {
  const diaDoAno = Math.floor(
    (new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  let texto = `Joguei Craque Secreto #${diaDoAno} - ${nomeJogo}\n`;
  texto += `Resultado: ${tentativaFinal}/6\n\n`;

  for (let i = 0; i < tentativaFinal; i++) {
    const palpite = palpites[i];
    if (palpite) {
      const linhaDeEmojis = palpite.map((letra) => EMOJI_MAP[letra.status] || '⬛').join('');
      texto += `${linhaDeEmojis}\n`;
    }
  }

  texto += `\n${window.location.origin}`; // Link principal do site
  return texto;
}

// A NOVA FUNÇÃO INTELIGENTE
export async function iniciarCompartilhamento(
  texto: string
): Promise<{ sucesso: boolean; metodo: 'share' | 'copy' }> {
  // VERIFICA SE A API DE COMPARTILHAMENTO NATIVA EXISTE
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'FuteJogos - Craque Secreto',
        text: texto,
      });
      return { sucesso: true, metodo: 'share' }; // Sucesso usando o compartilhamento nativo
    } catch (err) {
      console.error('Erro ao usar a API de Compartilhamento:', err);
      return { sucesso: false, metodo: 'share' }; // Falha
    }
  } else {
    // SE NÃO EXISTIR, VOLTA PARA O MÉTODO DE COPIAR
    try {
      await navigator.clipboard.writeText(texto);
      return { sucesso: true, metodo: 'copy' }; // Sucesso usando a cópia
    } catch (err) {
      console.error('Falha ao copiar texto: ', err);
      return { sucesso: false, metodo: 'copy' }; // Falha
    }
  }
}
