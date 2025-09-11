
'use client';

import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent p-4">
       <div className="w-full max-w-md text-center">
        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Authentication Removed</AlertTitle>
            <AlertDescription>
                This feature has been removed to make the application fully accessible to all users without requiring a login.
            </AlertDescription>
        </Alert>
        <Link href="/" className="text-sm mt-4 underline inline-block">
            {t('login.back')}
        </Link>
       </div>
    </div>
  );
}
