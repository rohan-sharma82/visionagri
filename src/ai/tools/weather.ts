
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const WeatherResponseSchema = z.object({
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
      icon: z.string(),
    }),
    wind_kph: z.number(),
    humidity: z.number(),
    air_quality: z.record(z.number()).optional(),
  }),
  forecast: z.object({
    forecastday: z.array(z.object({
      date: z.string(),
      day: z.object({
        maxtemp_c: z.number(),
        mintemp_c: z.number(),
        daily_chance_of_rain: z.number(),
        condition: z.object({
          text: z.string(),
          icon: z.string(),
        }),
      }),
      astro: z.object({
        sunrise: z.string(),
        sunset: z.string(),
        moon_phase: z.string(),
      })
    }))
  }),
  alerts: z.object({
    alert: z.array(z.object({
        headline: z.string(),
        event: z.string(),
        desc: z.string(),
    }))
  }).optional(),
});
export type WeatherData = z.infer<typeof WeatherResponseSchema>;

export const DashboardWeatherInputSchema = z.object({
  location: z.string().describe('The location to get the weather for, e.g., "Delhi, India"'),
});
export type DashboardWeatherInput = z.infer<typeof DashboardWeatherInputSchema>;

export const DashboardWeatherOutputSchema = WeatherResponseSchema;
export type DashboardWeatherOutput = z.infer<typeof DashboardWeatherOutputSchema>;


export const getWeatherForLocation = ai.defineTool(
  {
    name: 'getWeatherForLocation',
    description: 'Returns the current weather, 3-day forecast, AQI, and alerts for a given location.',
    inputSchema: z.string().describe('The location to get the weather for, e.g., "Delhi, India"'),
    outputSchema: WeatherResponseSchema,
  },
  async (location) => {
    const apiKey = 'b463cb8a6db74e73953122829253008';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=yes&alerts=yes`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Weather API request failed with status ${response.status}`);
      }
      const data = await response.json();
      const parsed = WeatherResponseSchema.parse(data);
      return parsed;
    } catch (e) {
      console.error(e);
      // Fallback for demo purposes if API fails
      return {
        location: { name: 'Fallback Location', region: '', country: '' },
        current: {
            temp_c: 25,
            precip_mm: 0.5,
            condition: { text: 'Sunny (fallback)', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png' },
            wind_kph: 10,
            humidity: 60,
            air_quality: { 'us-epa-index': 1 }
        },
        forecast: {
            forecastday: [
                { date: '2024-01-01', day: { maxtemp_c: 30, mintemp_c: 20, daily_chance_of_rain: 10, condition: { text: 'Sunny', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'}}, astro: { sunrise: '06:00 AM', sunset: '06:00 PM', moon_phase: 'New Moon' } },
                { date: '2024-01-02', day: { maxtemp_c: 31, mintemp_c: 21, daily_chance_of_rain: 20, condition: { text: 'Partly cloudy', icon: '//cdn.weatherapi.com/weather/64x64/day/116.png'}}, astro: { sunrise: '06:01 AM', sunset: '06:00 PM', moon_phase: 'Waxing Crescent' } },
                { date: '2024-01-03', day: { maxtemp_c: 29, mintemp_c: 19, daily_chance_of_rain: 70, condition: { text: 'Patchy rain possible', icon: '//cdn.weatherapi.com/weather/64x64/day/176.png'}}, astro: { sunrise: '06:02 AM', sunset: '06:00 PM', moon_phase: 'First Quarter' } },
            ]
        },
        alerts: { alert: [] }
      };
    }
  }
);
