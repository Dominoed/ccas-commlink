import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { CommunicationsPage } from '@/pages/communications/CommunicationsPage';
import { TagsPage } from '@/pages/tags/TagsPage';
import { SettingsPage } from '@/pages/settings/SettingsPage';
import { Navigation } from '@/components/navigation/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/communications" element={<CommunicationsPage />} />
            <Route path="/tags" element={<TagsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
