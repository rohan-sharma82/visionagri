
'use client';
import { useState } from 'react';
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

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    const formData = new FormData(event.currentTarget);
    
    const action = isSignUp ? signup : login;
    const result = await action(formData);
    
    if (result?.error) {
        setMessage(result.error);
    }
    // On successful login or signup, the action redirects, so no success message is needed here.
    
    setIsLoading(false);
  };

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
        Back
      </Button>
      
      <div className={cn("login-slider-container", isSignUp && "right-panel-active")}>
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-4">Create Account</h1>
            <Label htmlFor="email-signup" className="sr-only">Email</Label>
            <Input id="email-signup" name="email" type="email" placeholder="Email" required />
            <Label htmlFor="password-signup" className="sr-only">Password</Label>
            <Input id="password-signup" name="password" type="password" placeholder="Password" required minLength={6} />
            <Button type="submit" disabled={isLoading} className="mt-4">
              {isLoading ? <Loader2 className="animate-spin" /> : 'Sign Up'}
            </Button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
            <Label htmlFor="email-signin" className="sr-only">Email</Label>
            <Input id="email-signin" name="email" type="email" placeholder="Email" required />
            <Label htmlFor="password-signin" className="sr-only">Password</Label>
            <Input id="password-signin" name="password" type="password" placeholder="Password" required />
            <a href="#" className="text-xs my-2">Forgot your password?</a>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : 'Sign In'}
            </Button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="text-2xl font-bold">Welcome Back!</h1>
              <p className="text-sm mt-2">To keep connected with us please login with your personal info</p>
              <Button variant="ghost" className="mt-4" onClick={() => { setIsSignUp(false); setMessage(''); }}>
                Sign In
              </Button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="text-2xl font-bold">Hello, Farmer!</h1>
              <p className="text-sm mt-2">Enter your personal details and start your journey with us</p>
              <Button variant="ghost" className="mt-4" onClick={() => { setIsSignUp(true); setMessage(''); }}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
        {message && (
            <Alert variant='destructive' className="absolute bottom-4 left-4 right-4 w-auto bg-card/90">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
            </Alert>
        )}
      </div>

       <Card className="bg-card/80 max-w-sm mx-auto">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    For SIH Judges & Testers
                </CardTitle>
                <CardDescription className="text-xs">
                    Use these dummy credentials to explore the personalized dashboard views.
                </CardDescription>
            </CardHeader>
            <CardContent className="text-xs space-y-1 text-left">
                <p><strong>User 1:</strong> user1@agrivision.ai | <strong>Pass:</strong> bitbusters</p>
                <p><strong>User 2:</strong> user2@agrivision.ai | <strong>Pass:</strong> sihwinners</p>
                <p><strong>User 3:</strong> user3@agrivision.ai | <strong>Pass:</strong> bitbust</p>
            </CardContent>
        </Card>
    </div>
  );
}
