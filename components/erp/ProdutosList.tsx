'use client';

import { useEffect, useState } from 'react';
import { getProdutos, getCategorias, getFornecedores, createProduto } from '@/lib/supabaseClient';
import type { Categoria, Fornecedor } from '@/lib/supabase';

export default function ProdutosList() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    categoria_id: '',
    preco: '',
    estoque: '',
    fornecedor_id: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [produtosData, categoriasData, fornecedoresData] = await Promise.all([
        getProdutos(),
        getCategorias(),
        getFornecedores(),
      ]);
      setProdutos(produtosData);
      setCategorias(categoriasData);
      setFornecedores(fornecedoresData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      alert('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduto({
        nome: formData.nome,
        descricao: formData.descricao,
        categoria_id: formData.categoria_id ? parseInt(formData.categoria_id) : undefined,
        preco: formData.preco ? parseFloat(formData.preco) : undefined,
        estoque: formData.estoque ? parseInt(formData.estoque) : undefined,
        fornecedor_id: formData.fornecedor_id ? parseInt(formData.fornecedor_id) : undefined,
      });
      alert('Produto criado com sucesso!');
      resetForm();
      loadData();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar produto');
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      descricao: '',
      categoria_id: '',
      preco: '',
      estoque: '',
      fornecedor_id: '',
    });
    setShowForm(false);
  };

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Produtos</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          {showForm ? 'Cancelar' : 'Novo Produto'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome *
              </label>
              <input
                type="text"
                required
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.preco}
                onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={formData.categoria_id}
                onChange={(e) => setFormData({ ...formData, categoria_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estoque
              </label>
              <input
                type="number"
                value={formData.estoque}
                onChange={(e) => setFormData({ ...formData, estoque: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fornecedor
              </label>
              <select
                value={formData.fornecedor_id}
                onChange={(e) => setFormData({ ...formData, fornecedor_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">Selecione um fornecedor</option>
                {fornecedores.map((forn) => (
                  <option key={forn.id} value={forn.id}>
                    {forn.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nome</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Categoria</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Preço</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Estoque</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fornecedor</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-800">{produto.nome}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {produto.categoria?.nome || '-'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {produto.preco ? `R$ ${produto.preco.toFixed(2)}` : '-'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      (produto.estoque || 0) > 10
                        ? 'bg-green-100 text-green-800'
                        : (produto.estoque || 0) > 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {produto.estoque || 0}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {produto.fornecedor?.nome || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {produtos.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            Nenhum produto cadastrado ainda.
          </p>
        )}
      </div>
    </div>
  );
}
