// futejogos-data-script/generateImages.ts (Versão Supabase)
import { createCanvas } from 'canvas';
import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURAÇÃO ---
// Cole suas credenciais do Supabase aqui
const SUPABASE_URL = 'https://nnfmxmebcppchevvyrvz.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uZm14bWViY3BwY2hldnZ5cnZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MDMyMzEsImV4cCI6MjA3NDQ3OTIzMX0.Y3j5Y3d6QVgbMBSaFO9-HDZCzG_ay0Q7OgdRFrtupa4';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Caminho para salvar as imagens geradas (relativo à raiz do projeto React)
const OUTPUT_DIR = './public/jogadores';

// --- O SCRIPT ---
async function gerarImagensDeCamisa() {
  console.log('Iniciando a fábrica de camisas a partir do Supabase...');

  try {
    // 1. Buscar todos os clubes do banco de dados
    const { data: clubes, error: errorClubes } = await supabase.from('clubes').select('*');
    if (errorClubes) throw errorClubes;
    if (!clubes) throw new Error('Nenhum clube encontrado no banco de dados.');

    // Cria um "mapa" para acesso rápido às cores dos clubes
    const clubesMap = new Map(
      clubes.map((c) => [c.id, { primaria: c.cor_primaria, secundaria: c.cor_secundaria }])
    );
    console.log(`${clubes.length} clubes carregados.`);

    // 2. Buscar todos os jogadores do banco de dados
    const { data: jogadores, error: errorJogadores } = await supabase
      .from('jogadores')
      .select('id, numero_camisa_iconica, clube_iconico_id');
    if (errorJogadores) throw errorJogadores;
    if (!jogadores || jogadores.length === 0) {
      console.warn('Nenhum jogador encontrado no banco de dados para gerar imagens.');
      return;
    }
    console.log(`${jogadores.length} jogadores carregados.`);

    // 3. Garante que a pasta de saída exista
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    let countGeradas = 0;

    // 4. Passa por cada jogador para criar uma imagem
    for (const jogador of jogadores) {
      const numeroCamisa = jogador.numero_camisa_iconica?.toString() || '?';
      const fileName = `${jogador.id}.png`;
      const filePath = path.join(OUTPUT_DIR, fileName);

      const coresDoClube = clubesMap.get(jogador.clube_iconico_id);

      const corPrimaria = coresDoClube?.primaria || '#1F2937'; // Cor padrão (cinza)
      const corSecundaria = coresDoClube?.secundaria || '#D1D5DB'; // Cor padrão (cinza claro)

      // Cria a "tela" da imagem
      const width = 256;
      const height = 256;
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');

      // --- A Arte da Camisa (usando as cores do DB) ---
      ctx.fillStyle = '#0E111C';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = corPrimaria;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width, 0);
      ctx.lineTo(width, height);
      ctx.lineTo(width * 0.55, height * 0.9);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = corSecundaria;
      ctx.beginPath();
      ctx.moveTo(width * 0.7, 0);
      ctx.lineTo(width, height * 0.3);
      ctx.lineTo(width, height * 0.6);
      ctx.lineTo(width * 0.7, height * 0.4);
      ctx.closePath();
      ctx.fill();

      ctx.font = 'bold 100px Poppins, sans-serif';
      ctx.fillStyle = corSecundaria;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(numeroCamisa, width / 2, height / 2);

      // 5. Salva a imagem como um arquivo .png
      const buffer = canvas.toBuffer('image/png');
      await fs.writeFile(filePath, buffer);
      countGeradas++;
    }

    console.log(
      `\nFábrica finalizada! ${countGeradas} imagens de camisas geradas em ${OUTPUT_DIR}`
    );
  } catch (error) {
    console.error('Ocorreu um erro na fábrica de camisas:', error);
  }
}

gerarImagensDeCamisa();
