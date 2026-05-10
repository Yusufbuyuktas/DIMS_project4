import React from 'react';

const Navbar = () => {
  return (
    // bg-[#1E1E2E] senin attığın o derin koyu renk
    <nav className="fixed top-0 z-50 w-full bg-[#1E1E2E] border-b border-slate-800 backdrop-blur-md">
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/sau-logo.png"
            alt="SAU Logo"
            className="w-11 h-11 object-contain brightness-0 invert" // Logoyu beyaza çevirir (isteğe bağlı)
          />
          <div className="flex flex-col border-l-2 border-slate-700 pl-4">
            <span className="text-base font-black text-white tracking-tighter leading-none">SAÜ | DYS</span>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mt-1">Ders Yönetim Sistemi</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Sistem Durumu</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase">Çevrimiçi</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
            <span className="text-xs font-black text-white">ADM</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;