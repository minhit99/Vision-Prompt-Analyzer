
import React, { useState, useEffect, useRef } from 'react';
import { AnalysisResult, TextElement, ObjectDetail } from '../types';
import { generateImageFromPrompt } from '../services/geminiService';
import Tooltip from './Tooltip';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  result: AnalysisResult | null;
  isLoading: boolean;
}

const STYLE_PRESETS = [
  { id: 'none', label: 'None', modifier: '' },
  { id: 'photorealistic', label: 'Photorealistic', modifier: 'highly detailed photorealistic 8k, unreal engine 5 render, ray tracing' },
  { id: 'cinematic', label: 'Cinematic', modifier: 'cinematic lighting, dramatic shadows, anamorphic lens flares, film grain, epic atmosphere' },
  { id: 'anime', label: 'Anime', modifier: 'studio ghibli style, vibrant colors, detailed anime art, cel shaded' },
  { id: 'minimalist', label: 'Minimalist', modifier: 'modern minimalist style, clean lines, plenty of whitespace, simple composition' },
  { id: 'vintage', label: 'Vintage', modifier: 'vintage film aesthetic, retro color grading, faded edges, nostalgic feel, classic photography' },
  { id: 'neon', label: 'Neon / Cyberpunk', modifier: 'vibrant neon glow, electric colors, cyberpunk night aesthetic, high contrast luminescence' },
  { id: 'watercolor', label: 'Watercolor', modifier: 'delicate watercolor painting, soft fluid brushstrokes, hand-painted textures, artistic paint bleeds' },
];

const LENS_OPTIONS = [
  { id: 'none', label: 'Default', modifier: '' },
  { id: '35mm', label: '35mm Street', modifier: 'shot on 35mm lens, street photography aesthetic, slight distortion, candid feel' },
  { id: '50mm', label: '50mm Prime', modifier: 'shot on 50mm prime lens, natural field of view, crisp details' },
  { id: '85mm', label: '85mm Portrait', modifier: 'shot on 85mm f/1.8 lens, shallow depth of field, beautiful bokeh, portrait photography' },
  { id: 'macro', label: 'Macro', modifier: 'macro photography, extreme close-up, incredible detail, shallow depth of field' },
  { id: 'wide', label: 'Wide Angle', modifier: 'wide angle lens, expansive view, epic scale, dynamic composition' },
  { id: 'fisheye', label: 'Fisheye', modifier: 'fisheye lens, strong barrel distortion, stylized circular view' },
];

const ASPECT_RATIOS = [
  { id: '1:1', label: 'Square', icon: 'fa-square' },
  { id: '16:9', label: 'Landscape', icon: 'fa-tv' },
  { id: '9:16', label: 'Portrait', icon: 'fa-mobile-alt' },
  { id: '4:3', label: 'Standard', icon: 'fa-tablet-alt' },
  { id: '3:4', label: 'Vertical', icon: 'fa-book-open' },
];

const FeaturePromptBadge: React.FC<{ 
  prompt: string; 
  label: string; 
  compact?: boolean;
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}> = ({ prompt, label, compact, onGenerate, isGenerating }) => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const copy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <button 
        onClick={copy}
        disabled={isGenerating}
        aria-label={`Copy prompt for ${label}`}
        title={`Copy prompt for ${label}`}
        className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all border outline-none focus:ring-2 focus:ring-indigo-500/50 ${
          copied 
          ? 'bg-green-500/20 border-green-500/50 text-green-400' 
          : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 active:scale-95'
        }`}
      >
        <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`} aria-hidden="true"></i>
        {!compact && (copied ? t('result.copied') : t('result.getPrompt'))}
      </button>
      
      <button
        onClick={() => onGenerate(prompt)}
        disabled={isGenerating}
        aria-label={`Generate image for ${label}`}
        title={`Generate image from this prompt`}
        className={`flex items-center justify-center w-8 h-7 rounded-md text-[10px] transition-all border outline-none focus:ring-2 focus:ring-purple-500/50 ${
          isGenerating 
          ? 'bg-slate-800 border-slate-700 text-slate-500 animate-pulse cursor-wait'
          : 'bg-purple-500/10 border-purple-500/20 text-purple-300 hover:bg-purple-500/30 active:scale-95'
        }`}
      >
        <i className={`fas ${isGenerating ? 'fa-spinner fa-spin' : 'fa-wand-magic-sparkles'}`} aria-hidden="true"></i>
      </button>
    </div>
  );
};

