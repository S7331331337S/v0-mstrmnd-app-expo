import { GoogleGenAI } from "@google/genai";

export type GenerateTextInput = {
  system?: string;
  prompt: string;
};

export async function generateWithGemini(input: GenerateTextInput) {
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      text: "Gemini key missing. Add EXPO_PUBLIC_GEMINI_API_KEY for local Expo builds or GEMINI_API_KEY for server builds.",
      provider: "gemini",
      simulated: true,
    };
  }

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${input.system || ""}\n\n${input.prompt}`,
  });

  return {
    text: response.text || "",
    provider: "gemini",
    simulated: false,
  };
}
