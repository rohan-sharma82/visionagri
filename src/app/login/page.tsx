
'use client';
import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { login, signup } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { Loader2, Info, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

function SubmitButton({ isSignUp }: { isSignUp: boolean }) {
    const { t } = useTranslation();
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? <Loader2 className="animate-spin" /> : (isSignUp ? t('login.buttons.signup') : t('login.buttons.signin'))}
        </Button>
    );
}

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  
  const [loginState, loginAction] = useActionState(login, { success: false, message: '' });
  const [signupState, signupAction] = useActionState(signup, { success: false, message: '' });

  const state = isSignUp ? signupState : loginState;

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent pt-16 pb-8 px-4 gap-8 relative">
      <Button
        onClick={handleBack}
        variant="ghost"
        className="absolute top-20 left-4 md:top-24 md:left-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('login.back')}
      </Button>
      
      <div className={cn("login-slider-container", isSignUp && "right-panel-active")}>
        <div className="form-container sign-up-container">
          <form action={signupAction}>
            <h1 className="text-2xl font-bold mb-4">{t('login.createAccount')}</h1>
            <Label htmlFor="full_name-signup" className="sr-only">{t('login.fullName')}</Label>
            <Input id="full_name-signup" name="full_name" type="text" placeholder={t('login.fullName')} required />
            <Label htmlFor="email-signup" className="sr-only">{t('login.email')}</Label>
            <Input id="email-signup" name="email" type="email" placeholder={t('login.email')} required />
            <Label htmlFor="password-signup" className="sr-only">{t('login.password')}</Label>
            <Input id="password-signup" name="password" type="password" placeholder={t('login.password')} required minLength={6} />
            <SubmitButton isSignUp={true} />
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action={loginAction}>
            <h1 className="text-2xl font-bold mb-4">{t('login.signIn')}</h1>
            <Label htmlFor="email-signin" className="sr-only">{t('login.email')}</Label>
            <Input id="email-signin" name="email" type="email" placeholder={t('login.email')} required />
            <Label htmlFor="password-signin" className="sr-only">{t('login.password')}</Label>
            <Input id="password-signin" name="password" type="password" placeholder={t('login.password')} required />
            <a href="#" className="text-xs my-2">{t('login.forgotPassword')}</a>
            <SubmitButton isSignUp={false} />
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="text-2xl font-bold">{t('login.welcomeBack')}</h1>
              <p className="text-sm mt-2">{t('login.leftPanelDescription')}</p>
              <Button className="ghost mt-4" id="signIn" onClick={() => { setIsSignUp(false); }}>
                {t('login.buttons.signin')}
              </Button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="text-2xl font-bold">{t('login.helloFriend')}</h1>
              <p className="text-sm mt-2">{t('login.rightPanelDescription')}</p>
              <Button className="ghost mt-4" id="signUp" onClick={() => { setIsSignUp(true); }}>
                {t('login.buttons.signup')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {state && !state.success && state.message && (
          <Alert variant='destructive' className="max-w-md w-full bg-card/90">
              <AlertTitle>{t('login.error.title')}</AlertTitle>
              <AlertDescription>{t(state.message)}</AlertDescription>
          </Alert>
      )}

       <Card className="bg-card/80 max-w-sm mx-auto">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    {t('login.judgeInfo.title')}
                </CardTitle>
                <CardDescription className="text-xs">
                    {t('login.judgeInfo.description')}
                </CardDescription>
            </CardHeader>
            <CardContent className="text-xs space-y-1 text-left">
                <p><strong>{t('login.judgeInfo.user1.label')}:</strong> {t('login.judgeInfo.user1.value')}</p>
                <p><strong>{t('login.judgeInfo.user2.label')}:</strong> {t('login.judgeInfo.user2.value')}</p>
                <p><strong>{t('login.judgeInfo.user3.label')}:</strong> {t('login.judgeInfo.user3.value')}</p>
            </CardContent>
        </Card>
    </div>
  );
}
