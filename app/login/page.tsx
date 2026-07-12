'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function LoginArtista() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-white px-6 py-12 font-sans md:justify-center md:gap-12">

      {/* Container Central */}
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
        <h1 className="mb-8 text-3xl font-bold text-black">Login</h1>

        {/* Formulário */}
        <form className="w-full flex flex-col gap-4">

          {/* Campo Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl bg-[#D9D9D9] px-4 py-4 text-base text-gray-800 placeholder-gray-500 outline-none transition focus:ring-2 focus:ring-[#7A0BC0]"
            required
          />

          {/* Campo Senha */}
          <div className="flex flex-col gap-2">
            <input
              type="password"
              placeholder="Senha"
              className="w-full rounded-xl bg-[#D9D9D9] px-4 py-4 text-base text-gray-800 placeholder-gray-500 outline-none transition focus:ring-2 focus:ring-[#7A0BC0]"
              required
            />
            <Link
              href="/recuperar-senha"
              className="self-start text-xs text-black hover:underline"
            >
              Esqueci minha senha
            </Link>
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-[#7A0BC0] py-4 text-base font-semibold text-white transition hover:bg-[#620999] active:scale-[0.98]"
          >
            Entrar
          </button>

        </form>
      </div>

      {/* Rodapé */}
      <div className="text-sm text-black mb-4">
        Não possui uma conta?{' '}
        <Link
          href="/cadastro"
          className="font-semibold text-[#7A0BC0] underline decoration-1 underline-offset-2 hover:text-[#620999]"
        >
          Faça cadastro
        </Link>
      </div>

    </div>
  );
}
