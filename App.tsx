import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ImagePreview from './components/ImagePreview';
import ResultDisplay from './components/ResultDisplay';
import UserGuide from './components/UserGuide';
import HistoryBar from './components/HistoryBar';
import { analyzeImage } from './services/geminiService';
import { AnalysisResult, ImageState, HistoryItem, QueueItem } from './types';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const { language, t } = useLanguage();
  
  // Queue and History State
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeResultId, setActiveResultId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [showGuide, setShowGuide] = useState(false);

  // Helper to process multiple files input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      
      Array.from(files).forEach((file: File) => {
        const id = Math.random().toString(36).substring(7);
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          if (!result) return;

          const base64 = result.split(',')[1];
          const previewUrl = URL.createObjectURL(file);
          
          setQueue(prev => [...prev, {
            id,
            imageState: { file, previewUrl, base64 },
            status: 'pending'
          }]);
        };
        reader.readAsDataURL(file);
      });
      setError(null);
    }
  };

  // Queue Processing Loop
  useEffect(() => {
    const processQueue = async () => {
      if (isProcessing || queue.filter(item => item.status === 'pending').length === 0) return;

      // Find first pending item
      const currentItemIndex = queue.findIndex(item => item.status === 'pending');
      if (currentItemIndex === -1) return;

      const currentItem = queue[currentItemIndex];

      // Update status to processing
      setIsProcessing(true);
      setQueue(prev => prev.map((item, idx) => idx === currentItemIndex ? { ...item, status: 'processing' } : item));

      try {
        if (!currentItem.imageState.base64 || !currentItem.imageState.file) throw new Error("Invalid image data");

        const analysis = await analyzeImage(currentItem.imageState.base64, currentItem.imageState.file.type, language);
        
        // Add to history
        const newHistoryItem: HistoryItem = {
          id: currentItem.id,
          timestamp: Date.now(),
          imageState: currentItem.imageState,
          result: analysis
        };

        setHistory(prev => [newHistoryItem, ...prev]);
        setActiveResultId(currentItem.id); // Auto-select the newly finished item

        // Remove from queue
        setQueue(prev => prev.filter(item => item.id !== currentItem.id));
        
        // Scroll to results if this was the first result
        setTimeout(() => {
            document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);

      } catch (err) {
        console.error(err);
        setError(t('errors.analyze'));
        // Mark as error in queue or remove? Let's mark as error for now so user sees it failed
        setQueue(prev => prev.map(item => item.id === currentItem.id ? { ...item, status: 'error' } : item));
      } finally {
        setIsProcessing(false);
      }
    };

    processQueue();
  }, [queue, isProcessing, language, t]);

  const handleStartQueue = () => {
    // This is mainly a visual trigger, the useEffect does the heavy lifting.
    // However, if we had a "paused" state, we would toggle it here.
    // For now, adding items to queue automatically marks them 'pending', so this might just scroll or validate.
    if (queue.length === 0) return;
  };

  // Determine what to show in the Input Preview
  // If we have an active result, show that image. If not, but we have a queue, show the first queue image.
  const activeHistoryItem = history.find(h => h.id === activeResultId);
  const activeQueueItem = queue[0];
  
  const currentPreviewState: ImageState = activeHistoryItem 
    ? activeHistoryItem.imageState 
    : activeQueueItem 
      ? activeQueueItem.imageState 
      : { file: null, previewUrl: null, base64: null };

  const currentResult = activeHistoryItem ? activeHistoryItem.result : null;

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8 max-w-6xl mx-auto">
      <Header onToggleGuide={() => setShowGuide(!showGuide)} showGuide={showGuide} />
      
      {showGuide && <UserGuide onClose={() => setShowGuide(false)} />}
      
      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center gap-3 animate-in fade-in" role="alert">
          <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
          {error}
        </div>
      )}

      <main className="flex flex-col gap-8">
        {/* Input Section */}
        <section className="w-full max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-700">
          <ImagePreview 
            imageState={currentPreviewState} 
            onImageChange={handleImageChange} 
            isLoading={isProcessing}
            onAnalyze={handleStartQueue}
            queueLength={queue.length}
          />
        </section>

        {/* History Bar - Only show if we have data */}
        <section className="w-full max-w-4xl mx-auto">
           <HistoryBar 
             history={history} 
             queue={queue} 
             activeId={activeResultId} 
             onSelect={setActiveResultId} 
           />
        </section>

        {/* Output Section */}
        {(currentResult || isProcessing) && (
          <section id="results-section" className="w-full animate-in fade-in duration-700">
            <ResultDisplay result={currentResult} isLoading={isProcessing && !currentResult} />
          </section>
        )}
      </main>

      <footer className="mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm" role="contentinfo">
        <p>&copy; 2024 VisionPrompt Analyzer • Powered by Gemini AI</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;