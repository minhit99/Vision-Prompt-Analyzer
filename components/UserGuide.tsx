
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const UserGuide: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { t } = useLanguage();

  const steps = [
    { 
      icon: 'fa-cloud-upload-alt', 
      title: t('steps.1.title'), 
      desc: t('steps.1.desc')
    },
    { 
      icon: 'fa-microchip', 
      title: t('steps.2.title'), 
      desc: t('steps.2.desc')
    },
    { 
      icon: 'fa-sliders-h', 
      title: t('steps.3.title'), 
      desc: t('steps.3.desc')
    },
    { 
      icon: 'fa-wand-magic-sparkles', 
      title: t('steps.4.title'), 
      desc: t('steps.4.desc')
    }
  ];

  const dnaComponents = [
    { label: t('dna.subject.label'), icon: 'fa-user-circle', color: 'text-indigo-400', desc: t('dna.subject.desc') },
    { label: t('dna.style.label'), icon: 'fa-palette', color: 'text-pink-400', desc: t('dna.style.desc') },
    { label: t('dna.env.label'), icon: 'fa-mountain', color: 'text-emerald-400', desc: t('dna.env.desc') },
    { label: t('dna.color.label'), icon: 'fa-swatchbook', color: 'text-purple-400', desc: t('dna.color.desc') },
    { label: t('dna.typo.label'), icon: 'fa-font', color: 'text-amber-400', desc: t('dna.typo.desc') },
    { label: t('dna.obj.label'), icon: 'fa-shapes', color: 'text-blue-400', desc: t('dna.obj.desc') }
  ];

  return (
    <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500 relative z-10">
      <div className="glass rounded-3xl p-6 border border-indigo-500/20 relative overflow-hidden">
        
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="flex items-center justify-between mb-6 relative z-10">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <i className="fas fa-book-open text-xs"></i>
            </span>
            <span>{t('guideBtn')}</span>
          </h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors flex items-center justify-center"
            aria-label="Close Guide"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Workflow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10 mb-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-slate-900/60 p-5 rounded-2xl border border-white/5 flex flex-col gap-3 relative overflow-hidden group hover:border-indigo-500/30 transition-all">
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all"></div>
              
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5 flex items-center justify-center text-indigo-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                <i className={`fas ${step.icon} text-lg`}></i>
              </div>
              
              <div>
                <h4 className="font-bold text-slate-200 text-sm mb-1">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="h-px bg-white/5 w-full mb-8"></div>

        {/* Detected Components Breakdown */}
        <div className="relative z-10">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Detected Prompt DNA</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {dnaComponents.map((comp, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/30 border border-white/5 hover:bg-slate-800/50 transition-colors">
                        <div className={`mt-0.5 w-6 h-6 rounded flex items-center justify-center ${comp.color} bg-white/5 shrink-0`}>
                            <i className={`fas ${comp.icon} text-xs`}></i>
                        </div>
                        <div>
                            <span className="block text-xs font-bold text-slate-300 mb-0.5">{comp.label}</span>
                            <span className="block text-[10px] text-slate-500 leading-tight">{comp.desc}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default UserGuide;
