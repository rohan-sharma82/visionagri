
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
import { useApp } from '@/hooks/use-app-provider';

export default function LocationDialog() {
  const { location, setLocation } = useLocation();
  const { t } = useTranslation();
  const { isLocationDialogOpen, setLocationDialogOpen } = useApp();
  const [inputValue, setInputValue] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const savedLocation = sessionStorage.getItem('user-location');
      if (savedLocation) {
        if (location !== savedLocation) {
          setLocation(savedLocation);
        }
        setLocationDialogOpen(false);
      } else {
        setLocationDialogOpen(true);
      }
    }
  }, [isMounted, setLocation, location, setLocationDialogOpen]);


  const handleSave = () => {
    if (inputValue.trim()) {
      const newLocation = inputValue.trim();
      setLocation(newLocation);
      sessionStorage.setItem('user-location', newLocation);
      setLocationDialogOpen(false);
    }
  };
  
  if (!isLocationDialogOpen) {
      return null;
  }

  return (
    <Dialog open={isLocationDialogOpen} onOpenChange={setLocationDialogOpen}>
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
