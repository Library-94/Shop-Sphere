import { GoogleGenAI, Type } from "@google/genai";
import { Product } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const searchProductsWithGemini = async (query: string): Promise<Product[]> => {
  if (!process.env.API_KEY) {
    console.warn("No API Key, returning mock");
    return [];
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate 6 realistic e-commerce products for the search query: "${query}". 
      Return valid JSON. Use Indian Rupee prices (INR). 
      Images should be placeholders using https://picsum.photos/seed/{random_id}/300/300.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              image: { type: Type.STRING },
              price: { type: Type.NUMBER },
              mrp: { type: Type.NUMBER },
              discount: { type: Type.NUMBER },
              rating: { type: Type.NUMBER },
              reviewCount: { type: Type.NUMBER },
              isPrime: { type: Type.BOOLEAN },
            },
            required: ["id", "title", "image", "price", "mrp", "discount", "rating", "reviewCount"],
          },
        },
      },
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as Product[];
  } catch (error) {
    console.error("Gemini search failed", error);
    return [];
  }
};