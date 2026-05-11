import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-[#1E1E2E] border-b border-slate-800 backdrop-blur-md">
      <div className="px-6 py-3 flex items-center justify-between">

        <Link
          to="/"
          className="flex items-center gap-4 hover:opacity-80 transition-opacity cursor-pointer group"
        >
          <img
            src="/sau-logo.png"
            alt="SAU Logo"
            className="w-11 h-11 object-contain brightness-0 invert transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col border-l-2 border-slate-700 pl-4">
            <span className="text-base font-black text-white tracking-tighter leading-none">
              SAÜ | DYS
            </span>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mt-1">
              Ders Yönetim Sistemi
            </span>
          </div>
        </Link>

        {/* SAĞ TARAF (Sistem Durumu ve Profil) */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Sistem Durumu</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase">Çevrimiçi</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center select-none">
            <span className="text-xs font-black text-white">ADM</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;