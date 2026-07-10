'use client';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-purple-600">
            🎵
          </div>
          <span className="text-xl font-bold">TNM Shows</span>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="text-2xl hover:opacity-80 transition-opacity">🔔</button>
          <button className="text-2xl hover:opacity-80 transition-opacity">☰</button>
        </div>
      </div>
    </header>
  );
}
