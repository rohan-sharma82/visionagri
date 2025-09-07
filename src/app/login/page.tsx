
'use client';
import { useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { login, signup } from '@/app/auth/actions';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

function SubmitButton({ isSignUp }: { isSignUp: boolean }) {
  const { pending } = useFormStatus();
  const { t } = useTranslation();

  return (
    <Button type="submit" disabled={pending} className="mt-4">
      {pending ? '...' : isSignUp ? t('login.buttons.signup') : t('login.buttons.signin')}
    </Button>
  );
}

export default function LoginPage() {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  
  const [loginState, loginAction] = useActionState(login, { success: true, message: '' });
  const [signupState, signupAction] = useActionState(signup, { success: true, message: '' });

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent p-4">
      <div className={cn("login-slider-container w-full max-w-3xl", isActive && "right-panel-active")}>
        {/* Sign Up */}
        <div className="form-container sign-up-container">
          <form action={signupAction}>
            <h1 className="font-bold text-2xl mb-2">{t('login.createAccount')}</h1>
            <Input type="text" name="full_name" placeholder={t('login.fullName')} required />
            <Input type="email" name="email" placeholder={t('login.email')} required />
            <Input type="password" name="password" placeholder={t('login.password')} required />
             {!signupState.success && (
                <Alert variant="destructive" className="mt-4 text-left">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>{t('login.error.title')}</AlertTitle>
                  <AlertDescription>{t(signupState.message)}</AlertDescription>
                </Alert>
              )}
            <SubmitButton isSignUp={true} />
             <Link href="/" className="text-sm mt-4 underline">{t('login.back')}</Link>
          </form>
        </div>

        {/* Sign In */}
        <div className="form-container sign-in-container">
          <form action={loginAction}>
            <h1 className="font-bold text-2xl mb-2">{t('login.signIn')}</h1>
            <Input type="email" name="email" placeholder={t('login.email')} required />
            <Input type="password" name="password" placeholder={t('login.password')} required />
            {!loginState.success && (
              <Alert variant="destructive" className="mt-4 text-left">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{t('login.error.title')}</AlertTitle>
                <AlertDescription>{t(loginState.message)}</AlertDescription>
              </Alert>
            )}
            <a href="#" className="text-sm my-2">{t('login.forgotPassword')}</a>
            <SubmitButton isSignUp={false} />
            <Link href="/" className="text-sm mt-4 underline">{t('login.back')}</Link>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="font-bold text-2xl">{t('login.welcomeBack')}</h1>
              <p className="text-sm mt-2">{t('login.leftPanelDescription')}</p>
              <Button variant="ghost" className="mt-4 ghost" onClick={() => setIsActive(false)}>
                {t('login.signIn')}
              </Button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="font-bold text-2xl">{t('login.helloFriend')}</h1>
              <p className="text-sm mt-2">{t('login.rightPanelDescription')}</p>
              <Button variant="ghost" className="mt-4 ghost" onClick={() => setIsActive(true)}>
                {t('login.buttons.signup')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
