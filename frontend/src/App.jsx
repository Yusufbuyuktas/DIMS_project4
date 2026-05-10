import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Layout Bileşenleri
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
// Sayfalar
import ProfessorsPage from './pages/ProfessorsPage';
import TeachesPage from './pages/TeachesPage';
import CoursesPage from './pages/CoursesPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Üst Bar */}
        <Navbar />

        <div className="flex flex-1 pt-16">
          {/* Sol Menü */}
          <Sidebar />

          {/* Ana İçerik Alanı */}
          {/* sm:ml-64 Sidebar genişliği kadar boşluk bırakır */}
          <main className="flex-1 p-8 sm:ml-64 min-h-screen">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<ProfessorsPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/teaches" element={<TeachesPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;