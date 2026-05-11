// ProfessorCoursesModal.jsx - Güncellenmiş Tam Hali

import React from 'react';
import { X, BookOpen, Users, Calendar, Info, Trash2 } from 'lucide-react'; // 👈 Trash2 eklendi

const ProfessorCoursesModal = ({ isOpen, onClose, professor, onRemoveAssignment }) => { // 👈 onRemoveAssignment eklendi
    if (!isOpen || !professor) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200/50 transition-all scale-in-center">

                {/* HEADER KISMI AYNI KALIYOR */}
                <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <img
                                src={`http://localhost:8080/api/files/${professor.imageName}`}
                                className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white shadow-md"
                                onError={(e) => e.target.src = `https://ui-avatars.com/api/?background=6366f1&color=fff&bold=true&name=${professor.name}`}
                            />
                            <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-800 leading-tight">{professor.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-md font-black uppercase tracking-widest">
                                    {professor.department}
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest border-l border-slate-200 pl-2">
                                    Aktif Ders Programı
                                </span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
                        <X size={24} />
                    </button>
                </div>

                {/* MODAL BODY: Tabloya İşlem Sütunu Eklendi */}
                <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar bg-white">
                    {!professor.teaches || professor.teaches.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
                                <Info size={32} />
                            </div>
                            <p className="text-slate-400 font-bold text-sm uppercase tracking-tighter">Henüz atanmış bir ders bulunmuyor.</p>
                        </div>
                    ) : (
                        <div className="border border-slate-100 rounded-3xl overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50/50 text-[10px] uppercase font-black text-slate-400 tracking-[0.15em]">
                                    <tr>
                                        <th className="px-6 py-4">Ders Adı</th>
                                        <th className="px-6 py-4">Kapasite</th>
                                        <th className="px-6 py-4">Dönem Aralığı</th>
                                        <th className="px-6 py-4 text-right">İşlem</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {professor.teaches.map((t) => (
                                        <tr key={t.id} className="hover:bg-slate-50/80 transition-all group">
                                            <td className="px-6 py-5 font-bold text-slate-700 text-sm">
                                                <div className="flex items-center gap-3">
                                                    <BookOpen size={16} className="text-indigo-500" />
                                                    {t.courseName}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-xs font-black text-slate-500 uppercase">
                                                {t.studentCount} Öğrenci
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col text-[10px] font-bold text-slate-400">
                                                    <span>Bşl: {t.startDate}</span>
                                                    {t.endingDate && <span>Bit: {t.endingDate}</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <button
                                                    onClick={() => onRemoveAssignment(t.id)}
                                                    className="p-2.5 bg-rose-50 text-rose-400 rounded-xl hover:bg-rose-600 hover:text-white transition-all border border-rose-100/50"
                                                    title="Atamayı Kaldır"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* FOOTER AYNI KALIYOR */}
                <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex justify-end">

                </div>
            </div>
        </div>
    );
};

export default ProfessorCoursesModal;