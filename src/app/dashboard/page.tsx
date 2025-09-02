
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

// Dummy data for placeholder UI
const yieldHistory = [
  { date: '2024-07-15', crop: 'Wheat', predicted: '4.5', actual: '4.2' },
  { date: '2024-03-20', crop: 'Corn', predicted: '8.1', actual: null },
  { date: '2023-11-10', crop: 'Soybeans', predicted: '3.2', actual: '3.5' },
];

const recommendedSchemes = [
  { name: 'PM-KISAN', reason: 'Based on your small landholding.' },
  { name: 'PM Fasal Bima Yojana', reason: 'Due to weather unpredictability in your region.' },
];

export default function DashboardPage() {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginDialog onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline text-foreground">
            {t('dashboard.welcome')}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {t('dashboard.subtitle')}
          </p>
        </div>

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
                  {yieldHistory.map((entry, index) => (
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
              {recommendedSchemes.map((scheme, index) => (
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
                    <p className="font-bold text-xl">28°C</p>
                    <p className="text-muted-foreground">Sunny</p>
                </div>
                 <div className="text-center">
                    <Wind className="h-12 w-12 mx-auto text-blue-400" />
                    <p className="font-bold text-xl">12 km/h</p>
                    <p className="text-muted-foreground">Wind Speed</p>
                </div>
                <div className="text-center text-green-600">
                    <p className="font-bold text-lg">No Rain Expected</p>
                    <p className="text-sm">Safe to spray pesticides.</p>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