const ApplyToggle: React.FC<{ 
  applied: boolean; 
  onChange: (val: boolean) => void; 
}> = ({ applied, onChange }) => (
  <button 
    onClick={() => onChange(!applied)}
    className={`w-8 h-4 rounded-full relative transition-colors duration-200 outline-none focus:ring-2 focus:ring-indigo-500/50 ${applied ? 'bg-indigo-500' : 'bg-slate-700'}`}
    aria-label={applied ? "Remove from master prompt" : "Include in master prompt"}
  >
    <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-200 ${applied ? 'left-4.5' : 'left-0.5'}`} />
  </button>
);

const ResultDisplay: React.FC<Props> = ({ result, isLoading }) => {
  const { t } = useLanguage();
  const [editableResult, setEditableResult] = useState<AnalysisResult | null>(null);
  const [copiedMaster, setCopiedMaster] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState<{message: string, type: 'safety' | 'limit' | 'other'} | null>(null);
  
  // New State for Additional Options
  const [selectedStyleId, setSelectedStyleId] = useState('none');
  const [selectedLensId, setSelectedLensId] = useState('none');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [negativePrompt, setNegativePrompt] = useState('');
  
  const [componentGallery, setComponentGallery] = useState<Record<string, {url: string, label: string}>>({});
  const [isBulkGenerating, setIsBulkGenerating] = useState(false);
  
  const isInternalUpdate = useRef(false);

  useEffect(() => {
    if (result) {
      const initial = JSON.parse(JSON.stringify(result));
      initial.subjectApplied = true;
      initial.styleApplied = true;
      initial.contextApplied = true;
      initial.colorPaletteApplied = true;
      initial.textContent = (initial.textContent || []).map((t: any) => ({ ...t, applied: true }));
      initial.objects = (initial.objects || []).map((o: any) => ({ ...o, applied: true }));
      
      setEditableResult(initial);
      setComponentGallery({});
      setGeneratedImage(null);
      setGenError(null);
      // Reset options on new analysis
      setSelectedStyleId('none');
      setSelectedLensId('none');
      setAspectRatio('1:1');
      setNegativePrompt('');
    } else {
      setEditableResult(null);
    }
  }, [result]);

  useEffect(() => {
    if (!editableResult || isInternalUpdate.current) {
        isInternalUpdate.current = false;
        return;
    }

    const constructMaster = () => {
        const parts = [
            editableResult.subjectApplied ? editableResult.subjectPrompt : null,
            editableResult.styleApplied ? editableResult.stylePrompt : null,
            editableResult.contextApplied ? editableResult.contextPrompt : null,
            ...(editableResult.objects || []).filter(o => o.applied).map(o => o.prompt),
            ...(editableResult.textContent || []).filter(t => t.applied).map(t => t.prompt),
            editableResult.colorPaletteApplied ? `Color palette features: ${(editableResult.colorPalette || []).join(', ')}` : null
        ].filter(p => p && p.trim().length > 0);

        return parts.join('. ');
    };

    const newMaster = constructMaster();
    
    if (newMaster !== editableResult.optimizedPrompt) {
        isInternalUpdate.current = true;
        setEditableResult(prev => prev ? { ...prev, optimizedPrompt: newMaster } : null);
    }
  }, [
    editableResult?.subjectPrompt, 
    editableResult?.subjectApplied,
    editableResult?.stylePrompt, 
    editableResult?.styleApplied,
    editableResult?.contextPrompt, 
    editableResult?.contextApplied,
    editableResult?.objects, 
    editableResult?.textContent, 
    editableResult?.colorPalette,
    editableResult?.colorPaletteApplied
  ]);

  const copyMaster = () => {
    if (!editableResult) return;
    navigator.clipboard.writeText(editableResult.optimizedPrompt);
    setCopiedMaster(true);
    setTimeout(() => setCopiedMaster(false), 2000);
  };

  const handleGenerate = async (prompt: string, overrideAspectRatio?: string) => {
    setIsGenerating(true);
    setGenError(null);
    
    // Construct final prompt with overrides
    let finalPrompt = prompt;

    // Apply Style Override
    const selectedStyle = STYLE_PRESETS.find(s => s.id === selectedStyleId);
    if (selectedStyle && selectedStyleId !== 'none') {
        finalPrompt += `. Style override: ${selectedStyle.modifier}`;
    }

    // Apply Lens Override
    const selectedLens = LENS_OPTIONS.find(l => l.id === selectedLensId);
    if (selectedLens && selectedLensId !== 'none') {
        finalPrompt += `. Lens properties: ${selectedLens.modifier}`;
    }

    if (negativePrompt.trim()) {
      finalPrompt += ` Avoid and exclude: ${negativePrompt}.`;
    }

    const ratioToUse = overrideAspectRatio || aspectRatio;

    try {
      const url = await generateImageFromPrompt(finalPrompt, ratioToUse);
      setGeneratedImage(url);
      setTimeout(() => {
        document.getElementById('generation-anchor')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setGenError({ type: 'other', message: err?.message || t('errors.gen') });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBulkGenerate = async () => {
    if (!editableResult) return;
    setIsBulkGenerating(true);
    setComponentGallery({});
    const itemsToGenerate = [
      ...(editableResult.textContent || []).map(t => ({ id: `text-${t.text}`, prompt: t.prompt, label: `Text: ${t.text}` })),
      ...(editableResult.objects || []).map((o, idx) => ({ id: `obj-${idx}`, prompt: o.prompt, label: `Object: ${o.label}` }))
    ];
    for (const item of itemsToGenerate) {
      try {
        const url = await generateImageFromPrompt(item.prompt, "1:1"); // Force 1:1 for component gallery
        setComponentGallery(prev => ({ ...prev, [item.id]: { url, label: item.label } }));
      } catch (err) { console.error(err); }
    }
    setIsBulkGenerating(false);
    setTimeout(() => { document.getElementById('gallery-anchor')?.scrollIntoView({ behavior: 'smooth' }); }, 100);
  };

  const generateWithPalette = () => {
    if (!editableResult?.colorPalette) return;
    const palettePrompt = `An abstract digital art piece with clean geometric shapes, adhering strictly to this palette: ${editableResult.colorPalette.join(', ')}.`;
    handleGenerate(palettePrompt, "1:1");
  };

  const updateField = (field: keyof AnalysisResult, value: any) => {
    if (!editableResult) return;
    setEditableResult({ ...editableResult, [field]: value });
  };

  const updateArrayField = (field: 'textContent' | 'objects', index: number, subField: string, value: any) => {
    if (!editableResult) return;
    const newArray = JSON.parse(JSON.stringify(editableResult[field]));
    newArray[index][subField] = value;
    updateField(field, newArray);
  };

  const resetToAnalysis = () => {
    if (result) {
      const initial = JSON.parse(JSON.stringify(result));
      initial.subjectApplied = true;
      initial.styleApplied = true;
      initial.contextApplied = true;
      initial.colorPaletteApplied = true;
      initial.textContent = (initial.textContent || []).map((t: any) => ({ ...t, applied: true }));
      initial.objects = (initial.objects || []).map((o: any) => ({ ...o, applied: true }));
      setEditableResult(initial);
      setSelectedStyleId('none');
      setSelectedLensId('none');
      setAspectRatio('1:1');
    }
  };

  if (isLoading) {
    return (
      <div className="glass rounded-3xl p-8 animate-pulse space-y-8">
        <div className="flex items-center gap-4"><div className="w-12 h-12 bg-slate-800 rounded-xl"></div><div className="h-4 bg-slate-800 rounded w-1/4"></div></div>
        <div className="grid grid-cols-2 gap-4"><div className="h-32 bg-slate-800 rounded-2xl"></div><div className="h-32 bg-slate-800 rounded-2xl"></div></div>
      </div>
    );
  }

  if (!editableResult) {
    return (
      <div className="glass rounded-3xl p-12 flex flex-col items-center justify-center text-center opacity-40 border-dashed border-2 border-slate-700 min-h-[500px]">
        <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-8"><i className="fas fa-microchip text-4xl text-slate-600"></i></div>
        <h3 className="text-2xl font-bold mb-3">System Idle</h3>
        <p className="text-slate-500 max-w-sm">Awaiting image analysis...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-3xl p-6 md:p-8 border border-indigo-500/20 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20"><i className="fas fa-edit text-indigo-400 text-sm"></i></span>
            {t('result.dnaLab')}
          </h2>
          <div className="flex items-center gap-3">
            <Tooltip content="Revert all manual edits and restore the original AI analysis.">
                <button onClick={resetToAnalysis} className="px-3 py-1 rounded-full bg-slate-800 border border-white/5 text-slate-400 text-[10px] font-bold tracking-widest uppercase hover:text-white">{t('result.reset')}</button>
            </Tooltip>
            <Tooltip content="Any changes you make to the components below are immediately reflected in the Master Synthesis Prompt.">
                <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold tracking-widest uppercase cursor-help">{t('result.autoSync')}</div>
            </Tooltip>
          </div>
        </div>

        {/* Global Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className={`bg-slate-900/40 p-5 rounded-2xl border transition-all ${editableResult.subjectApplied ? 'border-indigo-500/30' : 'border-white/5 opacity-60'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <ApplyToggle applied={!!editableResult.subjectApplied} onChange={(v) => updateField('subjectApplied', v)} />
                <Tooltip content={t('dna.subject.desc')}>
                    <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest cursor-help border-b border-dashed border-indigo-500/30 pb-0.5">{t('dna.subject.label')}</span>
                </Tooltip>
              </div>
              <FeaturePromptBadge label="subject" prompt={editableResult.subjectPrompt} onGenerate={(p) => handleGenerate(p, "1:1")} isGenerating={isGenerating} />
            </div>
            <textarea 
              value={editableResult.subjectPrompt}
              onChange={(e) => updateField('subjectPrompt', e.target.value)}
              className="w-full bg-transparent border-none p-0 text-slate-100 font-semibold text-sm leading-tight focus:outline-none resize-none min-h-[50px]"
              placeholder={t('result.subjectPrompt')}
            />
          </div>
          <div className={`bg-slate-900/40 p-5 rounded-2xl border transition-all ${editableResult.styleApplied ? 'border-indigo-500/30' : 'border-white/5 opacity-60'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <ApplyToggle applied={!!editableResult.styleApplied} onChange={(v) => updateField('styleApplied', v)} />
                <Tooltip content={t('dna.style.desc')}>
                    <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest cursor-help border-b border-dashed border-indigo-500/30 pb-0.5">{t('dna.style.label')}</span>
                </Tooltip>
              </div>
              <FeaturePromptBadge label="style" prompt={editableResult.stylePrompt} onGenerate={(p) => handleGenerate(p, "1:1")} isGenerating={isGenerating} />
            </div>
            <textarea 
              value={editableResult.stylePrompt}
              onChange={(e) => updateField('stylePrompt', e.target.value)}
              className="w-full bg-transparent border-none p-0 text-slate-100 font-semibold text-sm leading-tight focus:outline-none resize-none min-h-[50px]"
              placeholder={t('result.stylePrompt')}
            />
          </div>
        </div>

        <div className={`mb-10 bg-indigo-950/10 p-5 rounded-2xl border transition-all ${editableResult.contextApplied ? 'border-indigo-500/30' : 'border-white/5 opacity-60'}`}>
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-3">
                <ApplyToggle applied={!!editableResult.contextApplied} onChange={(v) => updateField('contextApplied', v)} />
                <Tooltip content={t('dna.env.desc')}>
                    <h3 className="text-xs uppercase font-bold text-slate-500 tracking-widest cursor-help border-b border-dashed border-slate-500/30 pb-0.5">{t('dna.env.label')}</h3>
                </Tooltip>
             </div>
            <FeaturePromptBadge label="environment" prompt={editableResult.contextPrompt} onGenerate={(p) => handleGenerate(p, "1:1")} isGenerating={isGenerating} />
          </div>
          <textarea
            value={editableResult.contextPrompt}
            onChange={(e) => updateField('contextPrompt', e.target.value)}
            className="w-full bg-transparent border-none p-0 text-slate-300 italic leading-relaxed focus:outline-none resize-none min-h-[60px] text-sm"
            placeholder={t('result.envPrompt')}
          />
        </div>

        {/* Color Mapping Section */}
        <div className={`mb-10 p-5 rounded-2xl border transition-all ${editableResult.colorPaletteApplied ? 'border-purple-500/30 bg-purple-950/5' : 'border-white/5 opacity-60 bg-slate-900/40'}`}>
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-3">
                <ApplyToggle applied={!!editableResult.colorPaletteApplied} onChange={(v) => updateField('colorPaletteApplied', v)} />
                <Tooltip content={t('dna.color.desc')}>
                    <h3 className="text-xs uppercase font-bold text-slate-500 tracking-widest cursor-help border-b border-dashed border-slate-500/30 pb-0.5">{t('dna.color.label')}</h3>
                </Tooltip>
             </div>
             <Tooltip content="Generate abstract art using ONLY these colors.">
                <button 
                    onClick={generateWithPalette}
                    disabled={isGenerating}
                    className="text-[9px] font-bold uppercase tracking-widest text-purple-400 hover:text-purple-300 flex items-center gap-1.5 transition-colors focus:ring-2 focus:ring-purple-500/50 px-2 py-1 rounded"
                >
                    <i className={`fas ${isGenerating ? 'fa-spinner fa-spin' : 'fa-wand-magic-sparkles'}`}></i>
                    {t('result.genPalette')}
                </button>
             </Tooltip>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {(editableResult.colorPalette || []).map((color, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer group" 
                onClick={() => {
                  navigator.clipboard.writeText(color);
                }}
                title="Click to copy hex"
              >
                <div 
                  className="w-5 h-5 rounded-md border border-white/10 shadow-sm shrink-0" 
                  style={{ backgroundColor: color }}
                ></div>
                <span className="text-[10px] font-mono text-slate-300 truncate group-hover:text-indigo-400">
                  {color}
                </span>
              </div>
            ))}
          </div>
        </div>

        {editableResult.textContent && editableResult.textContent.length > 0 && (
          <div className="mb-10">
            <Tooltip content={t('dna.typo.desc')}>
                <h3 className="text-xs uppercase font-bold text-slate-500 tracking-widest mb-4 w-fit cursor-help border-b border-dashed border-slate-500/30 pb-0.5">{t('result.typoMatrix')}</h3>
            </Tooltip>
            <div className="grid grid-cols-1 gap-3">
              {editableResult.textContent.map((item, idx) => (
                <div key={idx} className={`flex flex-col p-4 bg-slate-900/80 rounded-2xl border transition-all ${item.applied ? 'border-indigo-500/30' : 'border-white/5 opacity-60'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <ApplyToggle applied={!!item.applied} onChange={(v) => updateArrayField('textContent', idx, 'applied', v)} />
                      <span className="text-[10px] font-bold text-indigo-500 uppercase">"{item.text}"</span>
                    </div>
                    <FeaturePromptBadge label={`text "${item.text}"`} prompt={item.prompt} compact onGenerate={(p) => handleGenerate(p, "1:1")} isGenerating={isGenerating} />
                  </div>
                  <textarea 
                    value={item.prompt}
                    onChange={(e) => updateArrayField('textContent', idx, 'prompt', e.target.value)}
                    className="bg-transparent border-none p-0 text-slate-400 text-xs italic focus:outline-none w-full resize-none min-h-[40px]"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <Tooltip content={t('dna.obj.desc')}>
                <h3 className="text-xs uppercase font-bold text-slate-500 tracking-widest cursor-help border-b border-dashed border-slate-500/30 pb-0.5">{t('result.compDist')}</h3>
            </Tooltip>
            <Tooltip content="Generates small preview images for EACH object individually.">
                <button onClick={handleBulkGenerate} disabled={isBulkGenerating || isGenerating} className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-indigo-500/10 border-indigo-500/20 text-indigo-400">
                <i className={`fas ${isBulkGenerating ? 'fa-spinner fa-spin' : 'fa-layer-group'}`}></i> {t('result.visualize')}
                </button>
            </Tooltip>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {editableResult.objects.map((obj, idx) => (
              <div key={idx} className={`bg-slate-900/50 p-4 rounded-2xl border flex items-start gap-4 transition-all ${obj.applied ? 'border-indigo-500/30' : 'border-white/5 opacity-60'}`}>
                <div className="flex flex-col items-center gap-2">
                    <ApplyToggle applied={!!obj.applied} onChange={(v) => updateArrayField('objects', idx, 'applied', v)} />
                    <span className="text-[8px] font-bold text-slate-600 uppercase">{t('result.apply')}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <input value={obj.label} onChange={(e) => updateArrayField('objects', idx, 'label', e.target.value)} className="bg-transparent border-none p-0 text-slate-200 font-bold text-sm focus:outline-none w-full" />
                    <FeaturePromptBadge label={obj.label} prompt={obj.prompt} compact onGenerate={(p) => handleGenerate(p, "1:1")} isGenerating={isGenerating} />
                  </div>
                  <textarea value={obj.prompt} onChange={(e) => updateArrayField('objects', idx, 'prompt', e.target.value)} className="bg-transparent border-none p-0 text-slate-500 text-[11px] focus:outline-none w-full resize-none min-h-[40px]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Master Synthesis & Generation */}
        <div className="mt-4 pt-10 border-t border-white/10" id="generation-anchor">
          
          {/* CREATIVE CONFIGURATION SECTION */}
          <div className="mb-8 p-6 bg-slate-900/30 rounded-3xl border border-white/5">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <i className="fas fa-sliders-h text-indigo-500"></i> 
              <Tooltip content="Overrides applied only during the final image generation. These settings are NOT saved in the text prompt below.">
                <span className="cursor-help border-b border-dashed border-slate-500/30 pb-0.5">{t('result.creativeConfig')}</span>
              </Tooltip>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Col: Styles & Lenses */}
                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">{t('result.filterOverride')}</label>
                        <select 
                            value={selectedStyleId}
                            onChange={(e) => setSelectedStyleId(e.target.value)}
                            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
                            style={{backgroundImage: 'none'}}
                        >
                            {STYLE_PRESETS.map(style => (
                                <option key={style.id} value={style.id}>{style.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">{t('result.lensOptic')}</label>
                        <select 
                            value={selectedLensId}
                            onChange={(e) => setSelectedLensId(e.target.value)}
                            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
                        >
                            {LENS_OPTIONS.map(lens => (
                                <option key={lens.id} value={lens.id}>{lens.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Right Col: Aspect Ratio & Negative */}
                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">{t('result.aspectRatio')}</label>
                        <div className="flex flex-wrap gap-2">
                            {ASPECT_RATIOS.map(ratio => (
                                <button
                                    key={ratio.id}
                                    onClick={() => setAspectRatio(ratio.id)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                                        aspectRatio === ratio.id 
                                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                                        : 'bg-slate-800 border-white/5 text-slate-400 hover:bg-slate-700'
                                    }`}
                                >
                                    <i className={`fas ${ratio.icon}`}></i>
                                    {ratio.label} <span className="opacity-50 text-[10px]">({ratio.id})</span>
                                </button>
                            ))}
                        </div>
                    </div>
                     <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">{t('result.negConstraints')}</label>
                        <input
                            type="text"
                            value={negativePrompt}
                            onChange={(e) => setNegativePrompt(e.target.value)}
                            placeholder="Blurry, low quality, distorted..."
                            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/30 placeholder:text-slate-600"
                        />
                    </div>
                </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="space-y-1">
              <Tooltip content="The final, compiled text sent to the image generator. It combines all enabled DNA sections above.">
                 <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 cursor-help w-fit">{t('result.masterSynthesis')}</h3>
              </Tooltip>
              <p className="text-slate-500 text-xs">Base Prompt + Creative Overrides</p>
            </div>
            <div className="flex gap-2">
              <button onClick={copyMaster} className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold border ${copiedMaster ? 'bg-green-500/20 text-green-400' : 'bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600 hover:text-white'}`}>
                <i className={`fas ${copiedMaster ? 'fa-check' : 'fa-copy'}`}></i> {copiedMaster ? t('result.copied') : t('result.copy')}
              </button>
              <button onClick={() => handleGenerate(editableResult.optimizedPrompt)} disabled={isGenerating} className={`flex items-center gap-3 px-8 py-3 rounded-2xl font-bold shadow-xl ${isGenerating ? 'bg-slate-800 text-slate-500' : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:brightness-110'}`}>
                {isGenerating ? <><i className="fas fa-spinner fa-spin"></i><span>{t('result.imagining')}</span></> : <><i className="fas fa-wand-magic-sparkles"></i><span>{t('result.visualizeResult')}</span></>}
              </button>
            </div>
          </div>
          
          <div className="bg-indigo-950/20 p-6 rounded-3xl border border-indigo-500/20 shadow-inner relative group mb-8">
            <textarea
              value={editableResult.optimizedPrompt}
              onChange={(e) => { isInternalUpdate.current = true; updateField('optimizedPrompt', e.target.value); }}
              className="w-full bg-transparent border-none p-0 text-slate-200 text-xl leading-relaxed font-medium italic focus:outline-none resize-none min-h-[160px]"
            />
             {/* Visual indicators of active overrides */}
             <div className="absolute bottom-4 right-4 flex gap-2 pointer-events-none">
                {selectedStyleId !== 'none' && <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 text-[9px] rounded uppercase font-bold tracking-wider">+ Style</span>}
                {selectedLensId !== 'none' && <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-[9px] rounded uppercase font-bold tracking-wider">+ Lens</span>}
             </div>
          </div>

          {generatedImage && (
            <div className="mt-8 pt-8 border-t border-white/5 animate-in fade-in">
              <img src={generatedImage} alt="Generated masterpiece" className="w-full rounded-3xl shadow-2xl" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;