
'use client';
import { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoginPrismProps {
  onLoginSuccess: (user: string) => void;
}

const dummyUsers = {
    'user1@agrivision.ai': 'bitbusters',
    'user2@agrivision.ai': 'sihwinners',
    'user3@agrivision.ai': 'bitbust',
};


export default function LoginPrism({ onLoginSuccess }: LoginPrismProps) {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (dummyUsers[email as keyof typeof dummyUsers] && dummyUsers[email as keyof typeof dummyUsers] === password) {
        onLoginSuccess(email);
        setError('');
        setEmail('');
        setPassword('');
    } else {
      setError(t('dashboard.login.error'));
    }
  };

  return (
    <div className='flex flex-col items-center gap-8'>
       <div className={cn("login-slider-container", isActive && "right-panel-active")}>
            <div className="form-container sign-up-container">
                <form action="#">
                    <h1>Create Account</h1>
                    <div className="social-container">
                        {/* Social icons can be added here */}
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form onSubmit={handleLogin}>
                    <h1>Sign in</h1>
                    <div className="social-container">
                         {/* Social icons can be added here */}
                    </div>
                    <span>or use your account</span>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <a href="#">Forgot your password?</a>
                    <button>Sign In</button>
                    {error && <p className="text-destructive text-xs mt-2">{error}</p>}
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn" onClick={() => setIsActive(false)}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp" onClick={() => setIsActive(true)}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
      
      <Card className="bg-card/80 max-w-sm mx-auto">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    {t('dashboard.login.judgeInfo.title')}
                </CardTitle>
                <CardDescription className="text-xs">
                    {t('dashboard.login.judgeInfo.description')}
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
