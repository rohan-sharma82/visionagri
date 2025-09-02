
'use client';

import { useState, useMemo } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from './ui/scroll-area';

const conversionFactorsToSqMeters: { [key: string]: number } = {
  'Acre': 4046.86,
  'Hectare': 10000,
  'Bigha (UP)': 2529.29,
  'Guntha': 101.17,
  'Kanal': 505.857,
  'Square Feet': 0.092903,
  'Square Meter': 1,
  'Square Yard (Gaj)': 0.836127,
  'Cent': 40.4686,
  'Ground': 222.967,
};

const allUnits = Object.keys(conversionFactorsToSqMeters);

export default function LandUnitConverter() {
  const [inputValue, setInputValue] = useState('1');
  const [inputUnit, setInputUnit] = useState('Acre');

  const results = useMemo(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return null;

    const valueInSqMeters = value * conversionFactorsToSqMeters[inputUnit];

    const convertedValues: { [key:string]: number } = {};
    for (const unit of allUnits) {
      convertedValues[unit] = valueInSqMeters / conversionFactorsToSqMeters[unit];
    }
    return convertedValues;
  }, [inputValue, inputUnit]);

  return (
    <div className="space-y-4 flex flex-col h-full">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input Value</label>
          <Input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            className="text-lg"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Input Unit</label>
          <Select value={inputUnit} onValueChange={setInputUnit}>
            <SelectTrigger className="text-lg">
              <SelectValue placeholder="Select a unit" />
            </SelectTrigger>
            <SelectContent>
              {allUnits.map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        {results ? (
          <ScrollArea className="h-full rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/2">Unit</TableHead>
                        <TableHead className="text-right">Converted Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {Object.entries(results).map(([unit, value]) => (
                    <TableRow key={unit} className={unit === inputUnit ? 'bg-primary/10' : ''}>
                        <TableCell className="font-medium">{unit}</TableCell>
                        <TableCell className="text-right font-mono">{value.toLocaleString(undefined, { maximumFractionDigits: 4 })}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          </ScrollArea>
        ) : (
          <p className="text-center text-muted-foreground mt-8">
            Please enter a valid number to see conversions.
          </p>
        )}
      </div>
    </div>
  );
}
