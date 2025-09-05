
'use client';

import { TrendingUp, BarChart } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { MarketPriceAnalysisOutput, PriceEntry } from '@/ai/tools/market-price';
import { format } from 'date-fns';
import { useTranslation } from '@/hooks/use-translation';

interface MarketPriceChartProps {
    data: MarketPriceAnalysisOutput;
}

const chartConfig = {
    price: {
        label: 'Price (₹/Quintal)',
        color: 'hsl(var(--primary))',
    },
};

export default function MarketPriceChart({ data }: MarketPriceChartProps) {
  const { t } = useTranslation();
  const formattedData = data.history.map((item: PriceEntry) => ({
    date: format(new Date(item.date), 'MMM d'),
    price: item.price
  }));

  return (
    <div className="space-y-4">
        <div className="p-4 rounded-lg bg-muted/50 space-y-2">
            <h4 className="font-semibold text-sm">{t('dashboard.market.analysis')}</h4>
            <p className="text-sm text-muted-foreground">{data.trend}</p>
            <h4 className="font-semibold text-sm pt-2">{t('dashboard.market.forecast')}</h4>
            <p className="text-sm text-muted-foreground">{data.forecast}</p>
        </div>
        <ChartContainer config={chartConfig}>
            <AreaChart
                accessibilityLayer
                data={formattedData}
                margin={{
                left: 12,
                right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value}
                />
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                dataKey="price"
                type="natural"
                fill="var(--color-price)"
                fillOpacity={0.4}
                stroke="var(--color-price)"
                stackId="a"
                />
            </AreaChart>
        </ChartContainer>
    </div>
  );
}
