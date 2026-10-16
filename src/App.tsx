import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { StartupDetail } from './pages/StartupDetail';
import { TeamMembers } from './pages/TeamMembers';
import { Settings } from './pages/Settings';
import { Auth } from './pages/Auth';
import { NewStartupModal } from './components/NewStartupModal';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isNewStartupOpen, setIsNewStartupOpen] = useState(false);

  // Landing page has its own specialized hero header
  const isLandingPage = location.pathname === '/';
  const isAuthPage = location.pathname === '/auth';

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A111E] text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col">
      {!isLandingPage && !isAuthPage && (
        <Navbar onOpenNewStartup={() => setIsNewStartupOpen(true)} />
      )}

      <main className="flex-1">{children}</main>

      <NewStartupModal
        isOpen={isNewStartupOpen}
        onClose={() => setIsNewStartupOpen(false)}
      />
    </div>
  );
};

export const AppContent: React.FC = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/startups/:id" element={<StartupDetail />} />
        <Route path="/team" element={<TeamMembers />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
