import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GenerateContentPayload } from '../types';

/**
 * Service for interacting with the Google Gemini API.
 */
export const geminiService = {
  /**
   * Generates content using the Gemini model.
   *
   * @param payload - The payload containing the prompt, model, and optional maxOutputTokens.
   * @returns A promise that resolves to the generated text content.
   * @throws Error if API_KEY is not configured or content generation fails.
   */
  generateContent: async (payload: GenerateContentPayload): Promise<string> => {
    const { prompt, model, maxOutputTokens } = payload;

    if (!process.env.API_KEY) {
      throw new Error("Gemini API_KEY is not configured. Please ensure it's set in your environment.");
    }

    // Create a new GoogleGenAI instance right before making an API call
    // to ensure it always uses the most up-to-date API key from the dialog.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const config: { [key: string]: any } = {};
      if (maxOutputTokens) {
        // Set both maxOutputTokens and thinkingConfig.thinkingBudget at the same time.
        // The effective token limit for the response is `maxOutputTokens` minus the `thinkingBudget`.
        // We'll reserve 25% for thinking, with a minimum of 50 tokens, up to a maximum of 200.
        const thinkingBudget = Math.max(50, Math.min(200, Math.floor(maxOutputTokens * 0.25)));
        config.maxOutputTokens = maxOutputTokens;
        config.thinkingConfig = { thinkingBudget };
      }

      const response: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: config,
      });

      const text = response.text;
      if (!text) {
        throw new Error('No text content received from Gemini API.');
      }
      return text.trim();
    } catch (error) {
      console.error('Error generating content with Gemini API:', error);
      throw new Error(`Failed to generate content: ${error instanceof Error ? error.message : String(error)}`);
    }
  },
};
