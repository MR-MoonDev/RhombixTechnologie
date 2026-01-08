
import { GoogleGenAI, Type } from "@google/genai";
import { AISuggestion } from "../types";

// Note: process.env.API_KEY is handled externally as per instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  analyzeTask: async (taskText: string): Promise<AISuggestion | null> => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this task and suggest a category and priority: "${taskText}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              category: { 
                type: Type.STRING, 
                description: "One of: Work, Personal, Health, Finance, Shopping, Other" 
              },
              priority: { 
                type: Type.STRING, 
                description: "One of: low, medium, high" 
              },
              reason: { 
                type: Type.STRING, 
                description: "Brief 1-sentence explanation for the classification." 
              }
            },
            required: ["category", "priority", "reason"]
          }
        }
      });

      const result = JSON.parse(response.text || '{}');
      return result as AISuggestion;
    } catch (error) {
      console.error("Gemini AI Analysis failed:", error);
      return null;
    }
  }
};
