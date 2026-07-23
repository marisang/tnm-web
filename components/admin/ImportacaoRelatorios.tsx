'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';

type Origem = '' | 'ONErpm' | 'ECAD' | 'ABRAMUS';

interface ArquivoImportado {
  file: File;
  origem: Origem;
}

export default function ImportacaoRelatorios() {
  const [dragging, setDragging] = useState(false);
  const [arquivo, setArquivo] = useState<ArquivoImportado | null>(null);
  const [origem, setOrigem] = useState<Origem>('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const extensoesValidas = ['.csv', '.xlsx'];

  function validarArquivo(file: File): boolean {
    const nome = file.name.toLowerCase();
    return extensoesValidas.some((ext) => nome.endsWith(ext));
  }

  function processarArquivo(file: File) {
    setErro('');
    setSucesso(false);
    if (!validarArquivo(file)) {
      setErro('Formato inválido. Apenas .csv e .xlsx são aceitos.');
      return;
    }
    setArquivo({ file, origem });
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processarArquivo(file);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave() {
    setDragging(false);
  }

  function handleFileInput(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processarArquivo(file);
  }

  function handleImportar() {
    if (!arquivo) {
      setErro('Selecione um arquivo antes de importar.');
      return;
    }
    if (!origem) {
      setErro('Selecione a origem do arquivo.');
      return;
    }
    setErro('');
    setSucesso(true);
    console.log('Importando:', arquivo.file.name, '| Origem:', origem);
    // Reset
    setArquivo(null);
    setOrigem('');
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className="bg-gray-600 rounded-lg p-6">
      <h2 className="text-white text-lg font-bold mb-4 text-center">
        IMPORTAÇÃO DE RELATÓRIOS
      </h2>

      {/* Dropdown de origem */}
      <div className="mb-4">
        <label className="block text-white text-xs font-semibold mb-2">
          ORIGEM DO ARQUIVO
        </label>
        <select
          value={origem}
          onChange={(e) => { setOrigem(e.target.value as Origem); setErro(''); setSucesso(false); }}
          className="w-full px-3 py-2 rounded bg-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
        >
          <option value="" disabled>Selecione a origem...</option>
          <option value="ONErpm">ONErpm</option>
          <option value="ECAD">ECAD</option>
          <option value="ABRAMUS">ABRAMUS</option>
        </select>
      </div>

      {/* Área de Drag & Drop */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          dragging
            ? 'border-yellow-400 bg-gray-400'
            : 'border-gray-400 bg-gray-500 hover:bg-gray-400'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xlsx"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="text-3xl mb-2">📂</div>

        {arquivo ? (
          <div>
            <p className="text-yellow-300 font-semibold text-sm">{arquivo.file.name}</p>
            <p className="text-gray-300 text-xs mt-1">
              {(arquivo.file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        ) : (
          <div>
            <p className="text-white font-semibold text-sm">
              Arraste o arquivo aqui ou clique para selecionar
            </p>
            <p className="text-gray-300 text-xs mt-1">Formatos aceitos: .csv, .xlsx</p>
          </div>
        )}
      </div>

      {/* Mensagens */}
      {erro && (
        <p className="text-red-400 text-xs mt-2">{erro}</p>
      )}
      {sucesso && (
        <p className="text-green-400 text-xs mt-2">✓ Arquivo importado com sucesso!</p>
      )}

      {/* Botão importar */}
      <button
        type="button"
        onClick={handleImportar}
        className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded text-sm transition-colors"
      >
        IMPORTAR
      </button>
    </div>
  );
}
