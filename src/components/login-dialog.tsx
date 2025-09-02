
'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { Mail, Asterisk } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';

interface LoginDialogProps {
  onLoginSuccess: () => void;
}

export default function LoginDialog({ onLoginSuccess }: LoginDialogProps) {
  const { t } = useTranslation();
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy credentials for SIH demo
    if (email === 'farmer@agrivision.ai' && password === 'password123') {
      onLoginSuccess();
    } else {
      setError(t('dashboard.login.error'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-sm">
        <div className={cn('login-owl', isPasswordFocused && 'password')}>
          <div className="hand"></div>
          <div className="hand hand-r"></div>
          <div className="arms">
            <div className="arm"></div>
            <div className="arm arm-r"></div>
          </div>
        </div>
        <form
          className="login-form-container"
          onSubmit={handleLogin}
        >
          <div className="control">
            <label htmlFor="email">
              <Mail className="h-4 w-4" />
            </label>
            <input
              id="email"
              placeholder={t('dashboard.login.emailPlaceholder')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="control">
            <label htmlFor="password">
              <Asterisk className="h-4 w-4" />
            </label>
            <input
              id="password"
              placeholder={t('dashboard.login.passwordPlaceholder')}
              type="password"
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-destructive text-sm text-center mb-2">{error}</p>}
          <div className="text-center">
            <Button type="submit" className="w-full">
              {t('dashboard.login.button')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
