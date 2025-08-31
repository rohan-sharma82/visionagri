
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shovel, TestTube2, Calculator, Lightbulb } from 'lucide-react';

const Star = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    version="1.1"
    style={{
      shapeRendering: 'geometricPrecision',
      textRendering: 'geometricPrecision',
      imageRendering: 'optimizeQuality',
    }}
    viewBox="0 0 784.11 815.53"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g>
      <path
        className="fil0"
        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
      ></path>
    </g>
  </svg>
);

const schoolTopics = [
    {
        title: "Tools",
        description: "Learn about essential farming tools and machinery.",
        icon: <Shovel className="h-8 w-8 text-accent" />
    },
    {
        title: "Fertilizers",
        description: "Understand different types of fertilizers and their uses.",
        icon: <TestTube2 className="h-8 w-8 text-accent" />
    },
    {
        title: "Area Calculator",
        description: "Calculate your farm's area for planning and resource management.",
        icon: <Calculator className="h-8 w-8 text-accent" />
    },
    {
        title: "Profit Making Tips",
        description: "Discover strategies to increase your farm's profitability.",
        icon: <Lightbulb className="h-8 w-8 text-accent" />
    }
]

export default function FarmSchoolDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="language-button-stars">
            Farm School
            <div className="star-1"><Star /></div>
            <div className="star-2"><Star /></div>
            <div className="star-3"><Star /></div>
            <div className="star-4"><Star /></div>
            <div className="star-5"><Star /></div>
            <div className="star-6"><Star /></div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Welcome to Farm School!</DialogTitle>
          <DialogDescription>
            Gain knowledge about farming essentials. Click on a topic to learn more (functionality coming soon).
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {schoolTopics.map((topic) => (
                 <Card key={topic.title} className="hover:shadow-lg hover:border-accent transition-all cursor-pointer">
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                        {topic.icon}
                        <CardTitle className="text-xl font-medium">{topic.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{topic.description}</p>
                    </CardContent>
                 </Card>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
