'use client';

import { useEffect, useState } from 'react';
import { getShows, getArtistas, createShow } from '@/lib/supabaseClient';
import type { Artista } from '@/lib/supabase';

export default function ShowsList() {
  const [shows, setShows] = useState<any[]>([]);
  const [artistas, setArtistas] = useState<Artista[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome_show: '',
    data_show: '',
    local: '',
    artista_id: '',
    publico_esperado: '',
    status: 'planejado',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [showsData, artistasData] = await Promise.all([
        getShows(),
        getArtistas(),
      ]);
      setShows(showsData);
      setArtistas(artistasData);
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
      await createShow({
        nome_show: formData.nome_show,
        data_show: formData.data_show,
        local: formData.local,
        artista_id: formData.artista_id ? parseInt(formData.artista_id) : undefined,
        publico_esperado: formData.publico_esperado ? parseInt(formData.publico_esperado) : undefined,
        status: formData.status,
      });
      alert('Show criado com sucesso!');
      resetForm();
      loadData();
    } catch (error) {
      console.error('Erro ao salvar show:', error);
      alert('Erro ao salvar show');
    }
  };

  const resetForm = () => {
    setFormData({
      nome_show: '',
      data_show: '',
      local: '',
      artista_id: '',
      publico_esperado: '',
      status: 'planejado',
    });
    setShowForm(false);
  };

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Shows</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          {showForm ? 'Cancelar' : 'Novo Show'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Show
              </label>
              <input
                type="text"
                value={formData.nome_show}
                onChange={(e) => setFormData({ ...formData, nome_show: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data do Show
              </label>
              <input
                type="datetime-local"
                value={formData.data_show}
                onChange={(e) => setFormData({ ...formData, data_show: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local
              </label>
              <input
                type="text"
                value={formData.local}
                onChange={(e) => setFormData({ ...formData, local: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Artista
              </label>
              <select
                value={formData.artista_id}
                onChange={(e) => setFormData({ ...formData, artista_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Selecione um artista</option>
                {artistas.map((artista) => (
                  <option key={artista.id} value={artista.id}>
                    {artista.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Público Esperado
              </label>
              <input
                type="number"
                value={formData.publico_esperado}
                onChange={(e) => setFormData({ ...formData, publico_esperado: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="planejado">Planejado</option>
                <option value="confirmado">Confirmado</option>
                <option value="realizado">Realizado</option>
                <option value="cancelado">Cancelado</option>
              </select>
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
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Data</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Local</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Artista</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Público</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {shows.map((show) => (
              <tr key={show.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-800">{show.nome_show}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{formatDate(show.data_show)}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{show.local}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {show.artista?.nome || '-'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {show.publico_esperado || '-'}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      show.status === 'realizado'
                        ? 'bg-green-100 text-green-800'
                        : show.status === 'confirmado'
                        ? 'bg-blue-100 text-blue-800'
                        : show.status === 'planejado'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {show.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {shows.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            Nenhum show cadastrado ainda.
          </p>
        )}
      </div>
    </div>
  );
}
