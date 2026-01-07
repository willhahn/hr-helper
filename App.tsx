
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ParticipantInput from './components/ParticipantInput';
import LuckyDraw from './components/LuckyDraw';
import TeamGrouping from './components/TeamGrouping';
import { Participant, TabType } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.LIST);
  const [participants, setParticipants] = useState<Participant[]>([]);

  // Local storage persistence
  useEffect(() => {
    const saved = localStorage.getItem('hr_participants');
    if (saved) {
      try {
        setParticipants(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load participants from localStorage');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hr_participants', JSON.stringify(participants));
  }, [participants]);

  const renderContent = () => {
    switch (activeTab) {
      case TabType.LIST:
        return (
          <ParticipantInput 
            participants={participants} 
            setParticipants={setParticipants} 
          />
        );
      case TabType.LUCKY_DRAW:
        return (
          <LuckyDraw 
            participants={participants} 
          />
        );
      case TabType.GROUPING:
        return (
          <TeamGrouping 
            participants={participants} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        participantCount={participants.length} 
      />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {/* Banner for empty state */}
        {participants.length === 0 && activeTab !== TabType.LIST && (
          <div className="mb-8 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-full text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-indigo-900">名單為空</p>
                <p className="text-xs text-indigo-700">請先到「名單管理」標籤中導入參與者名單。</p>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab(TabType.LIST)}
              className="text-sm font-bold text-indigo-600 hover:text-indigo-800"
            >
              去導入 &rarr;
            </button>
          </div>
        )}

        {renderContent()}
      </main>

      <footer className="py-8 text-center text-slate-400 text-xs border-t border-slate-100 mt-12">
        <p>© {new Date().getFullYear()} HR Event Toolkit. Designed for modern human resource management.</p>
      </footer>
    </div>
  );
};

export default App;
