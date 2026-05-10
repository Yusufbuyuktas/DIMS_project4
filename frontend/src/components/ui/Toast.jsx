// src/components/ui/Toast.jsx
import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const Toast = ({ show, message, onClose, type = 'success' }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onClose(), 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const isError = type === 'error';

  return (
    // fixed top-20 left-1/2 -translate-x-1/2 -> Üst Orta Konum
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-top duration-300">
      <div className={`
        flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border min-w-[320px]
        ${isError ? 'bg-white border-rose-100' : 'bg-white border-emerald-100'}
      `}>
        <div className={isError ? 'text-rose-500' : 'text-emerald-500'}>
          {isError ? <AlertCircle size={24} /> : <CheckCircle2 size={24} />}
        </div>

        <div className="flex-1">
          <p className="text-sm font-bold text-slate-800 leading-tight">
            {isError ? 'Bir Sorun Oluştu' : 'İşlem Başarılı'}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">{message}</p>
        </div>

        <button onClick={onClose} className="p-1 hover:bg-slate-50 rounded-lg transition-colors">
          <X size={16} className="text-slate-400" />
        </button>
      </div>
    </div>
  );
};

export default Toast;