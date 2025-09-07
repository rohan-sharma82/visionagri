
'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/use-translation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PlusCircle, ShieldCheck, Sun, Moon, AlertTriangle, TrendingUp, Loader2 } from 'lucide-react';
import { getDashboardWeather, DashboardWeatherOutput } from '@/ai/flows/dashboard-weather';
import { getMarketPriceAnalysis } from '@/ai/flows/market-price-analysis';
import { MarketPriceAnalysisOutput } from '@/ai/tools/market-price';
import { useLocation } from '@/hooks/use-translation';
import Image from 'next/image';
import MarketPriceChart from '@/components/market-price-chart';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import WeatherAlerts from '@/components/weather-alerts';
import { useApp } from '@/hooks/use-app-provider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categorizedCropOptions } from '@/lib/constants';


const aqiToLabel = (index: number | undefined, t: (key: string) => string) => {
    if (index === undefined) return t('dashboard.weather.aqiLabels.unknown');
    if (index <= 1) return t('dashboard.weather.aqiLabels.good');
    if (index <= 2) return t('dashboard.weather.aqiLabels.moderate');
    if (index <= 3) return t('dashboard.weather.aqiLabels.unhealthy_sensitive');
    if (index <= 4) return t('dashboard.weather.aqiLabels.unhealthy');
    if (index <= 5) return t('dashboard.weather.aqiLabels.very_unhealthy');
    return t('dashboard.weather.aqiLabels.hazardous');
};


