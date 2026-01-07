
import React, { useState, useEffect, useCallback } from 'react';
import { Participant, DrawHistory } from '../types';

interface LuckyDrawProps {
  participants: Participant[];
}

const LuckyDraw: React.FC<LuckyDrawProps> = ({ participants }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [allowRepeat, setAllowRepeat] = useState(false);
  const [currentPool, setCurrentPool] = useState<Participant[]>([...participants]);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [winner, setWinner] = useState<Participant | null>(null);
  const [history, setHistory] = useState<DrawHistory[]>([]);

  useEffect(() => {
    setCurrentPool([...participants]);
  }, [participants]);

  const startDraw = () => {
    if (currentPool.length === 0) {
      alert(allowRepeat ? '請先導入名單！' : '獎池已空，請重新設置名單或允許重複抽取。');
      return;
    }

    setIsSpinning(true);
    setWinner(null);

    // Animation: cycling through names
    let duration = 2000;
    let startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        setDisplayIndex(Math.floor(Math.random() * currentPool.length));
        requestAnimationFrame(animate);
      } else {
        finishDraw();
      }
    };

    requestAnimationFrame(animate);
  };

  const finishDraw = () => {
    const finalIndex = Math.floor(Math.random() * currentPool.length);
    const selectedWinner = currentPool[finalIndex];
    
    setWinner(selectedWinner);
    setIsSpinning(false);
    
    setHistory(prev => [
      { timestamp: Date.now(), winner: selectedWinner.name },
      ...prev
    ]);

    if (!allowRepeat) {
      setCurrentPool(prev => prev.filter(p => p.id !== selectedWinner.id));
    }
  };

  const resetPool = () => {
    setCurrentPool([...participants]);
    setWinner(null);
    setHistory([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
          {/* Visual decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          
          <div className="text-center space-y-8 z-10 w-full">
            <h3 className="text-slate-400 text-sm font-bold tracking-widest uppercase">
              {isSpinning ? '正在隨機選取中...' : (winner ? '恭喜中獎者！' : '準備好開始抽籤了嗎？')}
            </h3>

            <div className={`text-6xl md:text-8xl font-black transition-all duration-100 ${
              isSpinning ? 'text-slate-300 blur-[2px]' : 'text-indigo-600'
            }`}>
              {isSpinning 
                ? currentPool[displayIndex]?.name 
                : (winner ? winner.name : '???')}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                disabled={isSpinning || currentPool.length === 0}
                onClick={startDraw}
                className={`group relative px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                  !isSpinning && 'hover:bg-indigo-700 hover:-translate-y-1'
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19 7-7 3 3-7 7-3-3Z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5Z"/><path d="m2 2 5 22 5-5 10 10 2-2-10-10 5-5L2 2Z"/></svg>
                  {isSpinning ? '抽獎中...' : '立即抽取'}
                </span>
              </button>
            </div>
          </div>

          {!isSpinning && !winner && (
            <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-sm flex items-center gap-2">
              目前獎池共有 <span className="text-indigo-600 font-bold">{currentPool.length}</span> 位參與者
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">抽籤設定</h3>
            <button onClick={resetPool} className="text-xs text-indigo-600 hover:underline">重置獎池</button>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={allowRepeat}
                  onChange={(e) => setAllowRepeat(e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">允許重複中獎</span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            中獎紀錄
          </h3>
          <span className="text-xs bg-slate-200 px-2 py-0.5 rounded-full text-slate-600">{history.length} 次</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {history.length > 0 ? (
            history.map((item, idx) => (
              <div key={item.timestamp} className="flex items-center justify-between p-3 bg-indigo-50/30 rounded-xl border border-indigo-100/50 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-bold">
                    {history.length - idx}
                  </div>
                  <span className="font-medium text-slate-800">{item.winner}</span>
                </div>
                <span className="text-[10px] text-slate-400">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-400 italic text-sm">
              尚未開始抽取
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LuckyDraw;
