
import React, { useState } from 'react';
import { Participant, Group } from '../types';
import { shuffleArray } from '../utils/helpers';

interface TeamGroupingProps {
  participants: Participant[];
}

const TeamGrouping: React.FC<TeamGroupingProps> = ({ participants }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [config, setConfig] = useState({
    type: 'count', // 'count' or 'size'
    value: 4,
  });

  const handleGenerateGroups = () => {
    if (participants.length === 0) {
      alert('請先導入名單！');
      return;
    }

    // Fix: Explicitly provide the Participant type to shuffleArray to ensure correct inference in TSX
    const shuffled = shuffleArray<Participant>(participants);
    const newGroups: Group[] = [];
    
    let groupCount = 0;
    if (config.type === 'count') {
      groupCount = Math.min(config.value, participants.length);
    } else {
      groupCount = Math.ceil(participants.length / config.value);
    }

    // Initialize groups
    for (let i = 0; i < groupCount; i++) {
      newGroups.push({ id: i + 1, members: [] });
    }

    // Distribute participants
    shuffled.forEach((p, idx) => {
      // Fix: Use a temporary variable to help TypeScript ensure targetGroup is not undefined
      const targetGroup = newGroups[idx % groupCount];
      if (targetGroup) {
        targetGroup.members.push(p);
      }
    });

    setGroups(newGroups);
  };

  const getCardColor = (id: number) => {
    const colors = [
      'bg-blue-50 border-blue-100 text-blue-800 ring-blue-500',
      'bg-emerald-50 border-emerald-100 text-emerald-800 ring-emerald-500',
      'bg-amber-50 border-amber-100 text-amber-800 ring-amber-500',
      'bg-rose-50 border-rose-100 text-rose-800 ring-rose-500',
      'bg-violet-50 border-violet-100 text-violet-800 ring-violet-500',
      'bg-cyan-50 border-cyan-100 text-cyan-800 ring-cyan-500',
    ];
    return colors[(id - 1) % colors.length];
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row items-end gap-6">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-semibold text-slate-700">分組模式</label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setConfig({ ...config, type: 'count' })}
                className={`py-2 rounded-lg text-sm font-medium transition-all ${
                  config.type === 'count' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
                }`}
              >
                固定組數
              </button>
              <button
                onClick={() => setConfig({ ...config, type: 'size' })}
                className={`py-2 rounded-lg text-sm font-medium transition-all ${
                  config.type === 'size' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
                }`}
              >
                固定組內人數
              </button>
            </div>
          </div>

          <div className="w-full md:w-32 space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              {config.type === 'count' ? '分成幾組' : '每組幾人'}
            </label>
            <input
              type="number"
              min="1"
              max={participants.length}
              value={config.value}
              onChange={(e) => setConfig({ ...config, value: parseInt(e.target.value) || 1 })}
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            />
          </div>

          <button
            onClick={handleGenerateGroups}
            className="w-full md:w-auto px-8 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-95"
          >
            生成分組
          </button>
        </div>
      </div>

      {groups.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {groups.map((group) => (
            <div key={group.id} className={`p-5 rounded-2xl border-2 shadow-sm transition-all hover:shadow-md ${getCardColor(group.id)}`}>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold flex items-center gap-2">
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/60 shadow-inner">
                    {group.id}
                  </span>
                  Team {group.id}
                </h4>
                <span className="text-xs font-semibold px-2 py-1 bg-white/40 rounded-full">
                  {group.members.length} 人
                </span>
              </div>
              <ul className="space-y-2">
                {group.members.map((member) => (
                  <li key={member.id} className="flex items-center gap-2 text-sm bg-white/40 px-3 py-1.5 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50"></div>
                    {member.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M17 11h6"/><path d="M20 8v6"/></svg>
          <p className="text-sm font-medium">配置分組參數後點擊「生成分組」</p>
        </div>
      )}
    </div>
  );
};

export default TeamGrouping;