const WeatherCard = ({ weatherData, isLoading, onRetry }: { weatherData: DashboardWeatherOutput | null, isLoading: boolean, onRetry: () => void }) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
        <Card className="lg:col-span-3">
            <CardHeader><CardTitle>{t('dashboard.loading.weather')}</CardTitle></CardHeader>
            <CardContent><Skeleton className="h-[250px] w-full" /></CardContent>
        </Card>
    );
  }

  if (!weatherData) {
    return (
        <Card className="lg:col-span-3 bg-card/30 backdrop-blur-sm border-destructive/50">
            <CardHeader>
                <CardTitle>{t('dashboard.weather.title')}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center text-destructive flex flex-col items-center justify-center gap-4">
                <AlertTriangle className="mx-auto h-8 w-8" />
                <p>{t('dashboard.weather.error')}</p>
                <Button onClick={onRetry} variant="destructive">
                    {t('dashboard.weather.retryButton')}
                </Button>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="lg:col-span-3 bg-card/30 backdrop-blur-sm border-primary/20">
        <CardHeader>
        <CardTitle>{t('dashboard.weather.title')}</CardTitle>
        <CardDescription>{t('dashboard.weather.description', { location: weatherData.location.name })}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Current Weather */}
                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-primary/10">
                    <h3 className="font-semibold mb-2">{t('dashboard.weather.current')}</h3>
                    <Image src={`https:${weatherData.current.condition.icon}`} alt={weatherData.current.condition.text} width={64} height={64} />
                    <p className="font-bold text-4xl">{weatherData.current.temp_c}°C</p>
                    <p className="text-muted-foreground">{weatherData.current.condition.text}</p>
                    <div className="text-sm text-muted-foreground mt-2 space-y-1 text-center">
                        <p>{t('dashboard.weather.humidity')}: {weatherData.current.humidity}%</p>
                        <p>{t('dashboard.weather.wind')}: {weatherData.current.wind_kph} km/h</p>
                        <p>{t('dashboard.weather.aqi')}: {aqiToLabel(weatherData.current.air_quality?.['us-epa-index'], t)}</p>
                    </div>
                </div>

                {/* Astronomy */}
                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-secondary/10 space-y-2">
                     <h3 className="font-semibold mb-2">{t('dashboard.weather.astronomy')}</h3>
                     <div className="flex items-center gap-4">
                        <Sun className="h-10 w-10 text-yellow-500" />
                        <div>
                            <p className="font-semibold">{t('dashboard.weather.sunrise')}</p>
                            <p>{weatherData.forecast.forecastday[0].astro.sunrise}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <Moon className="h-10 w-10 text-slate-400" />
                        <div>
                            <p className="font-semibold">{t('dashboard.weather.sunset')}</p>
                            <p>{weatherData.forecast.forecastday[0].astro.sunset}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4 pt-2">
                        <Moon className="h-8 w-8 text-muted-foreground" />
                        <div>
                           <p className="font-semibold">{t('dashboard.weather.moon')}</p>
                           <p>{weatherData.forecast.forecastday[0].astro.moon_phase}</p>
                        </div>
                     </div>
                </div>

                {/* 3 Day Forecast */}
                <div className="rounded-lg bg-muted/30 p-4 space-y-3">
                    <h3 className="font-semibold text-center">{t('dashboard.weather.forecast')}</h3>
                    {weatherData.forecast.forecastday.map((day, index) => (
                        <div key={day.date} className="flex items-center justify-between text-sm">
                            <span className="font-medium">{index === 0 ? t('dashboard.weather.today') : new Date(day.date).toLocaleDateString(undefined, { weekday: 'short' })}</span>
                            <Image src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} width={32} height={32} />
                            <div className="flex items-center gap-1">
                                <span className="text-blue-400">🌧</span>
                                <span>{day.day.daily_chance_of_rain}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-red-500">🌡</span>
                                <span>{day.day.maxtemp_c.toFixed(0)}°</span>
                                <span className="text-muted-foreground">/{day.day.mintemp_c.toFixed(0)}°</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

const DataSkeleton = () => {
    const { t } = useTranslation();
    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-3"><CardHeader><CardTitle>{t('dashboard.loading.weather')}</CardTitle></CardHeader><CardContent><Skeleton className="h-[250px] w-full" /></CardContent></Card>
            <Card className="md:col-span-2"><CardHeader><CardTitle>{t('dashboard.loading.market')}</CardTitle></CardHeader><CardContent><Skeleton className="h-[250px] w-full" /></CardContent></Card>
            <Card><CardHeader><CardTitle>{t('dashboard.loading.schemes')}</CardTitle></CardHeader><CardContent><Skeleton className="h-[250px] w-full" /></CardContent></Card>
            <Card className="md:col-span-3"><CardHeader><CardTitle>{t('dashboard.loading.history')}</CardTitle></CardHeader><CardContent><Skeleton className="h-[200px] w-full" /></CardContent></Card>
        </div>
    )
};

export default function DashboardPage() {
  const { t } = useTranslation();
  const { location: globalLocation } = useLocation();
  const { setLocationDialogOpen } = useApp();
  const { toast } = useToast();
  const [weatherData, setWeatherData] = useState<DashboardWeatherOutput | null>(null);
  const [marketData, setMarketData] = useState<MarketPriceAnalysisOutput | null>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const [isMarketLoading, setIsMarketLoading] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState('Wheat');

  const userData = {
    yieldHistory: [
        { date: '4 August 2025', crop: 'Wheat', predicted: '4.5', actual: '4.2' },
        { date: '2024-03-20', crop: 'Corn', predicted: '8.1', actual: null },
    ],
    recommendedSchemes: [
        { name: 'schemes.pmkisan.shortName', reason: 'dashboard.schemes.reasons.smallLandholding' },
        { name: 'schemes.pmfby.shortName', reason: 'dashboard.schemes.reasons.weatherUnpredictability' },
    ],
  };

  useEffect(() => {
    const fetchWeather = async () => {
      if (!globalLocation) {
        setIsWeatherLoading(true);
        return;
      }
      setIsWeatherLoading(true);
      try {
        const weatherResult = await getDashboardWeather({ location: globalLocation });
        setWeatherData(weatherResult);
      } catch (error) {
        console.error("Weather data fetching failed:", error);
        setWeatherData(null);
      } finally {
        setIsWeatherLoading(false);
      }
    };
    fetchWeather();
  }, [globalLocation]);

  useEffect(() => {
    const fetchMarketData = async () => {
      setIsMarketLoading(true);
      try {
        const marketResult = await getMarketPriceAnalysis({ crop: selectedCrop });
        setMarketData(marketResult);
      } catch (error) {
        console.error("Market data fetching failed:", error);
        toast({ variant: 'destructive', title: "Error", description: "Failed to fetch market data." });
        setMarketData(null);
      } finally {
        setIsMarketLoading(false);
      }
    };
    fetchMarketData();
  }, [selectedCrop, toast]);
  
  useEffect(() => {
    setIsDataLoading(isWeatherLoading || isMarketLoading);
  }, [isWeatherLoading, isMarketLoading]);

  const allCrops = categorizedCropOptions.flatMap(category => category.options);
  if (isDataLoading) {
    return <div className="container mx-auto px-4 py-8"><DataSkeleton /></div>;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold font-headline text-foreground">
            {t('dashboard.welcome', { name: t('dashboard.defaultName') })}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
            {t('dashboard.subtitle')}
          </p>
           <p className="mt-2 text-base font-semibold text-primary">
             {t('kisanCallCenter')}
          </p>
        </div>
        
        <div className="space-y-8">
            {weatherData && weatherData.alerts && weatherData.alerts.alert.length > 0 && (
                <WeatherAlerts alerts={weatherData.alerts.alert} />
            )}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                <WeatherCard 
                    weatherData={weatherData} 
                    isLoading={isWeatherLoading} 
                    onRetry={() => setLocationDialogOpen(true)}
                />
                
                <Card className="md:col-span-2 bg-card/30 backdrop-blur-sm border-primary/20">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <CardTitle>{t('dashboard.market.title', { crop: selectedCrop })}</CardTitle>
                                <CardDescription>{t('dashboard.market.description')}</CardDescription>
                            </div>
                            <Select onValueChange={setSelectedCrop} defaultValue={selectedCrop}>
                                <SelectTrigger className="w-full sm:w-[200px]">
                                    <SelectValue placeholder="Select a crop" />
                                </SelectTrigger>
                                <SelectContent>
                                    {allCrops.map(crop => (
                                        <SelectItem key={crop.value} value={crop.value}>
                                            {crop.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {isMarketLoading ? (
                            <div className="flex justify-center items-center h-[250px]">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : marketData ? (
                            <MarketPriceChart data={marketData} />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[250px] text-center text-destructive">
                                <AlertTriangle className="h-8 w-8 mb-2" />
                                <p className="mb-4">{t('dashboard.market.errorDescription')}</p>
                                <Button onClick={() => getMarketPriceAnalysis({ crop: selectedCrop }).then(setMarketData)}>
                                    <TrendingUp className="mr-2 h-4 w-4" />
                                    {t('dashboard.market.button')}
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="bg-card/30 backdrop-blur-sm border-primary/20">
                    <CardHeader>
                    <CardTitle>{t('dashboard.schemes.title')}</CardTitle>
                    <CardDescription>{t('dashboard.schemes.description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    {userData.recommendedSchemes.map((scheme: any, index: number) => (
                        <div key={index} className="flex items-start gap-4">
                        <ShieldCheck className="h-6 w-6 text-green-500 mt-1" />
                        <div>
                            <p className="font-semibold">{t(scheme.name)}</p>
                            <p className="text-sm text-muted-foreground">{t(scheme.reason)}</p>
                        </div>
                        </div>
                    ))}
                    </CardContent>
                </Card>

                <Card className="md:col-span-3 bg-card/30 backdrop-blur-sm border-primary/20">
                    <CardHeader>
                    <CardTitle>{t('dashboard.yieldHistory.title')}</CardTitle>
                    <CardDescription>
                        {t('dashboard.yieldHistory.description')}
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>{t('dashboard.yieldHistory.table.date')}</TableHead>
                            <TableHead>{t('dashboard.yieldHistory.table.crop')}</TableHead>
                            <TableHead className="text-right">
                            {t('dashboard.yieldHistory.table.predicted')}
                            </TableHead>
                            <TableHead className="text-right">
                            {t('dashboard.yieldHistory.table.actual')}
                            </TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {userData.yieldHistory.map((entry: any, index: number) => (
                            <TableRow key={index}>
                            <TableCell>{entry.date}</TableCell>
                            <TableCell>{entry.crop}</TableCell>
                            <TableCell className="text-right">{entry.predicted}</TableCell>
                            <TableCell className="text-right">
                                {entry.actual ? (
                                entry.actual
                                ) : (
                                <Button variant="outline" size="sm">
                                    {t('dashboard.yieldHistory.table.action')}
                                </Button>
                                )}
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </CardContent>
                    <CardFooter>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            {t('dashboard.yieldHistory.button')}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
      </div>
    </>
  );
}
