
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AnalysisResult, Language } from "../types";

const langMap: Record<Language, string> = {
  en: 'English',
  vi: 'Vietnamese',
  zh: 'Chinese (Simplified)',
  ja: 'Japanese',
  th: 'Thai'
};

export const analyzeImage = async (base64Data: string, mimeType: string, language: Language = 'en'): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const targetLang = langMap[language] || 'English';
  
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        },
        {
          text: `Reverse-engineer this image for a generative AI prompt.
          Output Language: Provide all descriptive fields (subject, style, context, descriptions) in ${targetLang}.
          IMPORTANT: All '*Prompt' fields (subjectPrompt, stylePrompt, contextPrompt, optimizedPrompt) MUST remain in ENGLISH for compatibility with image generators.
          
          Required:
          1. PRIMARY SUBJECT (subject, subjectPrompt)
          2. DESIGN STYLE (style, stylePrompt)
          3. ENVIRONMENT (context, contextPrompt)
          4. TEXT/TYPOGRAPHY (textContent array with text, location, format, prompt)
          5. OBJECTS (objects array with label, count, description, prompt)
          6. COLOR MAPPING (colorPalette array)
          7. MASTER SYNTHESIS (optimizedPrompt)
          
          Return as JSON.`
        }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          subject: { type: Type.STRING },
          subjectPrompt: { type: Type.STRING },
          context: { type: Type.STRING },
          contextPrompt: { type: Type.STRING },
          style: { type: Type.STRING },
          stylePrompt: { type: Type.STRING },
          technicalDetails: { type: Type.ARRAY, items: { type: Type.STRING } },
          colorPalette: { type: Type.ARRAY, items: { type: Type.STRING } },
          textContent: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING },
                location: { type: Type.STRING },
                format: { type: Type.STRING },
                prompt: { type: Type.STRING }
              },
              required: ["text", "location", "format", "prompt"]
            }
          },
          objects: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                count: { type: Type.NUMBER },
                description: { type: Type.STRING },
                prompt: { type: Type.STRING }
              },
              required: ["label", "count", "description", "prompt"]
            }
          },
          elementsList: { type: Type.ARRAY, items: { type: Type.STRING } },
          optimizedPrompt: { type: Type.STRING }
        },
        required: ["subject", "subjectPrompt", "context", "contextPrompt", "style", "stylePrompt", "technicalDetails", "colorPalette", "textContent", "objects", "elementsList", "optimizedPrompt"]
      }
    }
  });

  const resultText = response.text;
  if (!resultText) throw new Error("No response from AI");
  
  return JSON.parse(resultText.trim()) as AnalysisResult;
};

export const generateImageFromPrompt = async (prompt: string, aspectRatio: string = "1:1"): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: { aspectRatio: aspectRatio }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("Image generation failed");
};
