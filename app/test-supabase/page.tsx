'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestSupabasePage() {
  const [status, setStatus] = useState<string>('Testando conexão...');
  const [results, setResults] = useState<any>({});
  const [error, setError] = useState<string>('');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      setStatus('🔍 Verificando credenciais...');
      
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        setError('❌ Credenciais não encontradas no .env.local');
        return;
      }

      setResults((prev: any) => ({
        ...prev,
        credenciais: { ok: true, url, key: key.substring(0, 20) + '...' }
      }));

      // Teste 1: Categorias
      setStatus('🔍 Testando tabela categorias...');
      const { data: categorias, error: errorCat } = await supabase
        .from('categorias')
        .select('*')
        .limit(5);

      setResults((prev: any) => ({
        ...prev,
        categorias: {
          ok: !errorCat,
          count: categorias?.length || 0,
          error: errorCat?.message,
          data: categorias
        }
      }));

      // Teste 2: Clientes
      setStatus('🔍 Testando tabela clientes...');
      const { data: clientes, error: errorCli } = await supabase
        .from('clientes')
        .select('*')
        .limit(5);

      setResults((prev: any) => ({
        ...prev,
        clientes: {
          ok: !errorCli,
          count: clientes?.length || 0,
          error: errorCli?.message
        }
      }));

      // Teste 3: Artistas
      setStatus('🔍 Testando tabela artistas...');
      const { data: artistas, error: errorArt } = await supabase
        .from('artistas')
        .select('*')
        .limit(5);

      setResults((prev: any) => ({
        ...prev,
        artistas: {
          ok: !errorArt,
          count: artistas?.length || 0,
          error: errorArt?.message
        }
      }));

      // Teste 4: Shows
      setStatus('🔍 Testando tabela data_shows...');
      const { data: shows, error: errorShows } = await supabase
        .from('data_shows')
        .select('*')
        .limit(5);

      setResults((prev: any) => ({
        ...prev,
        shows: {
          ok: !errorShows,
          count: shows?.length || 0,
          error: errorShows?.message
        }
      }));

      // Teste 5: Produtos
      setStatus('🔍 Testando tabela produtos...');
      const { data: produtos, error: errorProd } = await supabase
        .from('produtos')
        .select('*')
        .limit(5);

      setResults((prev: any) => ({
        ...prev,
        produtos: {
          ok: !errorProd,
          count: produtos?.length || 0,
          error: errorProd?.message
        }
      }));

      setStatus('✅ Testes concluídos!');
    } catch (err: any) {
      setError(`❌ Erro: ${err.message}`);
      setStatus('❌ Erro ao testar');
    }
  };

  const allOk = Object.values(results).every((r: any) => r.ok);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            🔍 Teste de Conexão Supabase
          </h1>

          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-700">{status}</p>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 font-semibold">{error}</p>
            </div>
          )}

          {results.credenciais && (
            <div className="space-y-4">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-blue-800 mb-2">✅ Credenciais</h3>
                <p className="text-sm text-gray-700">URL: {results.credenciais.url}</p>
                <p className="text-sm text-gray-700">Key: {results.credenciais.key}</p>
              </div>

              {Object.entries(results)
                .filter(([key]) => key !== 'credenciais')
                .map(([key, value]: [string, any]) => (
                  <div
                    key={key}
                    className={`border-2 rounded-lg p-4 ${
                      value.ok
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <h3 className={`font-bold mb-2 ${
                      value.ok ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {value.ok ? '✅' : '❌'} Tabela: {key}
                    </h3>
                    {value.ok ? (
                      <p className="text-sm text-gray-700">
                        Registros encontrados: {value.count}
                      </p>
                    ) : (
                      <div>
                        <p className="text-sm text-red-700 font-semibold">
                          Erro: {value.error}
                        </p>
                        <p className="text-xs text-red-600 mt-2">
                          A tabela pode não existir. Execute o SQL do arquivo supabase-schema.sql
                        </p>
                      </div>
                    )}
                  </div>
                ))}

              {Object.keys(results).length > 1 && (
                <div className={`border-2 rounded-lg p-6 ${
                  allOk
                    ? 'bg-green-50 border-green-300'
                    : 'bg-yellow-50 border-yellow-300'
                }`}>
                  <h3 className="text-2xl font-bold mb-4">
                    {allOk ? '🎉 Sistema 100% Funcional!' : '⚠️ Ação Necessária'}
                  </h3>
                  {allOk ? (
                    <div>
                      <p className="text-green-700 mb-4">
                        Todas as tabelas estão acessíveis e funcionando corretamente!
                      </p>
                      <a
                        href="/erp"
                        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                      >
                        Ir para o Sistema ERP →
                      </a>
                    </div>
                  ) : (
                    <div>
                      <p className="text-yellow-700 mb-4">
                        Algumas tabelas não foram encontradas. Execute o SQL no Supabase:
                      </p>
                      <ol className="list-decimal ml-6 text-sm text-gray-700 space-y-2">
                        <li>Abra o Supabase SQL Editor</li>
                        <li>Copie todo o conteúdo do arquivo <code className="bg-gray-200 px-1">supabase-schema.sql</code></li>
                        <li>Cole no editor e execute</li>
                        <li>Recarregue esta página</li>
                      </ol>
                      <button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition font-semibold"
                      >
                        🔄 Testar Novamente
                      </button>
                    </div>
                  )}
                </div>
              )}

              {results.categorias?.data && results.categorias.data.length > 0 && (
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-800 mb-2">📦 Categorias Cadastradas:</h3>
                  <ul className="list-disc ml-6 text-sm text-gray-700">
                    {results.categorias.data.map((cat: any) => (
                      <li key={cat.id}>{cat.nome}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
