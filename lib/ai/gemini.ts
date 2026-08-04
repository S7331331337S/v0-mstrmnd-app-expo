// Stub for Gemini AI integration
// TODO: Implement when @google/genai is added to dependencies

interface GeminiRequest {
  system: string;
  prompt: string;
}

interface GeminiResponse {
  text: string;
}

export async function generateWithGemini(request: GeminiRequest): Promise<GeminiResponse> {
  // Return mock response for now
  return {
    text: `Mock Gemini response to prompt: ${request.prompt.slice(0, 50)}...`
  };
}
