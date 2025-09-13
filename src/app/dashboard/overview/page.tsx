
import { Suspense } from 'react';
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
import DashboardClientPage, { DashboardSkeleton } from './client-page';

// This is now an async Server Component
export default async function DashboardPage() {

  // The data fetching calls are now initiated here, but the component
  // will render immediately thanks to Suspense.
  const weatherDataPromise = getDashboardWeather({ location: 'Delhi, India' }); 
  const marketDataPromise = getMarketPriceAnalysis({ crop: 'Wheat' });
  const yieldHistoryPromise = getYieldPredictionHistory();
  const chatHistoryPromise = getRecentChatHistory();

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardClientPageWrapper
        weatherDataPromise={weatherDataPromise}
        marketDataPromise={marketDataPromise}
        yieldHistoryPromise={yieldHistoryPromise}
        chatHistoryPromise={chatHistoryPromise}
      />
    </Suspense>
  );
}

// A new wrapper component to handle the promises with Suspense
async function DashboardClientPageWrapper({
  weatherDataPromise,
  marketDataPromise,
  yieldHistoryPromise,
  chatHistoryPromise,
}: {
  weatherDataPromise: Promise<DashboardWeatherOutput | null>;
  marketDataPromise: Promise<MarketPriceAnalysisOutput | null>;
  yieldHistoryPromise: Promise<YieldPredictionHistory[]>;
  chatHistoryPromise: Promise<Message[]>;
}) {
  const [weatherData, marketData, yieldHistory, chatHistory] = await Promise.all([
    weatherDataPromise,
    marketDataPromise,
    yieldHistoryPromise,
    chatHistoryPromise,
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
