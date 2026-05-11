import { NavLink } from 'react-router-dom';
import { Users, BookOpen, Link2, Settings } from 'lucide-react';

const Sidebar = () => {
  const menus = [
    { name: 'Profesörler', path: '/', icon: <Users size={20} /> },
    { name: 'Kurslar', path: '/courses', icon: <BookOpen size={20} /> },
    { name: 'Atama Merkezi', path: '/teaches', icon: <Link2 size={20} /> },
    { name: 'Ayarlar', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 w-64 h-screen pt-20 bg-white border-r border-slate-200 transition-transform">
      <div className="h-full px-4 pb-4 overflow-y-auto custom-scrollbar">
        <p className="text-[15px] font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2">Ana Menü</p>
        <ul className="space-y-1.5 font-medium">
          {menus.map((menu) => (
            <li key={menu.path}>
              <NavLink
                to={menu.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                    isActive
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
                  }`
                }
              >
                <span className="mr-3 transition-transform group-hover:scale-110">{menu.icon}</span>
                <span className="text-sm font-bold">{menu.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;