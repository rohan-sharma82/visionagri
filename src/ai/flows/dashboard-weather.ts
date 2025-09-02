'use server';

/**
 * @fileOverview A Genkit flow to fetch comprehensive weather data for the dashboard.
 *
 * - getDashboardWeather - Fetches current weather, 3-day forecast, and alerts.
 * - DashboardWeatherInput - Input schema for the flow.
 * - DashboardWeatherOutput - Output schema for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getWeatherForLocation, WeatherResponseSchema } from '@/ai/tools/weather';

export const DashboardWeatherInputSchema = z.object({
  location: z.string().describe('The location to get the weather for, e.g., "Delhi, India"'),
});
export type DashboardWeatherInput = z.infer<typeof DashboardWeatherInputSchema>;

export const DashboardWeatherOutputSchema = WeatherResponseSchema;
export type DashboardWeatherOutput = z.infer<typeof DashboardWeatherOutputSchema>;

export async function getDashboardWeather(input: DashboardWeatherInput): Promise<DashboardWeatherOutput> {
  return getDashboardWeatherFlow(input);
}

const getDashboardWeatherFlow = ai.defineFlow(
  {
    name: 'getDashboardWeatherFlow',
    inputSchema: DashboardWeatherInputSchema,
    outputSchema: DashboardWeatherOutputSchema,
  },
  async ({ location }) => {
    // Directly call the tool to get the structured weather data.
    // No LLM reasoning is needed here, just data fetching.
    const weatherData = await getWeatherForLocation(location);
    return weatherData;
  }
);
