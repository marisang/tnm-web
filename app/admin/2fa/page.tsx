'use client';

import { useRef, useState } from 'react';
import type { KeyboardEvent, ClipboardEvent, ChangeEvent } from 'react';
import Image from 'next/image';

export default function Admin2FA() {
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

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = Array(6).fill('');
    pasted.split('').forEach((char: string, i: number) => { newCode[i] = char; });
    setCode(newCode);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  }

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

        {/* Título e subtítulo */}
        <h1 className="text-2xl font-bold text-black text-center">Preencha o Código</h1>
        <p className="mt-2 mb-8 text-sm text-gray-500 text-center">
          Enviamos um código por e-mail ou SMS
        </p>

        {/* Formulário */}
        <form className="w-full flex flex-col items-center gap-8">
          <div className="flex gap-3 justify-center">
            {code.map((digit: string, index: number) => (
              <input
                key={index}
                ref={(el: HTMLInputElement | null) => { inputs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, index)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
                onPaste={(e: ClipboardEvent<HTMLInputElement>) => handlePaste(e)}
                className="w-12 h-14 rounded-xl bg-[#D9D9D9] text-center text-xl font-semibold text-gray-800 outline-none transition focus:ring-2 focus:ring-[#7A0BC0]"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#7A0BC0] py-4 text-base font-semibold text-white transition hover:bg-[#620999] active:scale-[0.98]"
          >
            Verificar Código
          </button>
        </form>

      </div>

    </div>
  );
}
