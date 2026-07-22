'use client';

import { useEffect, useState } from 'react';
import { getReceitasDespesas, createReceitaDespesa } from '@/lib/supabaseClient';
import type { ReceitaDespesa } from '@/lib/supabase';

export default function FinanceiroPanel() {
  const [items, setItems] = useState<ReceitaDespesa[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tipo: 'receita' as 'receita' | 'despesa',
    descricao: '',
    valor: '',
    data: '',
    categoria: '',
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await getReceitasDespesas();
      setItems(data);
    } catch (error) {
      console.error('Erro ao carregar dados financeiros:', error);
      alert('Erro ao carregar dados financeiros');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReceitaDespesa({
        tipo: formData.tipo,
        descricao: formData.descricao,
        valor: parseFloat(formData.valor),
        data: formData.data,
        categoria: formData.categoria,
      });
      alert('Item criado com sucesso!');
      resetForm();
      loadItems();
    } catch (error) {
      console.error('Erro ao salvar item:', error);
      alert('Erro ao salvar item');
    }
  };

  const resetForm = () => {
    setFormData({
      tipo: 'receita',
      descricao: '',
      valor: '',
      data: '',
      categoria: '',
    });
    setShowForm(false);
  };

  const calcularTotais = () => {
    const receitas = items
      .filter((item) => item.tipo === 'receita')
      .reduce((acc, item) => acc + (item.valor || 0), 0);

    const despesas = items
      .filter((item) => item.tipo === 'despesa')
      .reduce((acc, item) => acc + (item.valor || 0), 0);

    const saldo = receitas - despesas;

    return { receitas, despesas, saldo };
  };

  const totais = calcularTotais();

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Receitas</p>
              <p className="text-3xl font-bold text-green-700 mt-2">
                R$ {totais.receitas.toFixed(2)}
              </p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Despesas</p>
              <p className="text-3xl font-bold text-red-700 mt-2">
                R$ {totais.despesas.toFixed(2)}
              </p>
            </div>
            <div className="text-4xl">💸</div>
          </div>
        </div>

        <div className={`rounded-lg p-6 border-2 ${
          totais.saldo >= 0
            ? 'bg-blue-50 border-blue-200'
            : 'bg-orange-50 border-orange-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                totais.saldo >= 0 ? 'text-blue-600' : 'text-orange-600'
              }`}>
                Saldo
              </p>
              <p className={`text-3xl font-bold mt-2 ${
                totais.saldo >= 0 ? 'text-blue-700' : 'text-orange-700'
              }`}>
                R$ {totais.saldo.toFixed(2)}
              </p>
            </div>
            <div className="text-4xl">
              {totais.saldo >= 0 ? '📈' : '📉'}
            </div>
          </div>
        </div>
      </div>

      {/* Formulário e Lista */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Lançamentos Financeiros</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {showForm ? 'Cancelar' : 'Novo Lançamento'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo *
                </label>
                <select
                  required
                  value={formData.tipo}
                  onChange={(e) =>
                    setFormData({ ...formData, tipo: e.target.value as 'receita' | 'despesa' })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="receita">Receita</option>
                  <option value="despesa">Despesa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.valor}
                  onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data *
                </label>
                <input
                  type="date"
                  required
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <input
                  type="text"
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição *
                </label>
                <textarea
                  required
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Data</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tipo</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Descrição</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Categoria</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Valor</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.data ? new Date(item.data).toLocaleDateString('pt-BR') : '-'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.tipo === 'receita'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.tipo}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">{item.descricao}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.categoria || '-'}</td>
                  <td className="px-4 py-3 text-sm font-semibold">
                    <span
                      className={
                        item.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
                      }
                    >
                      {item.tipo === 'receita' ? '+' : '-'} R$ {item.valor?.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {items.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              Nenhum lançamento financeiro cadastrado ainda.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
