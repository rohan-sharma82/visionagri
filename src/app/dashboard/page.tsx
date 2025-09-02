
'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import LoginPrism from '@/components/login-prism';
import { useTranslation } from '@/hooks/use-translation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { PlusCircle, ShieldCheck, Sun, Wind, CloudRain, Thermometer, Moon, AlertTriangle, LogOut } from 'lucide-react';
import { getDashboardWeather, DashboardWeatherOutput } from '@/ai/flows/dashboard-weather';
import { getMarketPriceAnalysis } from '@/ai/flows/market-price-analysis';
import { MarketPriceAnalysisOutput } from '@/ai/tools/market-price';
import { useLocation } from '@/hooks/use-translation';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import MarketPriceChart from '@/components/market-price-chart';

const allDashboardData: Record<string, any> = {
    'user1@agrivision.ai': {
        location: 'Punjab, India',
        primaryCrop: 'Wheat',
        yieldHistory: [
            { date: '2024-07-15', crop: 'Wheat', predicted: '4.5', actual: '4.2' },
            { date: '2024-03-20', crop: 'Corn', predicted: '8.1', actual: null },
            { date: '2023-11-10', crop: 'Soybeans', predicted: '3.5', actual: '3.5' },
        ],
        recommendedSchemes: [
            { name: 'schemes.pmkisan.shortName', reason: 'Based on your small landholding.' },
            { name: 'schemes.pmfby.shortName', reason: 'Due to weather unpredictability in your region.' },
        ],
    },
    'user2@agrivision.ai': {
        location: 'Maharashtra, India',
        primaryCrop: 'Sugarcane',
        yieldHistory: [
            { date: '2024-08-01', crop: 'Rice', predicted: '6.2', actual: '6.5' },
            { date: '2024-04-10', crop: 'Sugarcane', predicted: '70.5', actual: null },
        ],
        recommendedSchemes: [
            { name: 'schemes.enam.name', reason: 'To get better prices for your sugarcane.' },
        ],
    },
    'user3@agrivision.ai': {
        location: 'Kerala, India',
        primaryCrop: 'Cotton',
        yieldHistory: [
            { date: '2024-06-25', crop: 'Cotton', predicted: '2.1', actual: '2.3' },
            { date: '2023-12-15', crop: 'Mustard', predicted: '1.8', actual: '1.7' },
        ],
        recommendedSchemes: [
            { name: 'schemes.pmkmy.name', reason: 'For easy access to credit for your cash crops.' },
        ],
    }
};

const aqiToLabel = (index: number | undefined) => {
    if (index === undefined) return 'Unknown';
    if (index <= 1) return 'Good';
    if (index <= 2) return 'Moderate';
    if (index <= 3) return 'Unhealthy for sensitive groups';
    if (index <= 4) return 'Unhealthy';
    if (index <= 5) return 'Very Unhealthy';
    return 'Hazardous';
};

const WeatherCard = ({ weatherData }: { weatherData: DashboardWeatherOutput }) => {
  const { t } = useTranslation();
  return (
    <Card className="md:col-span-3 bg-card/30 backdrop-blur-sm border-primary/20">
        <CardHeader>
        <CardTitle>{t('dashboard.weather.title')}</CardTitle>
        <CardDescription>{t('dashboard.weather.description', { location: weatherData.location.name })}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {weatherData.alerts?.alert?.length > 0 && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>{weatherData.alerts.alert[0].event}</AlertTitle>
                    <AlertDescription>
                        {weatherData.alerts.alert[0].headline}
                    </AlertDescription>
                </Alert>
            )}
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
                        <p>{t('dashboard.weather.aqi')}: {aqiToLabel(weatherData.current.air_quality?.['us-epa-index'])}</p>
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
                        <Sun className="h-10 w-10 text-orange-600" />
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
                                <CloudRain className="h-4 w-4 text-blue-400" />
                                <span>{day.day.daily_chance_of_rain}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Thermometer className="h-4 w-4 text-red-500" />
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

export default function DashboardPage() {
  const { t } = useTranslation();
  const { location: globalLocation } = useLocation();
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<DashboardWeatherOutput | null>(null);
  const [marketData, setMarketData] = useState<MarketPriceAnalysisOutput | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [isLoadingMarket, setIsLoadingMarket] = useState(true);

  const isAuthenticated = !!currentUser;
  const userData = currentUser ? allDashboardData[currentUser] : null;

  useEffect(() => {
    async function fetchData() {
        if (!isAuthenticated || !userData) {
            setIsLoadingWeather(false);
            setIsLoadingMarket(false);
            return;
        }

        setIsLoadingWeather(true);
        setIsLoadingMarket(true);

        try {
            const locationToFetch = globalLocation || userData.location;

            const weatherPromise = getDashboardWeather({ location: locationToFetch });
            const marketPromise = getMarketPriceAnalysis({ crop: userData.primaryCrop });

            const [weatherResult, marketResult] = await Promise.all([weatherPromise, marketPromise]);
            
            setWeatherData(weatherResult);
            setMarketData(marketResult);

        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setIsLoadingWeather(false);
            setIsLoadingMarket(false);
        }
    }
    fetchData();
  }, [isAuthenticated, userData, globalLocation]);

  const handleLogout = () => {
    setCurrentUser(null);
  };


  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold font-headline text-foreground">
            {isAuthenticated ? t('dashboard.welcome') : t('dashboard.login.title')}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {isAuthenticated ? t('dashboard.subtitle') : t('dashboard.login.description')}
          </p>
           <p className="mt-4 text-base font-semibold text-primary">
              Kisan Call Center -&gt; 1800-180-1551
          </p>
          {isAuthenticated && (
             <button className="logout-button" onClick={handleLogout}>
                <p>{t('dashboard.logout')}</p>
            </button>
          )}
        </div>

        {!isAuthenticated && (
            <LoginPrism onLoginSuccess={(user) => setCurrentUser(user)} />
        )}

        {isAuthenticated && userData && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {/* Weather Card */}
            {isLoadingWeather ? (
                 <Card className="md:col-span-3 bg-card/30 backdrop-blur-sm border-primary/20"><CardContent className="p-6 text-center">{t('dashboard.weather.loading')}</CardContent></Card>
            ) : weatherData ? (
                <WeatherCard weatherData={weatherData} />
            ) : (
                <Card className="md:col-span-3 bg-card/30 backdrop-blur-sm border-primary/20"><CardContent className="p-6 text-center">{t('dashboard.weather.error')}</CardContent></Card>
            )}

            {/* Market Price Analysis */}
            <Card className="md:col-span-2 bg-card/30 backdrop-blur-sm border-primary/20">
                <CardHeader>
                    <CardTitle>{t('dashboard.market.title', { crop: userData.primaryCrop })}</CardTitle>
                    <CardDescription>{t('dashboard.market.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoadingMarket ? (
                        <p className="text-center">{t('dashboard.market.loading')}</p>
                    ) : marketData ? (
                        <MarketPriceChart data={marketData} />
                    ) : (
                        <p className="text-center">{t('dashboard.market.error')}</p>
                    )}
                </CardContent>
            </Card>

            {/* Recommended Schemes */}
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

            {/* Yield Prediction History */}
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
        )}
      </div>
    </>
  );
}

    