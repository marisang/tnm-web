import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CadastroArtista() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-white px-6 py-12 font-sans md:justify-center md:gap-12">

      {/* Container Central (Logotipo e Formulário) */}
      <div className="flex w-full max-w-sm flex-col items-center mt-12 md:mt-0">

        {/* Logotipo */}
        <div className="mb-8 h-28 w-28 relative">
          <Image
            src="/tonamidia.png"
            alt="Logo Tô na Mídia"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Título */}
        <h1 className="mb-8 text-3xl font-bold text-black">Cadastro</h1>

        {/* Formulário */}
        <form className="w-full flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>

          {/* Nome Completo */}
          <input
            type="text"
            placeholder="Nome Completo"
            className="w-full rounded-xl bg-[#D9D9D9] px-4 py-4 text-base text-gray-800 placeholder-gray-500 outline-none transition focus:ring-2 focus:ring-[#7A0BC0]"
            required
          />

          {/* Pseudônimo Artístico */}
          <input
            type="text"
            placeholder="Pseudônimo Artístico"
            className="w-full rounded-xl bg-[#D9D9D9] px-4 py-4 text-base text-gray-800 placeholder-gray-500 outline-none transition focus:ring-2 focus:ring-[#7A0BC0]"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl bg-[#D9D9D9] px-4 py-4 text-base text-gray-800 placeholder-gray-500 outline-none transition focus:ring-2 focus:ring-[#7A0BC0]"
            required
          />

          {/* WhatsApp */}
          <input
            type="tel"
            placeholder="Whatsapp"
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

          {/* Checkboxes */}
          <div className="flex flex-col gap-2 mt-1">
            <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                required
                className="w-4 h-4 accent-[#7A0BC0] cursor-pointer"
              />
              Li e concordo com a{' '}
              <Link href="/politica-de-privacidade" className="text-[#7A0BC0] underline hover:text-[#620999]">
                Política de Privacidade
              </Link>
            </label>

            <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#7A0BC0] cursor-pointer"
              />
              Aceito receber notificações
            </label>
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-[#7A0BC0] py-4 text-base font-semibold text-white transition hover:bg-[#620999] active:scale-[0.98]"
          >
            Entrar
          </button>

        </form>
      </div>

      {/* Rodapé */}
      <div className="text-sm text-black mb-4">
        Já possui uma conta?{' '}
        <Link
          href="/login"
          className="font-semibold text-[#7A0BC0] underline decoration-1 underline-offset-2 hover:text-[#620999]"
        >
          Faça login
        </Link>
      </div>

    </div>
  );
}
