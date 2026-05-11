import React, { useState, useEffect } from 'react';
import { professorService } from '../../services/professorService';
import { X, Camera, User, BadgeCheck, Loader2 } from 'lucide-react';

const ProfessorModal = ({ isOpen, onClose, onRefresh, initialData, triggerToast }) => {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isImageRemoved, setIsImageRemoved] = useState(false);

    // 1. MODAL HER AÇILDIĞINDA VEYA KAPANDIĞINDA STATE'LERİ SIFIRLA
    useEffect(() => {
        if (initialData && isOpen) {
            setName(initialData.name);
            setDepartment(initialData.department);
            setFile(null);
            setPreview(`http://localhost:8080/api/files/${initialData.imageName}`);
            setIsImageRemoved(false); // 👈 Düzenleme modunda kilitleri aç
        } else if (!isOpen) {
            setName('');
            setDepartment('');
            setFile(null);
            setPreview(null);
            setIsImageRemoved(false); // 👈 Modal kapandığında state'i temizle
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleRemoveImage = () => {
        setFile(null);
        setPreview(null);
        setIsImageRemoved(true); // "Kaydet"e basınca default-avatar gitmesini işaretle
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setIsImageRemoved(false); // 👈 KRİTİK: Yeni dosya seçilirse "silindi" durumunu iptal et
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Varsayılan olarak mevcut resmi koru
            let finalImageName = initialData?.imageName || "default-avatar.png";

            // 🎯 MANTIK SIRALAMASI GÜNCELLENDİ (Conflict Çözümü)
            if (file) {
                // Öncelik 1: Eğer kullanıcı yeni bir dosya seçtiyse her zaman yükleme yap
                finalImageName = await professorService.uploadImage(file);
            } else if (isImageRemoved) {
                // Öncelik 2: Dosya seçilmemişse ama "Çarpı"ya basılmışsa default'a çek
                finalImageName = "default-avatar.png";
            }

            const payload = { name, department, imageName: finalImageName };

            if (initialData?.id) {
                await professorService.update(initialData.id, payload);
                triggerToast("Profesör bilgileri başarıyla güncellendi.", "success");
            } else {
                await professorService.save(payload);
                triggerToast("Yeni profesör kaydı başarıyla oluşturuldu.", "success");
            }

            onRefresh();
            onClose();
        } catch (error) {
            console.error("İşlem hatası:", error);
            const serverMessage = error.response?.data?.message;
            if (serverMessage) {
                triggerToast(serverMessage, "error");
            } else {
                triggerToast("İşlem sırasında bir hata oluştu!", "error");
            }
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
                            <User size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-800 leading-none">
                                {initialData ? "Profili Düzenle" : "Yeni Profesör"}
                            </h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                                Akademik Veri Girişi
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* PROFIL RESMI SEÇİCİ */}
                    <div className="flex flex-col items-center">
                        <div className="relative group">
                            <div className="w-28 h-28 rounded-[2rem] bg-slate-50 border-4 border-white flex items-center justify-center overflow-hidden shadow-xl ring-1 ring-slate-100 transition-transform group-hover:scale-[1.02]">
                                {preview ? (
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center text-slate-300">
                                        <User size={40} strokeWidth={1} />
                                        <span className="text-[9px] font-black uppercase mt-1">Fotoğraf Yok</span>
                                    </div>
                                )}
                            </div>

                            {preview && (
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute -top-2 -right-2 bg-rose-500 text-white p-1.5 rounded-xl shadow-lg border-2 border-white hover:bg-rose-600 transition-all active:scale-90 z-10"
                                    title="Resmi Kaldır"
                                >
                                    <X size={14} strokeWidth={3} />
                                </button>
                            )}

                            <label className="absolute -bottom-2 -left-2 bg-indigo-600 p-2.5 rounded-2xl text-white cursor-pointer hover:bg-indigo-700 transition-all shadow-xl border-4 border-white active:scale-90">
                                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                <Camera size={16} />
                            </label>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-6">
                            PNG, JPG veya JPEG
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div className="group">
                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 ml-1 transition-colors group-focus-within:text-indigo-600">
                                Tam Ad Soyad
                            </label>
                            <input
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Örn: Prof. Dr. Ahmet Yılmaz"
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 font-semibold placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 ml-1 transition-colors group-focus-within:text-indigo-600">
                                Akademik Bölüm
                            </label>
                            <input
                                required
                                type="text"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                placeholder="Örn: Bilgisayar Mühendisliği"
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 font-semibold placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 rounded-2xl border border-slate-100 text-slate-400 font-black text-xs uppercase tracking-widest hover:bg-slate-50 hover:text-slate-600 transition-all"
                        >
                            Vazgeç
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[1.5] py-4 rounded-2xl bg-indigo-600 text-white font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95"
                        >
                            {loading ? <Loader2 className="animate-spin" size={18} /> : <><BadgeCheck size={18} /> {initialData ? "Değişiklikleri Kaydet" : "Kaydı Tamamla"}</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfessorModal;