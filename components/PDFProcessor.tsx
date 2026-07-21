'use client';

import { useState } from 'react';
import type { ProcessedPDFData, ExtractedTable } from '@/types/pdf-processor';

export default function PDFProcessor() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProcessedPDFData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Por favor, selecione um arquivo PDF');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/process-pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.data) {
        setResult(data.data);
      } else {
        setError(data.error || 'Erro ao processar o arquivo');
      }
    } catch (err) {
      setError('Erro ao enviar o arquivo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = (table: ExtractedTable, index: number) => {
    const csvContent = [
      table.headers.join(','),
      ...table.rows.map(row =>
        table.headers.map(header => {
          const value = row[header];
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `tabela_${index + 1}.csv`;
    link.click();
  };

  const downloadJSON = () => {
    if (!result) return;

    const jsonContent = JSON.stringify(result, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${result.fileName}_processado.json`;
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Processador de Planilhas PDF
        </h1>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <svg
                className="w-16 h-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="text-lg text-gray-600">
                {file ? file.name : 'Clique para selecionar um arquivo PDF'}
              </span>
              <span className="text-sm text-gray-400 mt-2">
                Tamanho máximo: 10MB
              </span>
            </label>
          </div>

          {file && (
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Processando...' : 'Processar PDF'}
            </button>
          )}
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
            <p className="font-semibold">Erro:</p>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Informações do Documento
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Arquivo:</span>
                  <p className="text-gray-600">{result.fileName}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Páginas:</span>
                  <p className="text-gray-600">{result.pageCount}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Tipo de Estrutura:</span>
                  <p className="text-gray-600 capitalize">{result.structure.type}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Confiança:</span>
                  <p className="text-gray-600">
                    {(result.structure.confidence * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
              
              {result.structure.detectedPatterns.length > 0 && (
                <div className="mt-4">
                  <span className="font-semibold text-gray-700">Padrões Detectados:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {result.structure.detectedPatterns.map((pattern, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs"
                      >
                        {pattern.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={downloadJSON}
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors text-sm"
              >
                Baixar JSON Completo
              </button>
            </div>

            {result.tables.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Tabelas Extraídas ({result.tables.length})
                </h2>
                
                {result.tables.map((table, tableIndex) => (
                  <div
                    key={tableIndex}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Tabela {tableIndex + 1}
                      </h3>
                      <button
                        onClick={() => downloadCSV(table, tableIndex)}
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors text-sm"
                      >
                        Baixar CSV
                      </button>
                    </div>

                    <div className="text-sm text-gray-600 mb-4">
                      <span className="font-semibold">Linhas:</span> {table.metadata.rowCount} |{' '}
                      <span className="font-semibold">Colunas:</span> {table.metadata.columnCount}
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-100">
                          <tr>
                            {table.headers.map((header, idx) => (
                              <th
                                key={idx}
                                className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {table.rows.slice(0, 10).map((row, rowIdx) => (
                            <tr key={rowIdx} className="hover:bg-gray-50">
                              {table.headers.map((header, cellIdx) => (
                                <td
                                  key={cellIdx}
                                  className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap"
                                >
                                  {String(row[header])}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {table.rows.length > 10 && (
                        <p className="text-sm text-gray-500 mt-2 text-center">
                          Mostrando 10 de {table.rows.length} linhas
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <p className="text-yellow-800">
                  Nenhuma tabela foi detectada automaticamente. O texto bruto está disponível no JSON.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
