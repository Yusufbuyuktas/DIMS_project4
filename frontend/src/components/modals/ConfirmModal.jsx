import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Evet, Sil",
    confirmColor = "bg-rose-500 hover:bg-rose-600"
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden scale-in-center">
                <div className="p-8 flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${confirmColor.includes('rose') ? 'bg-rose-50 text-rose-500' : 'bg-indigo-50 text-indigo-500'}`}>
                        <AlertTriangle size={32} />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 leading-tight">{title}</h3>

                    {/* 🎯 KRİTİK DEĞİŞİKLİK: Burası eskiden <p> idi, <div> yaptık */}
                    <div className="text-sm text-slate-500 mt-2 leading-relaxed font-medium">
                        {message}
                    </div>

                    <div className="flex gap-3 w-full mt-8">
                        <button onClick={onClose} className="flex-1 py-4 rounded-xl border border-slate-100 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                            Vazgeç
                        </button>
                        <button onClick={onConfirm} className={`flex-[1.5] py-4 rounded-xl text-white font-black text-[10px] uppercase tracking-widest shadow-lg transition-all active:scale-95 ${confirmColor}`}>
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;