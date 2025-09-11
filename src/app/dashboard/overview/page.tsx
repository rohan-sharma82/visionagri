
import {
  getDashboardWeather,
  DashboardWeatherOutput,
} from '@/ai/flows/dashboard-weather';
import { getMarketPriceAnalysis } from '@/ai/flows/market-price-analysis';
import { MarketPriceAnalysisOutput } from '@/ai/tools/market-price';
import {
  getYieldPredictionHistory,
  getRecentChatHistory,
  YieldPredictionHistory,
} from '../actions';
import type { Message } from '@/app/ai-farmer/page';
import DashboardClientPage from './client-page';

// This is now an async Server Component
export default async function DashboardPage() {
  // Fetch all data in parallel on the server
  const [
    weatherData,
    marketData,
    yieldHistory,
    chatHistory
  ] = await Promise.all([
    getDashboardWeather({ location: 'Delhi, India' }), // Default location for server render
    getMarketPriceAnalysis({ crop: 'Wheat' }), // Default crop for server render
    getYieldPredictionHistory(),
    getRecentChatHistory(),
  ]);

  return (
    <DashboardClientPage
      initialWeatherData={weatherData}
      initialMarketData={marketData}
      initialYieldHistory={yieldHistory}
      initialChatHistory={chatHistory}
    />
  );
}
