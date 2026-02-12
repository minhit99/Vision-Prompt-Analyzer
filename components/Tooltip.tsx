
import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top', className = '' }) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: '-bottom-1 left-1/2 -translate-x-1/2 border-r border-b',
    bottom: '-top-1 left-1/2 -translate-x-1/2 border-l border-t',
    left: '-right-1 top-1/2 -translate-y-1/2 border-r border-t',
    right: '-left-1 top-1/2 -translate-y-1/2 border-l border-b',
  };

  return (
    <div className={`relative flex items-center group w-fit ${className}`}>
      {children}
      <div className={`absolute ${positionClasses[position]} hidden group-hover:block w-48 p-3 bg-slate-900/95 border border-indigo-500/30 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)] text-[11px] leading-relaxed text-slate-300 z-50 pointer-events-none backdrop-blur-md animate-in fade-in zoom-in-95 duration-200`}>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 pointer-events-none"></div>
        <span className="relative z-10 font-medium">{content}</span>
        <div className={`absolute w-2 h-2 bg-slate-900 border-indigo-500/30 rotate-45 ${arrowClasses[position]}`}></div>
      </div>
    </div>
  );
};

export default Tooltip;
