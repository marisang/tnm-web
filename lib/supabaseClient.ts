import { supabase } from './supabase';
import type {
  Usuario,
  Cliente,
  Fornecedor,
  Categoria,
  Produto,
  Venda,
  ItemVenda,
  Compra,
  ItemCompra,
  Artista,
  DataShow,
  Sinopse,
  Rider,
  RiderTecnico,
  Importacao,
  DadosImportacao,
  ReceitaDespesa,
  Percentual,
  ValorRevisao,
  Fotografia,
} from './supabase';

// ==================== USUÁRIOS ====================
export const getUsuarios = async () => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .order('id', { ascending: true });
  
  if (error) throw error;
  return data as Usuario[];
};

export const createUsuario = async (usuario: Omit<Usuario, 'id' | 'criado_em'>) => {
  const { data, error } = await supabase
    .from('usuarios')
    .insert([usuario])
    .select();
  
  if (error) throw error;
  return data[0] as Usuario;
};

// ==================== CLIENTES ====================
export const getClientes = async () => {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .order('nome', { ascending: true });
  
  if (error) throw error;
  return data as Cliente[];
};

export const createCliente = async (cliente: Omit<Cliente, 'id' | 'criado_em'>) => {
  const { data, error } = await supabase
    .from('clientes')
    .insert([cliente])
    .select();
  
  if (error) throw error;
  return data[0] as Cliente;
};

export const updateCliente = async (id: number, updates: Partial<Cliente>) => {
  const { data, error } = await supabase
    .from('clientes')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0] as Cliente;
};

export const deleteCliente = async (id: number) => {
  const { error } = await supabase
    .from('clientes')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// ==================== FORNECEDORES ====================
export const getFornecedores = async () => {
  const { data, error } = await supabase
    .from('fornecedores')
    .select('*')
    .order('nome', { ascending: true });
  
  if (error) throw error;
  return data as Fornecedor[];
};

export const createFornecedor = async (fornecedor: Omit<Fornecedor, 'id' | 'criado_em'>) => {
  const { data, error } = await supabase
    .from('fornecedores')
    .insert([fornecedor])
    .select();
  
  if (error) throw error;
  return data[0] as Fornecedor;
};

// ==================== CATEGORIAS ====================
export const getCategorias = async () => {
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .order('nome', { ascending: true });
  
  if (error) throw error;
  return data as Categoria[];
};

export const createCategoria = async (categoria: Omit<Categoria, 'id'>) => {
  const { data, error } = await supabase
    .from('categorias')
    .insert([categoria])
    .select();
  
  if (error) throw error;
  return data[0] as Categoria;
};

// ==================== PRODUTOS ====================
export const getProdutos = async () => {
  const { data, error } = await supabase
    .from('produtos')
    .select(`
      *,
      categoria:categorias(nome),
      fornecedor:fornecedores(nome)
    `)
    .order('nome', { ascending: true });
  
  if (error) throw error;
  return data;
};

export const createProduto = async (produto: Omit<Produto, 'id' | 'criado_em'>) => {
  const { data, error } = await supabase
    .from('produtos')
    .insert([produto])
    .select();
  
  if (error) throw error;
  return data[0] as Produto;
};

export const updateProdutoEstoque = async (id: number, quantidade: number) => {
  const { data, error } = await supabase
    .from('produtos')
    .update({ estoque: quantidade })
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0] as Produto;
};

