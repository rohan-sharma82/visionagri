
'use server';

/**
 * @fileOverview A Genkit flow to fetch comprehensive weather data for the dashboard.
 *
 * - getDashboardWeather - Fetches current weather, 3-day forecast, and alerts.
 */

import { ai } from '@/ai/genkit';
import { 
    getWeatherForLocation,
    DashboardWeatherInput,
    DashboardWeatherOutput,
    DashboardWeatherInputSchema,
    DashboardWeatherOutputSchema,
} from '@/ai/tools/weather';


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
