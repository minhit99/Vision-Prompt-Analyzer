
import React from 'react';
import { ImageState, QueueItem } from '../types';
import Tooltip from './Tooltip';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  imageState: ImageState; // Used for the "main" display if queue is empty, or the active item
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  onAnalyze: () => void;
  queueLength: number;
}

const ImagePreview: React.FC<Props> = ({ imageState, onImageChange, isLoading, onAnalyze, queueLength }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col" role="region" aria-label="Image Upload and Analysis">
      {/* Upload Area */}
      <div className={`relative glass rounded-3xl overflow-hidden transition-all duration-500 border-dashed border-2 border-slate-700 hover:border-indigo-500/50 shadow-2xl ${imageState.previewUrl ? 'min-h-[350px]' : 'min-h-[250px]'}`}>
        {!imageState.previewUrl && queueLength === 0 ? (
          <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer p-8 focus-within:ring-2 focus-within:ring-indigo-500 outline-none hover:bg-slate-800/30 transition-colors">
            <input 
              type="file" 
              className="sr-only" 
              accept="image/*" 
              multiple 
              onChange={onImageChange}
              disabled={isLoading}
              aria-label="Upload image to analyze"
            />
            <Tooltip content={t('upload.tooltip')} position="top">
                <div className="w-20 h-20 bg-slate-800/80 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg border border-white/5" aria-hidden="true">
                <i className="fas fa-cloud-upload-alt text-3xl text-indigo-400"></i>
                </div>
            </Tooltip>
            <p className="text-2xl font-bold mb-3 text-slate-200">{t('upload.drop')}</p>
            <p className="text-slate-400 text-center max-w-xs leading-relaxed">{t('upload.support')}</p>
          </label>
        ) : (
          <div className="absolute inset-0 group bg-slate-900/50">
            {imageState.previewUrl ? (
                <img 
                src={imageState.previewUrl} 
                alt="Selected preview for analysis" 
                className="w-full h-full object-contain p-2"
                />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                    <i className="fas fa-layers text-4xl mb-3"></i>
                    <span>{t('upload.queueStatus')}: {queueLength} items</span>
                </div>
            )}
            
            {/* Overlay Actions */}
            <div className={`absolute inset-0 bg-black/60 transition-opacity flex items-center justify-center backdrop-blur-sm ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100'}`}>
               <label className="cursor-pointer">
                <input 
                  type="file" 
                  className="sr-only" 
                  accept="image/*" 
                  multiple
                  onChange={onImageChange}
                  disabled={isLoading}
                  aria-label="Add more images"
                />
                <span className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white text-slate-900 font-bold hover:scale-105 transition-transform shadow-xl">
                  <i className="fas fa-plus-circle"></i>
                  {t('upload.change')}
                </span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Analyze Button */}
      <div className="mt-6">
        <Tooltip content={t('steps.2.desc')} position="bottom" className="w-full">
            <button
            onClick={onAnalyze}
            disabled={(queueLength === 0 && !imageState.file) || isLoading}
            aria-busy={isLoading}
            aria-live="polite"
            className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-xl
                ${(queueLength === 0 && !imageState.file) || isLoading 
                ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed border border-white/5' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:brightness-110 active:scale-[0.99] border border-transparent shadow-indigo-500/20'}`}
            >
            {isLoading ? (
                <>
                <i className="fas fa-circle-notch fa-spin text-xl"></i>
                <span className="tracking-wide">{t('upload.analyzing')}</span>
                </>
            ) : (
                <>
                <i className="fas fa-wand-magic-sparkles text-xl"></i>
                <span className="tracking-wide">{queueLength > 0 ? `${t('upload.analyze')} (${queueLength})` : t('upload.analyze')}</span>
                </>
            )}
            </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default ImagePreview;
