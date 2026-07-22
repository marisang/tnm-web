import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Usuario {
  id: number;
  email: string;
  senha: string;
  nome: string;
  cargo?: string;
  criado_em?: string;
}

export interface Cliente {
  id: number;
  nome: string;
  email?: string;
  telefone?: string;
  cpf_cnpj?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  criado_em?: string;
}

export interface Fornecedor {
  id: number;
  nome: string;
  cnpj?: string;
  contato?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  criado_em?: string;
}

export interface Categoria {
  id: number;
  nome: string;
  descricao?: string;
}

export interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  categoria_id?: number;
  preco?: number;
  estoque?: number;
  fornecedor_id?: number;
  criado_em?: string;
}

export interface Venda {
  id: number;
  cliente_id?: number;
  data_venda?: string;
  valor_total?: number;
  status?: string;
  criado_em?: string;
}

export interface ItemVenda {
  id: number;
  venda_id?: number;
  produto_id?: number;
  quantidade?: number;
  preco_unitario?: number;
  subtotal?: number;
}

export interface Compra {
  id: number;
  fornecedor_id?: number;
  data_compra?: string;
  valor_total?: number;
  status?: string;
  criado_em?: string;
}

export interface ItemCompra {
  id: number;
  compra_id?: number;
  produto_id?: number;
  quantidade?: number;
  preco_unitario?: number;
  subtotal?: number;
}

export interface Artista {
  id: number;
  nome: string;
  biografia?: string;
  genero_musical?: string;
  contato?: string;
  criado_em?: string;
}

export interface DataShow {
  id: number;
  nome_show?: string;
  data_show?: string;
  local?: string;
  artista_id?: number;
  publico_esperado?: number;
  status?: string;
  criado_em?: string;
}

export interface Sinopse {
  id: number;
  data_show_id?: number;
  conteudo?: string;
  criado_em?: string;
}

export interface Rider {
  id: number;
  data_show_id?: number;
  tecnico?: string;
  alimentacao?: string;
  hospedagem?: string;
  outros?: string;
  criado_em?: string;
}

export interface RiderTecnico {
  id: number;
  data_show_id?: number;
  equipamentos?: string;
  necessidades_tecnicas?: string;
  observacoes?: string;
  criado_em?: string;
}

export interface Importacao {
  id: number;
  usuario_id?: number;
  data_importacao?: string;
  tipo_arquivo?: string;
  nome_arquivo?: string;
  status?: string;
  logs?: string;
}

export interface DadosImportacao {
  id: number;
  importacao_id?: number;
  tabela_destino?: string;
  dados_json?: any;
  criado_em?: string;
}

export interface ReceitaDespesa {
  id: number;
  tipo?: 'receita' | 'despesa';
  descricao?: string;
  valor?: number;
  data?: string;
  categoria?: string;
  criado_em?: string;
}

export interface Percentual {
  id: number;
  descricao?: string;
  percentual?: number;
  aplicado_sobre?: string;
  ativo?: boolean;
  criado_em?: string;
}

export interface ValorRevisao {
  id: number;
  percentual_id?: number;
  valor_base?: number;
  valor_calculado?: number;
  data_calculo?: string;
  criado_em?: string;
}

export interface Fotografia {
  id: number;
  data_show_id?: number;
  titulo?: string;
  url_foto?: string;
  descricao?: string;
  criado_em?: string;
}
