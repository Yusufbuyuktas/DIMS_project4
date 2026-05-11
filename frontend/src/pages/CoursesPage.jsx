import React, { useState } from 'react';
import useCourses from '../hooks/useCourses';
import { courseService } from '../services/courseService';
import CourseModal from '../components/modals/CourseModal';
import Toast from '../components/ui/Toast';
import ConfirmModal from '../components/modals/ConfirmModal';
import { Pencil, Trash2, BookPlus, BookOpen, Award, Search, AlertCircle } from 'lucide-react';

const CoursesPage = () => {
    const { courses, loading, refresh } = useCourses();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Arama State'i

    // --- BİLDİRİM VE ONAY STATE'LERİ ---
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [confirmModal, setConfirmModal] = useState({ show: false, id: null });

    const triggerToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    // --- ARAMA VE SIRALAMA LOGIC ---
    const filteredAndSortedCourses = [...courses]
        .filter(course =>
            course.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name, 'tr')); // Türkçe Alfabetik Sıralama

    const handleEdit = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedCourse(null);
        setIsModalOpen(false);
    };

    const handleDeleteClick = (id) => {
        setConfirmModal({ show: true, id });
    };

    const handleConfirmDelete = async () => {
        const id = confirmModal.id;
        setConfirmModal({ show: false, id: null });
        try {
            await courseService.delete(id);
            refresh();
            triggerToast("Kurs katalogdan başarıyla kaldırıldı.", "success");
        } catch (error) {
            triggerToast("Silme işlemi başarısız oldu. Bu ders bir hocaya atanmış olabilir.", "error");
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            {/* ÜST HEADER KARTI + ARAMA ÇUBUĞU */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200/60 gap-6">
                <div className="flex items-center gap-5">
                    <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
                        <BookOpen size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Kurs Kataloğu</h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">Katalogda {courses.length} ders tanımlı.</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    {/* ARAMA ÇUBUĞU */}
                    <div className="relative flex-1 md:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Ders adı ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-semibold focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none"
                        />
                    </div>

                    <button
                        onClick={() => { setSelectedCourse(null); setIsModalOpen(true); }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-100 flex items-center gap-2 active:scale-95 shrink-0"
                    >
                        <BookPlus size={20} />
                        Yeni Kurs Ekle
                    </button>
                </div>
            </div>

            {/* TABLO KARTI */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200/60 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-[11px] uppercase font-bold tracking-[0.2em]">
                        <tr>
                            <th className="px-8 py-6">Kurs Bilgileri</th>
                            <th className="px-8 py-6">Kredi Yükü</th>
                            <th className="px-8 py-6 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            <tr><td colSpan="3" className="p-20 text-center font-bold text-slate-400">Katalog Yükleniyor...</td></tr>
                        ) : filteredAndSortedCourses.length === 0 ? (
                            <tr><td colSpan="3" className="p-20 text-center font-bold text-slate-400">Eşleşen kurs bulunamadı.</td></tr>
                        ) : filteredAndSortedCourses.map((course) => (
                            <tr key={course.id} className="hover:bg-slate-50/80 transition-all group">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-indigo-600 transition-colors shadow-sm text-sm">
                                            <Award size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-700 text-base">{course.name}</div>
                                            <div className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Ders Kodu: #{course.id + 100}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <span className="px-4 py-1.5  text-slate-400 bg-slate-50 rounded-xl text-[11px] font-black uppercase border border-indigo-100/30">
                                        {course.credit} AKTS
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <button onClick={() => handleEdit(course)} className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all border border-indigo-100/50"><Pencil size={14} /></button>
                                        <button onClick={() => handleDeleteClick(course.id)} className="p-2.5 bg-rose-50 text-rose-400 rounded-xl hover:bg-rose-600 hover:text-white transition-all border border-rose-100/50"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <CourseModal isOpen={isModalOpen} onClose={handleCloseModal} onRefresh={refresh} initialData={selectedCourse} triggerToast={triggerToast} />
            <Toast show={toast.show} message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />
            <ConfirmModal
                isOpen={confirmModal.show}
                onClose={() => setConfirmModal({ show: false, id: null })}
                onConfirm={handleConfirmDelete}
                title="Kurs Silme"
                message="Bu kursu katalogdan silmek istediğinize emin misiniz?"
            />
        </div>
    );
};

export default CoursesPage;