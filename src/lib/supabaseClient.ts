// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nnfmxmebcppchevvyrvz.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uZm14bWViY3BwY2hldnZ5cnZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MDMyMzEsImV4cCI6MjA3NDQ3OTIzMX0.Y3j5Y3d6QVgbMBSaFO9-HDZCzG_ay0Q7OgdRFrtupa4';

// Cria e exporta uma única instância do cliente Supabase para ser usada em todo o app
export const supabase = createClient(supabaseUrl, supabaseKey);
