'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const WeatherResponseSchema = z.object({
  location: z.object({
    name: z.string(),
    region: z.string(),
    country: z.string(),
  }),
  current: z.object({
    temp_c: z.number(),
    precip_mm: z.number(),
    condition: z.object({
      text: z.string(),
    }),
  }),
});

export const getWeatherForLocation = ai.defineTool(
  {
    name: 'getWeatherForLocation',
    description: 'Returns the current weather for a given location, including temperature and precipitation.',
    inputSchema: z.string().describe('The location to get the weather for, e.g., "Delhi, India"'),
    outputSchema: WeatherResponseSchema.shape.current,
  },
  async (location) => {
    const apiKey = 'b463cb8a6db74e73953122829253008';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Weather API request failed with status ${response.status}`);
      }
      const data = await response.json();
      const parsed = WeatherResponseSchema.parse(data);
      return parsed.current;
    } catch (e) {
      console.error(e);
      // Fallback for demo purposes if API fails
      return {
        temp_c: 25,
        precip_mm: 0.5,
        condition: { text: 'Sunny (fallback)' },
      };
    }
  }
);
