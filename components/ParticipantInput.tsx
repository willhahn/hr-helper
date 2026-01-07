
import React, { useState } from 'react';
import { Participant } from '../types';
import { parseParticipants } from '../utils/helpers';

interface ParticipantInputProps {
  participants: Participant[];
  setParticipants: (p: Participant[]) => void;
}

const ParticipantInput: React.FC<ParticipantInputProps> = ({ participants, setParticipants }) => {
  const [textInput, setTextInput] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
  };

  const handleApplyText = () => {
    const newParticipants = parseParticipants(textInput);
    if (newParticipants.length > 0) {
      setParticipants(newParticipants);
      alert(`成功導入 ${newParticipants.length} 位參與者！`);
    } else {
      alert('請輸入有效姓名');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const newParticipants = parseParticipants(content);
      if (newParticipants.length > 0) {
        setParticipants(newParticipants);
        alert(`成功從 CSV 導入 ${newParticipants.length} 位參與者！`);
      }
    };
    reader.readAsText(file);
  };

  const clearList = () => {
    if (window.confirm('確定要清空名單嗎？')) {
      setParticipants([]);
      setTextInput('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M9 15h6"/></svg>
          數據導入
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              手動輸入姓名 (一行一個姓名，或用逗號分隔)
            </label>
            <textarea
              className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all resize-none text-sm"
              placeholder="例如：&#10;王小明&#10;陳曉華&#10;李大同"
              value={textInput}
              onChange={handleTextChange}
            />
            <button
              onClick={handleApplyText}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-sm"
            >
              應用名單
            </button>
          </div>

          <div className="flex flex-col justify-between space-y-4">
            <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center space-y-3 bg-slate-50">
              <div className="p-3 bg-white rounded-full shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">上傳 CSV 文件</p>
                <p className="text-xs text-slate-500">支持 .csv 或 .txt 文件</p>
              </div>
              <input
                type="file"
                accept=".csv,.txt"
                onChange={handleFileUpload}
                className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
              <h3 className="text-sm font-semibold text-amber-800 flex items-center gap-1 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                當前狀態
              </h3>
              <p className="text-xs text-amber-700">
                名單共有 <strong>{participants.length}</strong> 人。分組或抽籤時會以此名單為準。
              </p>
              {participants.length > 0 && (
                <button
                  onClick={clearList}
                  className="mt-3 text-xs text-red-600 hover:text-red-700 font-medium underline"
                >
                  清空所有數據
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold mb-4">預覽名單 ({participants.length})</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
          {participants.length > 0 ? (
            participants.map((p) => (
              <div key={p.id} className="bg-slate-50 px-3 py-2 rounded-lg text-sm text-slate-600 border border-slate-100 text-center truncate">
                {p.name}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-slate-400 italic">
              尚未導入任何名單
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticipantInput;
