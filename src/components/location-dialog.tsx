
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLocation, useTranslation } from '@/hooks/use-translation';

export default function LocationDialog() {
  const { location, setLocation } = useLocation();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // This effect runs once on the client when the component mounts.
    const savedLocation = localStorage.getItem('user-location');

    if (savedLocation) {
      // If a location is saved, pre-fill the input and the global state.
      setInputValue(savedLocation);
      setLocation(savedLocation);
    }
    
    // Always open the dialog on app load.
    setIsOpen(true);
  }, [setLocation]);

  const handleSave = () => {
    if (inputValue.trim()) {
      setLocation(inputValue);
      localStorage.setItem('user-location', inputValue);
      setIsOpen(false);
    }
  };

  const handleLater = () => {
    setIsOpen(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] bg-amber-100/30 dark:bg-amber-950/30 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle>{t('locationDialog.title')}</DialogTitle>
          <DialogDescription>
            {t('locationDialog.description')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              {t('locationDialog.label')}
            </Label>
            <Input
              id="location"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('locationDialog.placeholder')}
              className="col-span-3"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSave();
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            onClick={handleLater} 
            variant="outline"
          >
            {t('locationDialog.later')}
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!inputValue.trim()}
          >
            {t('locationDialog.ok')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
