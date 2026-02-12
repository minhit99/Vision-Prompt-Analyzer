
export type Language = 'en' | 'vi' | 'zh' | 'ja' | 'th';

export interface TextElement {
  text: string;
  location: string;
  format: string;
  prompt: string; 
  applied?: boolean; // Toggle for inclusion in master prompt
}

export interface ObjectDetail {
  label: string;
  count: number;
  description: string;
  prompt: string;
  applied?: boolean; // Toggle for inclusion in master prompt
}

export interface AnalysisResult {
  subject: string;
  subjectPrompt: string;
  subjectApplied?: boolean;
  context: string;
  contextPrompt: string;
  contextApplied?: boolean;
  style: string;
  stylePrompt: string;
  styleApplied?: boolean;
  technicalDetails: string[];
  colorPalette: string[];
  colorPaletteApplied?: boolean; // Toggle for inclusion in master prompt
  textContent: TextElement[];
  objects: ObjectDetail[];
  elementsList: string[];
  optimizedPrompt: string;
}

export interface ImageState {
  file: File | null;
  previewUrl: string | null;
  base64: string | null;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  imageState: ImageState;
  result: AnalysisResult;
}

export interface QueueItem {
  id: string;
  imageState: ImageState;
  status: 'pending' | 'processing' | 'error';
}
