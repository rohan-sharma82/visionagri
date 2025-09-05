
'use client';
import { useState } from 'react';
import { login, signup } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function LoginPage() {
  const { t } = useTranslation();
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
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/50 backdrop-blur-sm p-4">
      <div className={cn("login-slider-container", isSignUp && "right-panel-active")}>
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-4">Create Account</h1>
            <Label htmlFor="email-signup" className="sr-only">Email</Label>
            <Input id="email-signup" name="email" type="email" placeholder="Email" required />
            <Label htmlFor="password-signup" className="sr-only">Password</Label>
            <Input id="password-signup" name="password" type="password" placeholder="Password" required />
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
              <Button variant="ghost" className="mt-4" onClick={() => setIsSignUp(false)}>
                Sign In
              </Button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="text-2xl font-bold">Hello, Farmer!</h1>
              <p className="text-sm mt-2">Enter your personal details and start your journey with us</p>
              <Button variant="ghost" className="mt-4" onClick={() => setIsSignUp(true)}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
        {message && (
            <Alert variant="destructive" className="absolute bottom-4 left-4 right-4 w-auto">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
            </Alert>
        )}
      </div>
    </div>
  );
}
