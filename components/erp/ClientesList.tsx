'use client';

import { useEffect, useState } from 'react';
import { getClientes, createCliente, updateCliente, deleteCliente } from '@/lib/supabaseClient';
import type { Cliente } from '@/lib/supabase';

export default function ClientesList() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf_cnpj: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
  });

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    try {
      setLoading(true);
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      alert('Erro ao carregar clientes');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCliente) {
        await updateCliente(editingCliente.id, formData);
        alert('Cliente atualizado com sucesso!');
      } else {
        await createCliente(formData);
        alert('Cliente criado com sucesso!');
      }
      resetForm();
      loadClientes();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      alert('Erro ao salvar cliente');
    }
  };

  const handleEdit = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setFormData({
      nome: cliente.nome,
      email: cliente.email || '',
      telefone: cliente.telefone || '',
      cpf_cnpj: cliente.cpf_cnpj || '',
      endereco: cliente.endereco || '',
      cidade: cliente.cidade || '',
      estado: cliente.estado || '',
      cep: cliente.cep || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;
    
    try {
      await deleteCliente(id);
      alert('Cliente excluído com sucesso!');
      loadClientes();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      alert('Erro ao excluir cliente');
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      cpf_cnpj: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
    });
    setEditingCliente(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Clientes</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? 'Cancelar' : 'Novo Cliente'}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <input
                type="tel"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CPF/CNPJ
              </label>
              <input
                type="text"
                value={formData.cpf_cnpj}
                onChange={(e) => setFormData({ ...formData, cpf_cnpj: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endereço
              </label>
              <input
                type="text"
                value={formData.endereco}
                onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cidade
              </label>
              <input
                type="text"
                value={formData.cidade}
                onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <input
                type="text"
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CEP
              </label>
              <input
                type="text"
                value={formData.cep}
                onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              {editingCliente ? 'Atualizar' : 'Salvar'}
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
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Telefone</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">CPF/CNPJ</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Cidade</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-800">{cliente.nome}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{cliente.email}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{cliente.telefone}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{cliente.cpf_cnpj}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{cliente.cidade}</td>
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => handleEdit(cliente)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(cliente.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {clientes.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            Nenhum cliente cadastrado ainda.
          </p>
        )}
      </div>
    </div>
  );
}
