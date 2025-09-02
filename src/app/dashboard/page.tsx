
'use client';
import { useState } from 'react';
import Header from '@/components/layout/header';
import LoginDialog from '@/components/login-dialog';
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
import { PlusCircle, ShieldCheck, Sun, Wind } from 'lucide-react';

const allDashboardData: Record<string, any> = {
    'user1@agrivision.ai': {
        yieldHistory: [
            { date: '2024-07-15', crop: 'Wheat', predicted: '4.5', actual: '4.2' },
            { date: '2024-03-20', crop: 'Corn', predicted: '8.1', actual: null },
            { date: '2023-11-10', crop: 'Soybeans', predicted: '3.2', actual: '3.5' },
        ],
        recommendedSchemes: [
            { name: 'PM-KISAN', reason: 'Based on your small landholding.' },
            { name: 'PM Fasal Bima Yojana', reason: 'Due to weather unpredictability in your region.' },
        ],
        weather: {
            temp: '28°C',
            condition: 'Sunny',
            wind: '12 km/h',
            alert: 'No Rain Expected',
            advice: 'Safe to spray pesticides.'
        }
    },
    'user2@agrivision.ai': {
        yieldHistory: [
            { date: '2024-08-01', crop: 'Rice', predicted: '6.2', actual: '6.5' },
            { date: '2024-04-10', crop: 'Sugarcane', predicted: '70.5', actual: null },
        ],
        recommendedSchemes: [
            { name: 'Soil Health Card Scheme', reason: 'To optimize fertilizer use for your varied crops.' },
            { name: 'National Agriculture Market (eNAM)', reason: 'To get better prices for your sugarcane.' },
        ],
        weather: {
            temp: '32°C',
            condition: 'Partly Cloudy',
            wind: '15 km/h',
            alert: 'Light Showers Possible',
            advice: 'Delay spraying if possible.'
        }
    },
    'user3@agrivision.ai': {
        yieldHistory: [
            { date: '2024-06-25', crop: 'Cotton', predicted: '2.1', actual: '2.3' },
            { date: '2023-12-15', crop: 'Mustard', predicted: '1.8', actual: '1.7' },
        ],
        recommendedSchemes: [
            { name: 'Kisan Credit Card (KCC)', reason: 'For easy access to credit for your cash crops.' },
        ],
        weather: {
            temp: '35°C',
            condition: 'Hot & Dry',
            wind: '8 km/h',
            alert: 'Heatwave Warning',
            advice: 'Ensure adequate irrigation.'
        }
    }
};


export default function DashboardPage() {
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const isAuthenticated = !!currentUser;
  const userData = currentUser ? allDashboardData[currentUser] : null;

  return (
    <>
      <Header />
      {!isAuthenticated && <LoginDialog onLoginSuccess={(user) => setCurrentUser(user)} />}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline text-foreground">
            {isAuthenticated ? t('dashboard.welcome') : t('dashboard.login.title')}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {isAuthenticated ? t('dashboard.subtitle') : t('dashboard.login.description')}
          </p>
        </div>

        {isAuthenticated && userData && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Yield Prediction History */}
            <Card className="md:col-span-2">
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

            {/* Recommended Schemes */}
            <Card>
                <CardHeader>
                <CardTitle>{t('dashboard.schemes.title')}</CardTitle>
                <CardDescription>{t('dashboard.schemes.description')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                {userData.recommendedSchemes.map((scheme: any, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                    <ShieldCheck className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                        <p className="font-semibold">{scheme.name}</p>
                        <p className="text-sm text-muted-foreground">{scheme.reason}</p>
                    </div>
                    </div>
                ))}
                </CardContent>
            </Card>

            {/* Weather Outlook */}
            <Card className="md:col-span-3">
                <CardHeader>
                <CardTitle>{t('dashboard.weather.title')}</CardTitle>
                <CardDescription>{t('dashboard.weather.description')}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-around items-center">
                    <div className="text-center">
                        <Sun className="h-12 w-12 mx-auto text-yellow-500" />
                        <p className="font-bold text-xl">{userData.weather.temp}</p>
                        <p className="text-muted-foreground">{userData.weather.condition}</p>
                    </div>
                    <div className="text-center">
                        <Wind className="h-12 w-12 mx-auto text-blue-400" />
                        <p className="font-bold text-xl">{userData.weather.wind}</p>
                        <p className="text-muted-foreground">Wind Speed</p>
                    </div>
                    <div className="text-center text-green-600">
                        <p className="font-bold text-lg">{userData.weather.alert}</p>
                        <p className="text-sm">{userData.weather.advice}</p>
                    </div>
                </CardContent>
            </Card>
            </div>
        )}
      </div>
    </>
  );
}
