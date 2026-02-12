
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';

interface Props {
  onToggleGuide: () => void;
  showGuide: boolean;
}

const Header: React.FC<Props> = ({ onToggleGuide, showGuide }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'th', label: 'ไทย', flag: '🇹🇭' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="py-8 relative" role="banner">
      
      {/* Top Bar Controls */}
      <div className="absolute top-0 right-0 md:top-8 md:right-4 z-20 flex items-center gap-3">
        {/* Language Switcher */}
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-800/50 border border-white/10 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider"
                aria-haspopup="true"
                aria-expanded={isLangOpen}
            >
                <span>{languages.find(l => l.code === language)?.flag}</span>
                <span className="hidden sm:inline">{languages.find(l => l.code === language)?.label}</span>
                <i className={`fas fa-chevron-down text-[10px] ml-1 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}></i>
            </button>
            
            {isLangOpen && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-slate-900 border border-indigo-500/20 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 z-30">
                    {languages.map((lang) => (
                        <button 
                            key={lang.code}
                            onClick={() => {
                                setLanguage(lang.code);
                                setIsLangOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center gap-2 hover:bg-indigo-500/20 transition-colors ${language === lang.code ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300'}`}
                        >
                            <span>{lang.flag}</span>
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>

        <button 
          onClick={onToggleGuide}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
            showGuide 
            ? 'bg-indigo-500 text-white border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]' 
            : 'bg-slate-800/50 text-slate-400 border-white/10 hover:bg-slate-800 hover:text-indigo-400'
          }`}
        >
          <i className="fas fa-info-circle"></i>
          <span className="hidden md:inline">{t('guideBtn')}</span>
        </button>
      </div>

      <div className="text-center mt-12 md:mt-0">
        <div className="inline-flex items-center justify-center p-2 mb-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.1)]" aria-hidden="true">
          <i className="fas fa-wand-magic-sparkles text-indigo-400 mr-2"></i>
          <span className="text-sm font-medium text-indigo-300">{t('badge')}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
          {t('title')} <span className="gradient-text">{t('subtitle')}</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          {t('desc')}
        </p>
      </div>
    </header>
  );
};

export default Header;
