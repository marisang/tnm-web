'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function TwoFactorAuth() {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(value: string, index: number) {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = Array(6).fill('');
    pasted.split('').forEach((char, i) => { newCode[i] = char; });
    setCode(newCode);
    const focusIndex = Math.min(pasted.length, 5);
    inputs.current[focusIndex]?.focus();
  }

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

        {/* Título e subtítulo */}
        <h1 className="text-3xl font-bold text-black text-center">Preencha o Código</h1>
        <p className="mt-2 mb-8 text-sm text-gray-500 text-center">
          Enviamos um código por email e por SMS
        </p>

        {/* Inputs do código */}
        <form className="w-full flex flex-col items-center gap-8" onSubmit={(e) => e.preventDefault()}>
          <div className="flex gap-3 justify-center">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-12 h-14 rounded-xl bg-[#D9D9D9] text-center text-xl font-semibold text-gray-800 outline-none transition focus:ring-2 focus:ring-[#7A0BC0]"
              />
            ))}
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full rounded-xl bg-[#7A0BC0] py-4 text-base font-semibold text-white transition hover:bg-[#620999] active:scale-[0.98]"
          >
            Verificar Código
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
