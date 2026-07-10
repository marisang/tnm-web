'use client';

import { useState } from 'react';

interface FormData {
  albumCover: File | null;
  dateTime: string;
  address: string;
  ticketUrl: string;
  whatsapp: string;
}

export default function CreateShowSection() {
  const [formData, setFormData] = useState<FormData>({
    albumCover: null,
    dateTime: '',
    address: '',
    ticketUrl: '',
    whatsapp: '',
  });

  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, albumCover: file });
      setFileName(file.name);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      albumCover: null,
      dateTime: '',
      address: '',
      ticketUrl: '',
      whatsapp: '',
    });
    setFileName('');
  };

  return (
    <div className="bg-gray-600 rounded-lg p-6">
      <h2 className="text-white text-lg font-bold mb-4 text-center">CADASTRAR NOVO SHOW</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Album Cover Upload */}
        <div>
          <label className="block text-white text-xs font-semibold mb-2">CAPA DO ÁLBUM</label>
          <div className="border-2 border-dashed border-gray-400 rounded p-6 text-center bg-gray-500 cursor-pointer hover:bg-gray-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="album-cover"
            />
            <label htmlFor="album-cover" className="cursor-pointer block">
              <div className="text-gray-300 mb-1">🎵</div>
              <p className="text-white font-semibold text-xs">Escolha o arquivo e arraste-o aqui</p>
              {fileName && <p className="text-yellow-300 mt-1 text-xs">{fileName}</p>}
            </label>
          </div>
        </div>

        {/* Date and Time */}
        <div>
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded bg-gray-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
            placeholder="18/06/2026 às 21:00"
          />
        </div>

        {/* Address */}
        <div>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded bg-gray-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
            placeholder="Endereço"
          />
        </div>

        {/* Ticket URL */}
        <div>
          <input
            type="url"
            name="ticketUrl"
            value={formData.ticketUrl}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded bg-gray-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
            placeholder="URL da Venda de Ingressos"
          />
        </div>

        {/* WhatsApp */}
        <div>
          <input
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded bg-gray-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
            placeholder="Whatsapp de Contato"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded text-sm transition-colors"
        >
          CADASTRAR
        </button>
      </form>
    </div>
  );
}
