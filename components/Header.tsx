
import React from 'react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  participantCount: number;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, participantCount }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
            HR Event Toolkit
          </h1>
        </div>

        <nav className="flex bg-slate-100 p-1 rounded-xl shadow-inner">
          <button
            onClick={() => setActiveTab(TabType.LIST)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === TabType.LIST
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            名單管理
          </button>
          <button
            onClick={() => setActiveTab(TabType.LUCKY_DRAW)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === TabType.LUCKY_DRAW
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            獎品抽籤
          </button>
          <button
            onClick={() => setActiveTab(TabType.GROUPING)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === TabType.GROUPING
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            自動分組
          </button>
        </nav>

        <div className="hidden md:block">
          <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-100">
            當前名單：{participantCount} 人
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
