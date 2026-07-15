'use client';

import React from 'react';
import Image from 'next/image';

export default function AdminLogin() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 py-12 font-sans">

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg px-8 py-10 flex flex-col items-center">

        {/* Logotipo */}
        <div className="mb-6 h-24 w-24 relative">
          <Image
            src="/tonamidia.png"
            alt="Logo Tô na Mídia"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-black mb-1">Acesso Administrativo</h1>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Restrito à equipe TNM
        </p>

        {/* Formulário */}
        <form className="w-full flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>

          {/* E-mail corporativo */}
          <input
            type="email"
            placeholder="E-mail corporativo"
            className="w-full rounded-xl bg-[#D9D9D9] px-4 py-4 text-base text-gray-800 placeholder-gray-500 outline-none transition focus:ring-2 focus:ring-[#7A0BC0]"
            required
          />

          {/* Senha */}
          <input
            type="password"
            placeholder="Senha"
            className="w-full rounded-xl bg-[#D9D9D9] px-4 py-4 text-base text-gray-800 placeholder-gray-500 outline-none transition focus:ring-2 focus:ring-[#7A0BC0]"
            required
          />

          {/* Botão */}
          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-[#7A0BC0] py-4 text-base font-semibold text-white transition hover:bg-[#620999] active:scale-[0.98]"
          >
            Entrar
          </button>

        </form>

      </div>

    </div>
  );
}