// ==================== VENDAS ====================
export const getVendas = async () => {
  const { data, error } = await supabase
    .from('vendas')
    .select(`
      *,
      cliente:clientes(nome),
      itens_venda(
        *,
        produto:produtos(nome, preco)
      )
    `)
    .order('data_venda', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createVenda = async (venda: Omit<Venda, 'id' | 'criado_em'>) => {
  const { data, error } = await supabase
    .from('vendas')
    .insert([venda])
    .select();
  
  if (error) throw error;
  return data[0] as Venda;
};

export const createItemVenda = async (item: Omit<ItemVenda, 'id'>) => {
  const { data, error } = await supabase
    .from('itens_venda')
    .insert([item])
    .select();
  
  if (error) throw error;
  return data[0] as ItemVenda;
};

// ==================== COMPRAS ====================
export const getCompras = async () => {
  const { data, error } = await supabase
    .from('compras')
    .select(`
      *,
      fornecedor:fornecedores(nome),
      itens_compra(
        *,
        produto:produtos(nome, preco)
      )
    `)
    .order('data_compra', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createCompra = async (compra: Omit<Compra, 'id' | 'criado_em'>) => {
  const { data, error } = await supabase
    .from('compras')
    .insert([compra])
    .select();
  
  if (error) throw error;
  return data[0] as Compra;
};

export const createItemCompra = async (item: Omit<ItemCompra, 'id'>) => {
  const { data, error } = await supabase
    .from('itens_compra')
    .insert([item])
    .select();
  
  if (error) throw error;
  return data[0] as ItemCompra;
};

// ==================== ARTISTAS ====================
export const getArtistas = async () => {
  const { data, error } = await supabase
    .from('artistas')
    .select('*')
    .order('nome', { ascending: true });
  
  if (error) throw error;
  return data as Artista[];
};

export const createArtista = async (artista: Omit<Artista, 'id' | 'criado_em'>) => {
  const { data, error } = await supabase
    .from('artistas')
    .insert([artista])
    .select();
  
  if (error) throw error;
  return data[0] as Artista;
};

// ==================== SHOWS ====================
export const getShows = async () => {
  const { data, error } = await supabase
    .from('data_shows')
    .select(`
      *,
      artista:artistas(nome),
      sinopse:sinopse(conteudo),
      rider:rider(*),
      rider_tecnico:rider_tecnico(*),
      fotografias:fotografias(*)
    `)
    .order('data_show', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createShow = async (show: Omit<DataShow, 'id' | 'criado_em'>) => {
  const { data, error } = await supabase
    .from('data_shows')
    .insert([show])
    .select();
  
  if (error) throw error;
  return data[0] as DataShow;
};

export const createSinopse = async (sinopse: Omit<Sinopse, 'id' | 'criado_em'>) => {
  const { data, error } = await supabase
    .from('sinopse')
    .insert([sinopse])
    .select();
  
  if (error) throw error;
  return data[0] as Sinopse;
};

export const createRider = async (rider: Omit<Rider, 'id' | 'criado_em'>) => {
  const { data, error } = await supabase
    .from('rider')
    .insert([rider])
    .select();
  
  if (error) throw error;
  return data[0] as Rider;
};

export const createRiderTecnico = async (riderTecnico: Omit<RiderTecnico, 'id' | 'criado_em'>) => {
  const { data, error } = await supabase
    .from('rider_tecnico')
    .insert([riderTecnico])
    .select();
  
  if (error) throw error;
  return data[0] as RiderTecnico;
};

// ==================== IMPORTAÇÕES ====================
export const createImportacao = async (importacao: Omit<Importacao, 'id'>) => {
  const { data, error } = await supabase
    .from('importacoes')
    .insert([importacao])
    .select();
  
  if (error) throw error;
  return data[0] as Importacao;
};

export const createDadosImportacao = async (dados: Omit<DadosImportacao, 'id' | 'criado_em'>) => {
  const { data, error } = await supabase
    .from('dados_importacao')
    .insert([dados])
    .select();
  
  if (error) throw error;
  return data[0] as DadosImportacao;
};

// ==================== RECEITAS/DESPESAS ====================
export const getReceitasDespesas = async () => {
  const { data, error } = await supabase
    .from('receitas_despesas')
    .select('*')
    .order('data', { ascending: false });
  
  if (error) throw error;
  return data as ReceitaDespesa[];
};

export const createReceitaDespesa = async (item: Omit<ReceitaDespesa, 'id' | 'criado_em'>) => {
  const { data, error } = await supabase
    .from('receitas_despesas')
    .insert([item])
    .select();
  
  if (error) throw error;
  return data[0] as ReceitaDespesa;
};

// ==================== PERCENTUAIS ====================
export const getPercentuais = async () => {
  const { data, error } = await supabase
    .from('percentual_unit')
    .select('*')
    .eq('ativo', true);
  
  if (error) throw error;
  return data as Percentual[];
};

export const createPercentual = async (percentual: Omit<Percentual, 'id' | 'criado_em'>) => {
  const { data, error } = await supabase
    .from('percentual_unit')
    .insert([percentual])
    .select();
  
  if (error) throw error;
  return data[0] as Percentual;
};

export const createValorRevisao = async (revisao: Omit<ValorRevisao, 'id' | 'criado_em'>) => {
  const { data, error } = await supabase
    .from('valor_revisao')
    .insert([revisao])
    .select();
  
  if (error) throw error;
  return data[0] as ValorRevisao;
};

// ==================== FOTOGRAFIAS ====================
export const createFotografia = async (foto: Omit<Fotografia, 'id' | 'criado_em'>) => {
  const { data, error } = await supabase
    .from('fotografias')
    .insert([foto])
    .select();
  
  if (error) throw error;
  return data[0] as Fotografia;
};
