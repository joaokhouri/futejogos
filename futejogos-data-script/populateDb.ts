// futejogos-data-script/populateDb.ts (Versão Definitiva)
import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';

// --- CONFIGURAÇÃO ---
// Cole suas credenciais do Supabase aqui
const SUPABASE_URL = 'https://nnfmxmebcppchevvyrvz.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uZm14bWViY3BwY2hldnZ5cnZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MDMyMzEsImV4cCI6MjA3NDQ3OTIzMX0.Y3j5Y3d6QVgbMBSaFO9-HDZCzG_ay0Q7OgdRFrtupa4';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Tipagem para os arquivos JSON (espelhando a estrutura dos nossos arquivos)
type ClubeJson = {
  nome: string;
  pais: string;
  tipo: 'Clube' | 'Seleção';
  cor_primaria: string;
  cor_secundaria: string;
};

type PassagemJson = {
  clube: string;
  inicio: number;
  fim: number | null;
};

type JogadorJson = {
  id: number;
  nomeExibicao: string;
  nomeJogo: string;
  nomeCompleto: string;
  apelido?: string;
  nacionalidade: string;
  data_nascimento?: string;
  posicoes_gerais: string[];
  posicoes_especificas: string[];
  numero_camisa_iconica: number | null;
  numeros_camisa: number[];
  passagens: PassagemJson[];
};

async function popularBancoDeDados() {
  console.log('Iniciando a população COMPLETA e DEFINITIVA do banco de dados...');

  try {
    // 1. LER DADOS DOS ARQUIVOS JSON
    console.log('Lendo arquivos JSON locais...');
    const clubesParaAdicionar: ClubeJson[] = JSON.parse(
      await fs.readFile('../public/clubes.json', 'utf-8')
    );
    const jogadoresParaAdicionar: JogadorJson[] = JSON.parse(
      await fs.readFile('../public/jogadores.json', 'utf-8')
    );
    console.log(
      `Encontrados ${clubesParaAdicionar.length} clubes e ${jogadoresParaAdicionar.length} jogadores nos arquivos.`
    );

    // 2. LIMPAR TABELAS NA ORDEM CORRETA (PARA EVITAR ERROS DE CHAVE ESTRANGEIRA)
    console.log('\nLimpando tabelas existentes para garantir uma base limpa...');
    await supabase.from('passagens_por_clubes').delete().neq('id', 0);
    await supabase.from('jogadores').delete().neq('id', 0);
    await supabase.from('clubes').delete().neq('id', 0);
    console.log('Tabelas limpas com sucesso.');

    // 3. INSERIR CLUBES
    console.log('\nInserindo clubes...');
    const { data: clubesInseridos, error: errorClubes } = await supabase
      .from('clubes')
      .insert(clubesParaAdicionar)
      .select();
    if (errorClubes) throw errorClubes;
    const clubesMap = new Map(clubesInseridos.map((c) => [c.nome, c.id]));
    console.log(`${clubesInseridos.length} clubes inseridos.`);

    // 4. INSERIR JOGADORES
    console.log('\nInserindo jogadores...');
    const jogadoresFormatados = jogadoresParaAdicionar.map((j) => ({
      id: j.id,
      nome_exibicao: j.nomeExibicao,
      nome_jogo: j.nomeJogo,
      nome_completo: j.nomeCompleto,
      apelido: j.apelido,
      nacionalidade: j.nacionalidade,
      data_nascimento: j.data_nascimento,
      posicoes_gerais: j.posicoes_gerais,
      posicoes_especificas: j.posicoes_especificas,
      numero_camisa_iconica: j.numero_camisa_iconica,
      numeros_camisa: j.numeros_camisa,
    }));
    const { data: jogadoresInseridos, error: errorJogadores } = await supabase
      .from('jogadores')
      .insert(jogadoresFormatados)
      .select();
    if (errorJogadores) throw errorJogadores;
    const jogadoresMap = new Map(jogadoresInseridos.map((j) => [j.id, j.id]));
    console.log(`${jogadoresInseridos.length} jogadores inseridos.`);

    // 5. INSERIR PASSAGENS POR CLUBES (CRIANDO AS RELAÇÕES)
    console.log('\nInserindo o histórico de carreira dos jogadores...');
    const passagensFormatadas = jogadoresParaAdicionar
      .flatMap((j) =>
        j.passagens.map((p) => {
          const jogadorId = jogadoresMap.get(j.id);
          const clubeId = clubesMap.get(p.clube);
          if (!jogadorId || !clubeId) {
            console.warn(
              `Aviso: Não foi possível criar a passagem para "${j.nomeExibicao}" no clube "${p.clube}". Verifique se o nome do clube está correto no JSON.`
            );
            return null;
          }
          return {
            jogador_id: jogadorId,
            clube_id: clubeId,
            ano_inicio: p.inicio,
            ano_fim: p.fim,
          };
        })
      )
      .filter(Boolean); // Remove as entradas nulas se algum clube não for encontrado

    const { error: errorPassagens } = await supabase
      .from('passagens_por_clubes')
      .insert(passagensFormatadas);
    if (errorPassagens) throw errorPassagens;
    console.log(`${passagensFormatadas.length} passagens de carreira inseridas.`);

    console.log('\n✅ População completa do banco de dados concluída com sucesso!');
  } catch (error) {
    console.error('\n❌ Ocorreu um erro durante a população:', error);
  }
}

popularBancoDeDados();
