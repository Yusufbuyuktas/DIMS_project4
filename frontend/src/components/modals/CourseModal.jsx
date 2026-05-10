import React, { useState, useEffect } from 'react';
import { courseService } from '../../services/courseService';
import { X, BookOpen, Award, BadgeCheck, Loader2 } from 'lucide-react';

// 1. ADIM: triggerToast prop'unu buradan içeri alıyoruz
const CourseModal = ({ isOpen, onClose, onRefresh, initialData, triggerToast }) => {
    const [name, setName] = useState('');
    const [credit, setCredit] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData && isOpen) {
            setName(initialData.name);
            setCredit(initialData.credit);
        } else if (!isOpen) {
            setName('');
            setCredit('');
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = { name, credit: parseInt(credit) };

            if (initialData?.id) {
                // GÜNCELLEME
                await courseService.update(initialData.id, payload);
                // 2. ADIM: Başarı mesajını patlatıyoruz
                triggerToast("Kurs bilgileri başarıyla güncellendi.", "success");
            } else {
                // YENİ KAYIT
                await courseService.save(payload);
                // 3. ADIM: Başarı mesajını patlatıyoruz
                triggerToast("Yeni kurs başarıyla kataloğa eklendi.", "success");
            }

            onRefresh();
            onClose();
        } catch (error) {
            console.error("İşlem hatası:", error);
            // 4. ADIM: Alert yerine hata toast'ı gösteriyoruz
            triggerToast("İşlem sırasında bir hata oluştu!", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200/50 transition-all scale-in-center">

                {/* MODAL HEADER */}
                <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-100">
                            <BookOpen size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-800 leading-none">
                                {initialData ? "Kursu Düzenle" : "Yeni Kurs Tanımla"}
                            </h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                                Müfredat Veri Girişi
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

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="space-y-6">
                        <div className="group">
                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 ml-1 transition-colors group-focus-within:text-indigo-600">
                                Dersin Tam Adı
                            </label>
                            <input
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Örn: Veri Yapıları ve Algoritmalar"
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 font-semibold placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 ml-1 transition-colors group-focus-within:text-indigo-600">
                                Kredi / AKTS Değeri
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400">
                                    <Award size={18} />
                                </div>
                                <input
                                    required
                                    type="number"
                                    min="0"
                                    value={credit}
                                    onChange={(e) => setCredit(e.target.value)}
                                    placeholder="0"
                                    className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 font-semibold placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 rounded-2xl border border-slate-100 text-slate-400 font-black text-xs uppercase tracking-widest hover:bg-slate-50 hover:text-slate-600 transition-all"
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[1.5] py-4 rounded-2xl bg-indigo-600 text-white font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <>
                                    <BadgeCheck size={18} />
                                    {initialData ? "Kursu Güncelle" : "Kataloğa Ekle"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseModal;