
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { subDays, format } from 'date-fns';

export const MarketPriceHistoryInputSchema = z.object({
  crop: z.string().describe('The crop to get the price history for, e.g., "Wheat"'),
});
export type MarketPriceHistoryInput = z.infer<typeof MarketPriceHistoryInputSchema>;

export const PriceEntrySchema = z.object({
    date: z.string(),
    price: z.number(),
});
export type PriceEntry = z.infer<typeof PriceEntrySchema>;


export const MarketPriceAnalysisOutputSchema = z.object({
  trend: z.string().describe("A concise, one-sentence analysis of the price trend."),
  forecast: z.string().describe("A short, actionable forecast for the farmer."),
  history: z.array(PriceEntrySchema).describe("The historical price data for the last 30 days."),
});
export type MarketPriceAnalysisOutput = z.infer<typeof MarketPriceAnalysisOutputSchema>;


export const getMarketPriceHistory = ai.defineTool(
  {
    name: 'getMarketPriceHistory',
    description: 'Returns a simulated 30-day price history for a given crop.',
    inputSchema: MarketPriceHistoryInputSchema,
    outputSchema: z.array(PriceEntrySchema),
  },
  async ({ crop }) => {
    // This is mock data generation for demonstration purposes.
    // In a real application, this would fetch from a live market data API.
    const history: PriceEntry[] = [];
    const today = new Date();
    let currentPrice = 2000 + Math.random() * 500; // Base price for quintal

    for (let i = 29; i >= 0; i--) {
        const date = subDays(today, i);
        // Simulate some trend and volatility
        currentPrice += (Math.random() - 0.48) * 50; // Daily fluctuation
        currentPrice = Math.max(1500, currentPrice); // Floor price

        history.push({
            date: format(date, 'yyyy-MM-dd'),
            price: parseFloat(currentPrice.toFixed(2)),
        });
    }

    return history;
  }
);
