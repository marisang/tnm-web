-- =============================================
-- SISTEMA ERP - TONA MÍDIA
-- Schema SQL para Supabase
-- =============================================

-- TABELA: usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  cargo VARCHAR(100),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: clientes
CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(50),
  cpf_cnpj VARCHAR(20),
  endereco TEXT,
  cidade VARCHAR(100),
  estado VARCHAR(2),
  cep VARCHAR(10),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: fornecedores
CREATE TABLE IF NOT EXISTS fornecedores (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cnpj VARCHAR(20),
  contato VARCHAR(255),
  telefone VARCHAR(50),
  email VARCHAR(255),
  endereco TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: categorias
CREATE TABLE IF NOT EXISTS categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT
);

-- TABELA: produtos
CREATE TABLE IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  categoria_id INTEGER REFERENCES categorias(id),
  preco DECIMAL(10, 2),
  estoque INTEGER DEFAULT 0,
  fornecedor_id INTEGER REFERENCES fornecedores(id),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: vendas
CREATE TABLE IF NOT EXISTS vendas (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES clientes(id),
  data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  valor_total DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pendente',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: itens_venda
CREATE TABLE IF NOT EXISTS itens_venda (
  id SERIAL PRIMARY KEY,
  venda_id INTEGER REFERENCES vendas(id) ON DELETE CASCADE,
  produto_id INTEGER REFERENCES produtos(id),
  quantidade INTEGER NOT NULL,
  preco_unitario DECIMAL(10, 2),
  subtotal DECIMAL(10, 2)
);

-- TABELA: compras
CREATE TABLE IF NOT EXISTS compras (
  id SERIAL PRIMARY KEY,
  fornecedor_id INTEGER REFERENCES fornecedores(id),
  data_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  valor_total DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pendente',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: itens_compra
CREATE TABLE IF NOT EXISTS itens_compra (
  id SERIAL PRIMARY KEY,
  compra_id INTEGER REFERENCES compras(id) ON DELETE CASCADE,
  produto_id INTEGER REFERENCES produtos(id),
  quantidade INTEGER NOT NULL,
  preco_unitario DECIMAL(10, 2),
  subtotal DECIMAL(10, 2)
);

-- TABELA: artistas
CREATE TABLE IF NOT EXISTS artistas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  biografia TEXT,
  genero_musical VARCHAR(100),
  contato TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: data_shows
CREATE TABLE IF NOT EXISTS data_shows (
  id SERIAL PRIMARY KEY,
  nome_show VARCHAR(255),
  data_show TIMESTAMP,
  local VARCHAR(255),
  artista_id INTEGER REFERENCES artistas(id),
  publico_esperado INTEGER,
  status VARCHAR(50) DEFAULT 'planejado',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: sinopse
CREATE TABLE IF NOT EXISTS sinopse (
  id SERIAL PRIMARY KEY,
  data_show_id INTEGER REFERENCES data_shows(id) ON DELETE CASCADE,
  conteudo TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: rider
CREATE TABLE IF NOT EXISTS rider (
  id SERIAL PRIMARY KEY,
  data_show_id INTEGER REFERENCES data_shows(id) ON DELETE CASCADE,
  tecnico TEXT,
  alimentacao TEXT,
  hospedagem TEXT,
  outros TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: rider_tecnico
CREATE TABLE IF NOT EXISTS rider_tecnico (
  id SERIAL PRIMARY KEY,
  data_show_id INTEGER REFERENCES data_shows(id) ON DELETE CASCADE,
  equipamentos TEXT,
  necessidades_tecnicas TEXT,
  observacoes TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: importacoes
CREATE TABLE IF NOT EXISTS importacoes (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id),
  data_importacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tipo_arquivo VARCHAR(50),
  nome_arquivo VARCHAR(255),
  status VARCHAR(50),
  logs TEXT
);

-- TABELA: dados_importacao
CREATE TABLE IF NOT EXISTS dados_importacao (
  id SERIAL PRIMARY KEY,
  importacao_id INTEGER REFERENCES importacoes(id) ON DELETE CASCADE,
  tabela_destino VARCHAR(100),
  dados_json JSONB,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: receitas_despesas
CREATE TABLE IF NOT EXISTS receitas_despesas (
  id SERIAL PRIMARY KEY,
  tipo VARCHAR(20) CHECK (tipo IN ('receita', 'despesa')),
  descricao TEXT,
  valor DECIMAL(10, 2),
  data DATE,
  categoria VARCHAR(100),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: percentual_unit
CREATE TABLE IF NOT EXISTS percentual_unit (
  id SERIAL PRIMARY KEY,
  descricao VARCHAR(255),
  percentual DECIMAL(5, 2),
  aplicado_sobre VARCHAR(255),
  ativo BOOLEAN DEFAULT true,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: valor_revisao
CREATE TABLE IF NOT EXISTS valor_revisao (
  id SERIAL PRIMARY KEY,
  percentual_id INTEGER REFERENCES percentual_unit(id),
  valor_base DECIMAL(10, 2),
  valor_calculado DECIMAL(10, 2),
  data_calculo DATE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: fotografias
CREATE TABLE IF NOT EXISTS fotografias (
  id SERIAL PRIMARY KEY,
  data_show_id INTEGER REFERENCES data_shows(id) ON DELETE CASCADE,
  titulo VARCHAR(255),
  url_foto TEXT,
  descricao TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- ÍNDICES PARA MELHOR PERFORMANCE
-- =============================================

CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON produtos(categoria_id);
CREATE INDEX IF NOT EXISTS idx_produtos_fornecedor ON produtos(fornecedor_id);
CREATE INDEX IF NOT EXISTS idx_vendas_cliente ON vendas(cliente_id);
CREATE INDEX IF NOT EXISTS idx_vendas_data ON vendas(data_venda);
CREATE INDEX IF NOT EXISTS idx_compras_fornecedor ON compras(fornecedor_id);
CREATE INDEX IF NOT EXISTS idx_compras_data ON compras(data_compra);
CREATE INDEX IF NOT EXISTS idx_shows_artista ON data_shows(artista_id);
CREATE INDEX IF NOT EXISTS idx_shows_data ON data_shows(data_show);
CREATE INDEX IF NOT EXISTS idx_receitas_despesas_tipo ON receitas_despesas(tipo);
CREATE INDEX IF NOT EXISTS idx_receitas_despesas_data ON receitas_despesas(data);

-- =============================================
-- DADOS INICIAIS (OPCIONAL)
-- =============================================

-- Inserir categorias padrão
INSERT INTO categorias (nome, descricao) VALUES
  ('Equipamentos', 'Equipamentos de som e luz'),
  ('Alimentação', 'Itens de alimentação para eventos'),
  ('Hospedagem', 'Serviços de hospedagem'),
  ('Transporte', 'Serviços de transporte')
ON CONFLICT DO NOTHING;

-- Inserir usuário admin (ALTERE A SENHA!)
INSERT INTO usuarios (email, senha, nome, cargo) VALUES
  ('admin@tonamidia.com', 'ALTERAR_SENHA', 'Administrador', 'Admin')
ON CONFLICT DO NOTHING;

-- =============================================
-- COMENTÁRIOS NAS TABELAS
-- =============================================

COMMENT ON TABLE usuarios IS 'Usuários do sistema';
COMMENT ON TABLE clientes IS 'Cadastro de clientes';
COMMENT ON TABLE fornecedores IS 'Cadastro de fornecedores';
COMMENT ON TABLE categorias IS 'Categorias de produtos';
COMMENT ON TABLE produtos IS 'Produtos e serviços';
COMMENT ON TABLE vendas IS 'Registro de vendas';
COMMENT ON TABLE compras IS 'Registro de compras';
COMMENT ON TABLE artistas IS 'Cadastro de artistas';
COMMENT ON TABLE data_shows IS 'Agenda de shows';
COMMENT ON TABLE sinopse IS 'Sinopse dos shows';
COMMENT ON TABLE rider IS 'Rider dos artistas';
COMMENT ON TABLE rider_tecnico IS 'Especificações técnicas';
COMMENT ON TABLE receitas_despesas IS 'Controle financeiro';
COMMENT ON TABLE fotografias IS 'Galeria de fotos dos eventos';
