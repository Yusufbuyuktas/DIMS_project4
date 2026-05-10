import React, { useState } from 'react';
import useProfessors from '../hooks/useProfessors';
import useCourses from '../hooks/useCourses';
import { teachesService } from '../services/teachesService';
import AssignmentModal from '../components/modals/AssignmentModal';
import Toast from '../components/ui/Toast';
import ConfirmModal from '../components/modals/ConfirmModal'; // ConfirmModal eklendi
import { reportService } from '../services/reportService';
import { FileText, Users, BookOpen, UserCheck, XCircle, CheckCircle2, ChevronRight, Search } from 'lucide-react';

const TeachesPage = () => {
    const { professors, loading: pLoading, refresh: refreshP } = useProfessors();
    const { courses, loading: cLoading, refresh: refreshC } = useCourses();
    const [selectedProf, setSelectedProf] = useState(null);
    const [processing, setProcessing] = useState(false);

    // --- ARAMA STATE'LERİ ---
    const [profSearch, setProfSearch] = useState('');
    const [courseSearch, setCourseSearch] = useState('');

    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const [toastType, setToastType] = useState('success');

    // Onay Modalı State
    const [confirmModal, setConfirmModal] = useState({ show: false, teachesId: null });

    const triggerToast = (msg, type = 'success') => {
        setToastMsg(msg);
        setToastType(type);
        setShowToast(true);
    };

    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [pendingCourse, setPendingCourse] = useState(null);

    const currentProf = professors.find(p => p.id === selectedProf?.id);

    // --- FİLTRELEME VE SIRALAMA LOGIC ---
    const filteredProfessors = [...professors]
        .filter(p => p.name.toLowerCase().includes(profSearch.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name, 'tr'));

    const filteredCourses = [...courses]
        .filter(c => c.name.toLowerCase().includes(courseSearch.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name, 'tr'));

    const handleDownloadReport = async () => {
        setProcessing(true);
        try {
            await reportService.downloadProfessorCoursesReport();
            triggerToast("Akademik rapor başarıyla hazırlandı.", "success");
        } catch (error) {
            triggerToast("Rapor sunucudan alınamadı.", "error");
        } finally {
            setProcessing(false);
        }
    };

    const handleToggleAssign = async (course) => {
        if (!currentProf) return;
        const existingAssignment = currentProf.teaches?.find(t => t.courseId === course.id);

        if (existingAssignment) {
            setConfirmModal({ show: true, teachesId: existingAssignment.id });
        } else {
            setPendingCourse(course);
            setIsAssignModalOpen(true);
        }
    };

    const handleConfirmDeleteAssignment = async () => {
        const id = confirmModal.teachesId;
        setConfirmModal({ show: false, teachesId: null });
        setProcessing(true);
        try {
            await teachesService.delete(id);
            await refreshP();
            triggerToast("Atama başarıyla kaldırıldı.", "success");
        } catch (error) {
            triggerToast("Atama kaldırılırken teknik bir sorun oluştu.", "error");
        } finally {
            setProcessing(false);
        }
    };

    const confirmAssignment = async (details) => {
        setIsAssignModalOpen(false);
        setProcessing(true);
        try {
            await teachesService.assign({ professorId: currentProf.id, courseId: pendingCourse.id, ...details });
            await refreshP();
            triggerToast("Kurs ataması başarıyla tamamlandı.", "success");
        } catch (error) {
            triggerToast("Bu ders zaten profesöre tanımlanmış!", "error");
        } finally {
            setProcessing(false);
            setPendingCourse(null);
        }
    };

    return (
        <div className="grid grid-cols-12 gap-8 animate-in fade-in duration-700">
            {/* SOL PANEL: PROFESÖRLER */}
            <div className="col-span-12 lg:col-span-4 space-y-4">
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200/60 space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Users size={24} /></div>
                        <h3 className="text-lg font-black text-slate-800">1. Profesör Seçimi</h3>
                    </div>
                    {/* PROFESÖR ARAMA */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text" placeholder="İsim ara..." value={profSearch} onChange={(e) => setProfSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:bg-white transition-all outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredProfessors.map(prof => (
                        <div key={prof.id} onClick={() => setSelectedProf(prof)}
                            className={`p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between border-2 group ${currentProf?.id === prof.id ? 'border-indigo-600 bg-white shadow-xl shadow-indigo-100/50 translate-x-2' : 'border-transparent bg-white hover:bg-slate-50'}`}
                        >
                            <div className="flex items-center gap-4">
                                <img src={`http://localhost:8080/api/files/${prof.imageName}`} className="w-12 h-12 rounded-xl object-cover shadow-sm" onError={(e) => e.target.src = `https://ui-avatars.com/api/?background=6366f1&color=fff&name=${prof.name}`} />
                                <div>
                                    <p className={`font-bold text-sm ${currentProf?.id === prof.id ? 'text-indigo-600' : 'text-slate-700'}`}>{prof.name}</p>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{prof.department}</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className={`${currentProf?.id === prof.id ? 'text-indigo-600' : 'text-slate-200'}`} />
                        </div>
                    ))}
                </div>
            </div>

            {/* SAĞ PANEL: KURSLAR */}
            <div className="col-span-12 lg:col-span-8 space-y-4">
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><BookOpen size={24} /></div>
                        <div>
                            <h3 className="text-lg font-black text-slate-800">2. Atama Merkezi</h3>
                            {currentProf && <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">{currentProf.name}</p>}
                        </div>
                    </div>
                    {/* KURS ARAMA */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-48">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input
                                type="text" placeholder="Ders ara..." value={courseSearch} onChange={(e) => setCourseSearch(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:bg-white transition-all outline-none"
                            />
                        </div>
                        <button onClick={handleDownloadReport} disabled={processing} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-50 text-emerald-600 rounded-xl font-black text-[10px] uppercase border border-emerald-100 disabled:opacity-50">
                            <FileText size={14} /> Rapor
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredCourses.map(course => {
                        const isAssigned = currentProf?.teaches?.some(t => t.courseId === course.id);
                        return (
                            <div key={course.id} className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col justify-between group ${isAssigned ? 'border-emerald-100 bg-emerald-50/30' : 'border-white bg-white hover:border-indigo-100'}`}>
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase border ${isAssigned ? 'bg-white border-emerald-200 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                                            {course.credit} AKTS
                                        </span>
                                        {isAssigned && <CheckCircle2 size={16} className="text-emerald-500" />}
                                    </div>
                                    <h4 className="font-bold text-slate-700 text-base leading-snug group-hover:text-indigo-600 transition-colors">{course.name}</h4>
                                </div>
                                <button disabled={!currentProf || processing} onClick={() => handleToggleAssign(course)}
                                    className={`w-full mt-6 py-3.5 rounded-xl font-black text-[10px] uppercase transition-all flex items-center justify-center gap-2 ${!currentProf ? 'bg-slate-50 text-slate-300 cursor-not-allowed' : isAssigned ? 'bg-white border border-rose-100 text-rose-500 hover:bg-rose-500 hover:text-white' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'}`}
                                >
                                    {isAssigned ? <><XCircle size={14} /> Kaldır</> : <><UserCheck size={14} /> Atama Yap</>}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            <AssignmentModal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} onConfirm={confirmAssignment} courseName={pendingCourse?.name} />
            <Toast show={showToast} message={toastMsg} type={toastType} onClose={() => setShowToast(false)} />
            <ConfirmModal
                isOpen={confirmModal.show}
                onClose={() => setConfirmModal({ show: false, teachesId: null })}
                onConfirm={handleConfirmDeleteAssignment}
                title="Atamayı Kaldır"
                message="Bu ders atamasını profesörden kaldırmak istediğinize emin misiniz? Ders ana katalogda kalmaya devam edecektir."
            />
        </div>
    );
};

export default TeachesPage;