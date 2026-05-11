import React from 'react';
import { Settings, Users, Code2, Database, Camera, FileText, Share2, Terminal } from 'lucide-react';

const SettingsPage = () => {
    // EKİP LİSTESİ - WhatsApp İş Bölümüne Göre Güncellendi
    const teamMembers = [
        {
            name: "Yusuf Büyüktaş",
                role: "Project Lead & Full Stack",
                icon: <Share2 size={24} />,
                color: "bg-indigo-50 text-indigo-600",
                desc: "Sistem mimarisinin kurgulanması, gelişmiş kullanıcı arayüzü (UI) tasarımı, UX optimizasyonları ve uçtan uca uygulama entegrasyonu."
        },
        {
            name: "Ahmet Hilmi Güler",
                role: "Backend Architect & QA",
                icon: <Database size={24} />,
                color: "bg-emerald-50 text-emerald-600",
                desc: "Veri mimarisinin kurulması, temel CRUD API servislerinin inşası ve sistem güvenilirliği için birim/entegrasyon testlerinin yürütülmesi."
        },

        {
            name: "Faruk Turnalı",
            role: "Report Specialist & Backend",
            icon: <FileText size={24} />,
            color: "bg-rose-50 text-rose-600",
            desc: "JasperReports entegrasyonu ile profesör-kurs eşleşmelerinin akademik PDF raporlarına dönüştürülmesi, test işlemleri."
        },
        {
            name: "Hüseyin Yılmaz",
            role: "Image Specialist & Backend",
            icon: <Camera size={24} />,
            color: "bg-amber-50 text-amber-600",
            desc: "FileService ve FileController üzerinden profil resmi yükleme sisteminin ve sunucu dosya yönetiminin kurulması."
        },
        {
            name: "Ali Caner Sezer",
            role: "Frontend Logic & Hooks",
            icon: <Code2 size={24} />,
            color: "bg-sky-50 text-sky-600",
            desc: "Axios konfigürasyonu, API servis bağlantıları ve veriyi state'e aktaran dinamik Hook yapılarının yazılması."
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* ÜST HEADER KARTI */}
            <div className="flex justify-between items-center bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200/60">
                <div className="flex items-center gap-5">
                    <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl shadow-inner">
                        <Settings size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-none">Hakkımızda</h1>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1 opacity-70">SAÜ Yazılım Mühendisliği Ekibi</p>
                    </div>
                </div>
            </div>

            {/* SİSTEM BİLGİSİ (Koyu Tema) */}
            <div className="bg-[#1E1E2E] p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group border border-white/5">
                <div className="absolute -top-12 -right-12 p-24 opacity-5 group-hover:rotate-45 transition-transform duration-1000">
                    <Settings size={200} className="text-white" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-2 w-12 bg-indigo-500 rounded-full"></div>
                        <h2 className="text-white text-xl font-black uppercase tracking-[0.3em]">SAÜ | DYS v1.0.0</h2>
                    </div>
                    <p className="text-slate-400 max-w-3xl leading-relaxed font-medium text-base italic">
                        "Bu platform, Sakarya Üniversitesi Yazılım Mühendisliği kapsamında hayata geçirilmiş,
                                                 akademik süreçleri modern ve hızlı bir arayüzle buluşturmayı hedefleyen bir projedir.
                                                 Tüm modüller yüksek performans ve güvenlik standartları gözetilerek kodlanmıştır."
                    </p>
                </div>
            </div>

            {/* EKİP ÜYELERİ GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => (
                    <div key={index} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                        <div className="flex flex-col items-center text-center">
                            <div className={`p-5 rounded-3xl mb-6 shadow-sm ${member.color}`}>
                                {member.icon}
                            </div>
                            <h4 className="text-lg font-black text-slate-800 mb-1">{member.name}</h4>
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4 bg-indigo-50 px-3 py-1 rounded-full">
                                {member.role}
                            </span>
                            <div className="w-8 h-[2px] bg-slate-100 mb-4"></div>
                            <p className="text-xs text-slate-400 font-bold leading-relaxed opacity-80">
                                {member.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* FOOTER */}
            <div className="pt-8 pb-4 text-center">
                <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.5em]">
                    © 2026 SAKARYA ÜNİVERSİTESİ YAZILIM MÜHENDİSLİĞİ
                </p>
            </div>
        </div>
    );
};

export default SettingsPage;