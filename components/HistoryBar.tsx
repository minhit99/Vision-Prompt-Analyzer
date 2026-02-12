
import React from 'react';
import { HistoryItem, QueueItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  history: HistoryItem[];
  queue: QueueItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

const HistoryBar: React.FC<Props> = ({ history, queue, activeId, onSelect }) => {
  const { t } = useLanguage();

  if (history.length === 0 && queue.length === 0) return null;

  return (
    <div className="w-full animate-in slide-in-from-left duration-500">
      <div className="flex items-center gap-2 mb-2 px-2">
        <i className="fas fa-history text-indigo-400 text-xs"></i>
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{t('history.title')}</h3>
      </div>
      
      <div className="glass p-3 rounded-2xl overflow-x-auto">
        <div className="flex items-center gap-3 min-w-min">
          
          {/* Queue Items (Pending/Processing) */}
          {queue.map((item) => (
            <div 
              key={item.id} 
              className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-indigo-500/30 bg-slate-800"
            >
              <img 
                src={item.imageState.previewUrl || ''} 
                alt="Queue" 
                className="w-full h-full object-cover opacity-50" 
              />
              <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px]">
                {item.status === 'processing' ? (
                  <i className="fas fa-circle-notch fa-spin text-indigo-400"></i>
                ) : item.status === 'error' ? (
                  <i className="fas fa-exclamation-triangle text-red-400"></i>
                ) : (
                  <i className="fas fa-clock text-slate-400"></i>
                )}
              </div>
            </div>
          ))}

          {/* Divider if both exist */}
          {queue.length > 0 && history.length > 0 && (
            <div className="w-px h-10 bg-white/10 mx-1"></div>
          )}

          {/* History Items (Done) */}
          {history.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 transition-all border-2 group ${
                activeId === item.id 
                ? 'border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] scale-105 z-10' 
                : 'border-transparent hover:border-white/20 opacity-70 hover:opacity-100 grayscale hover:grayscale-0'
              }`}
            >
              <img 
                src={item.imageState.previewUrl || ''} 
                alt="History" 
                className="w-full h-full object-cover" 
              />
              {activeId === item.id && (
                <div className="absolute inset-0 bg-indigo-500/10 pointer-events-none"></div>
              )}
            </button>
          ))}

           {history.length === 0 && queue.length === 0 && (
             <span className="text-xs text-slate-500 italic px-2">{t('history.empty')}</span>
           )}
        </div>
      </div>
    </div>
  );
};

export default HistoryBar;
