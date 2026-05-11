import React, { useState } from 'react';
import useProfessors from '../hooks/useProfessors';
import ProfessorModal from '../components/modals/ProfessorModal';
import { professorService } from '../services/professorService';
import ProfessorCoursesModal from '../components/modals/ProfessorCoursesModal';
import useCourses from '../hooks/useCourses';
import Toast from '../components/ui/Toast';
import ConfirmModal from '../components/modals/ConfirmModal';
import { Pencil, Trash2, BookOpen, UserPlus, Users, Search, AlertCircle } from 'lucide-react'; // Search ve AlertCircle eklendi
import { teachesService } from '../services/teachesService';

const ProfessorsPage = () => {
    const { professors, loading, refresh } = useProfessors();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProfessor, setSelectedProfessor] = useState(null);
    const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false);
    const [targetProfessor, setTargetProfessor] = useState(null);
    const { courses } = useCourses();

    // --- YENİ STATE'LER: ARAMA VE DİNAMİK MESAJ ---
    const [searchTerm, setSearchTerm] = useState('');
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [profConfirm, setProfConfirm] = useState({ show: false, id: null, message: '' }); // message eklendi
    const [assignConfirm, setAssignConfirm] = useState({ show: false, teachesId: null });

    const triggerToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    // --- 1. SMART PROFESÖR SİLME MANTIĞI ---
    const handleDeleteProfClick = (id) => {
        const targetProf = professors.find(p => p.id === id);
        let warningMessage = "Bu profesörü sistemden silmek istediğinize emin misiniz? Bu işlem geri alınamaz.";

        // Eğer hocanın üzerine atanmış dersler varsa uyarıyı detaylandır
        if (targetProf?.teaches && targetProf.teaches.length > 0) {
            const courseList = targetProf.teaches.map(t => t.courseName).join(", ");
            warningMessage = `DİKKAT: Bu hocanın üzerine tanımlı [ ${courseList} ] dersleri bulunmaktadır. Silme işlemi bu atamaları da kalıcı olarak yok edecektir. Emin misiniz?`;
        }

        setProfConfirm({ show: true, id, message: warningMessage });
    };

    const handleConfirmDeleteProf = async () => {
        const id = profConfirm.id;
        setProfConfirm({ show: false, id: null, message: '' });
        try {
            await professorService.delete(id);
            refresh();
            triggerToast("Profesör kaydı sistemden kalıcı olarak silindi.", "success");
        } catch (error) {
            triggerToast("Silme işlemi sırasında teknik bir hata oluştu.", "error");
        }
    };

    // --- 2. ARAMA VE ALFABETİK SIRALAMA MANTIĞI ---
    const filteredAndSortedProfessors = [...professors]
        .filter(prof =>
            prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prof.department.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name, 'tr')); // Türkçe karakter duyarlı A-Z sıralama

    // --- 3. ATAMA KALDIRMA MANTIĞI ---
    const handleRemoveAssignmentClick = (teachesId) => {
        setAssignConfirm({ show: true, teachesId });
    };

    const handleConfirmRemoveAssignment = async () => {
        const id = assignConfirm.teachesId;
        setAssignConfirm({ show: false, teachesId: null });
        try {
            await teachesService.delete(id);
            await refresh();
            triggerToast("Ders ataması başarıyla kaldırıldı.", "success");
            setIsCoursesModalOpen(false);
        } catch (error) {
            triggerToast("Atama kaldırılırken bir hata oluştu.", "error");
        }
    };

    const handleViewCourses = (prof) => {
        setTargetProfessor(prof);
        setIsCoursesModalOpen(true);
    };

    const handleEdit = (prof) => {
        setSelectedProfessor(prof);
        setIsModalOpen(true);
    };

    const handleOpenNew = () => {
        setSelectedProfessor(null);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            {/* ÜST HEADER KARTI + ARAMA ÇUBUĞU */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200/60 gap-6">
                <div className="flex items-center gap-5">
                    <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
                        <Users size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Profesör Yönetimi</h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">Kadroda {professors.length} eğitmen kayıtlı.</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    {/* ARAMA ÇUBUĞU */}
                    <div className="relative flex-1 md:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Hoca veya bölüm ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-semibold focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none"
                        />
                    </div>

                    <button
                        onClick={handleOpenNew}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-100 flex items-center gap-2 active:scale-95 shrink-0"
                    >
                        <UserPlus size={20} />
                        Yeni Profesör
                    </button>
                </div>
            </div>

            {/* TABLO KARTI */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200/60 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-[11px] uppercase font-bold tracking-[0.2em]">
                        <tr>
                            <th className="px-8 py-6">Profil</th>
                            <th className="px-8 py-6">Ad Soyad</th>
                            <th className="px-8 py-6">Bölüm</th>
                            <th className="px-8 py-6 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="p-20 text-center text-slate-400 font-bold">Veriler Getiriliyor...</td>
                            </tr>
                        ) : filteredAndSortedProfessors.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-20 text-center text-slate-400 font-bold">Aramanızla eşleşen sonuç bulunamadı.</td>
                            </tr>
                        ) : filteredAndSortedProfessors.map((prof) => (
                            <tr key={prof.id} className="hover:bg-slate-50/80 transition-all group">
                                <td className="px-8 py-4">
                                    <div className="w-12 h-12 rounded-2xl overflow-hidden ring-4 ring-slate-50 shadow-sm transition-transform group-hover:scale-105">
                                        <img
                                            src={`http://localhost:8080/api/files/${prof.imageName}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => e.target.src = 'https://ui-avatars.com/api/?background=6366f1&color=fff&font-size=0.35&bold=true&name='+prof.name}
                                        />
                                    </div>
                                </td>
                                <td className="px-8 py-4 font-bold text-slate-700 text-base">{prof.name}</td>
                                <td className="px-8 py-5 text-slate-500 font-medium">{prof.department}</td>
                                <td className="px-8 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2.5">
                                        <button onClick={() => handleViewCourses(prof)} className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100/50">
                                            <BookOpen size={16} />
                                        </button>
                                        <button onClick={() => handleEdit(prof)} className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all border border-indigo-100/50">
                                            <Pencil size={16} />
                                        </button>
                                        <button onClick={() => handleDeleteProfClick(prof.id)} className="p-2.5 bg-rose-50 text-rose-400 rounded-xl hover:bg-rose-600 hover:text-white transition-all border border-rose-100/50">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODALLAR */}
            <ProfessorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onRefresh={refresh}
                initialData={selectedProfessor}
                triggerToast={triggerToast}
            />
            <ProfessorCoursesModal
                isOpen={isCoursesModalOpen}
                onClose={() => setIsCoursesModalOpen(false)}
                professor={targetProfessor}
                onRemoveAssignment={handleRemoveAssignmentClick}
            />

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, show: false })}
            />

            {/* 1. Profesör Silme Onayı (Akıllı Mesajlı) */}
            <ConfirmModal
                isOpen={profConfirm.show}
                onClose={() => setProfConfirm({ show: false, id: null, message: '' })}
                onConfirm={handleConfirmDeleteProf}
                title="Profesör Silme"
                message={
                    <div className="flex flex-col gap-3">
                        <p>{profConfirm.message}</p>
                        {profConfirm.message.includes("DİKKAT") && (
                            <div className="flex items-center gap-2 p-3 bg-rose-50 rounded-xl text-rose-600 border border-rose-100 animate-pulse">
                                <AlertCircle size={18} />
                                <span className="text-[10px] font-black uppercase">Kritik Veri Kaybı Uyarısı</span>
                            </div>
                        )}
                    </div>
                }
            />

            {/* 2. Atama Kaldırma Onayı */}
            <ConfirmModal
                isOpen={assignConfirm.show}
                onClose={() => setAssignConfirm({ show: false, teachesId: null })}
                onConfirm={handleConfirmRemoveAssignment}
                title="Atamayı Kaldır"
                message="Bu ders atamasını profesörden kaldırmak istediğinize emin misiniz? Ders ana katalogda kalmaya devam edecektir."
            />
        </div>
    );
};

export default ProfessorsPage;