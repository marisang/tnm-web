'use client';

import { useState } from 'react';
import ClientesList from './ClientesList';
import ShowsList from './ShowsList';
import ProdutosList from './ProdutosList';
import FinanceiroPanel from './FinanceiroPanel';

type TabType = 'clientes' | 'shows' | 'produtos' | 'financeiro';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('clientes');

  const tabs = [
    { id: 'clientes', label: 'Clientes', icon: '👥' },
    { id: 'shows', label: 'Shows', icon: '🎭' },
    { id: 'produtos', label: 'Produtos', icon: '📦' },
    { id: 'financeiro', label: 'Financeiro', icon: '💰' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white p-6">
            <h1 className="text-3xl font-bold">Sistema ERP - Tona Mídia</h1>
            <p className="text-blue-100 mt-2">Gestão Integrada de Shows e Eventos</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600 bg-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'clientes' && <ClientesList />}
            {activeTab === 'shows' && <ShowsList />}
            {activeTab === 'produtos' && <ProdutosList />}
            {activeTab === 'financeiro' && <FinanceiroPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}
