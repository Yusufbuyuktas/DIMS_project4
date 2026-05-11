import React, { useState } from 'react';
// Profesyonel ikon setimiz
import { X, Link2, Users, Calendar, BadgeCheck, Info } from 'lucide-react';

const AssignmentModal = ({ isOpen, onClose, onConfirm, courseName }) => {
    const [studentCount, setStudentCount] = useState('');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endingDate, setEndingDate] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm({
            studentCount: parseInt(studentCount),
            startDate,
            endingDate: endingDate || null
        });
        // Formu temizle
        setStudentCount('');
        setEndingDate('');
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200/50 transition-all scale-in-center">

                {/* MODAL HEADER */}
                <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-100">
                            <Link2 size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-800 leading-none">Atama Detayları</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                                {courseName}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* ÖĞRENCİ SAYISI */}
                    <div className="group">
                        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 ml-1 transition-colors group-focus-within:text-indigo-600">
                            Öğrenci Kontenjanı
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400">
                                <Users size={18} />
                            </div>
                            <input
                                required
                                type="number"
                                min="0"
                                value={studentCount}
                                onChange={(e) => setStudentCount(e.target.value)}
                                placeholder="Örn: 50"
                                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 font-semibold placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none"
                            />
                        </div>
                    </div>

                    {/* TARİH ALANLARI (GRID) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="group">
                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 ml-1">
                                Başlangıç
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-indigo-500">
                                    <Calendar size={16} />
                                </div>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                        if (endingDate && new Date(e.target.value) > new Date(endingDate)) {
                                            setEndingDate('');
                                        }
                                    }}
                                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 font-bold text-xs focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 ml-1">
                                Bitiş (Opsiyonel)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500">
                                    <Calendar size={16} />
                                </div>
                                <input
                                    type="date"
                                    value={endingDate}
                                    onChange={(e) => setEndingDate(e.target.value)}
                                    min={startDate || undefined}
                                    disabled={!startDate}
                                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 font-bold text-xs focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>

                    {/* BİLGİLENDİRME NOTU */}
                    <div className="flex items-start gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-2xl">
                        <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-[11px] font-medium text-amber-700 leading-relaxed">
                            Atama yapıldığında ilgili ders seçili profesörün aktif programına dahil edilecektir.
                        </p>
                    </div>

                    {/* AKSİYON BUTONLARI */}
                    <div className="flex gap-4 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 rounded-2xl border border-slate-100 text-slate-400 font-black text-xs uppercase tracking-widest hover:bg-slate-50 hover:text-slate-600 transition-all"
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            className="flex-[1.5] py-4 rounded-2xl bg-indigo-600 text-white font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                            <BadgeCheck size={18} />
                            Atamayı Onayla
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignmentModal;