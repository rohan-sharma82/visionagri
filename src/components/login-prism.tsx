
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
  const [isLogin, setIsLogin] = useState(true);
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
       <div className={cn("login-slide-main", !isLogin && "checked")}>
            <div className="login-slide-signup">
                <form>
                    <label htmlFor="chk" aria-hidden="true" onClick={() => setIsLogin(false)}>Sign up</label>
                    <input type="text" name="txt" placeholder="User name" required />
                    <input type="email" name="email" placeholder="Email" required />
                    <input type="password" name="pswd" placeholder="Password" required />
                    <button>Sign up</button>
                </form>
            </div>

            <div className="login-slide-login">
                <form onSubmit={handleLogin}>
                    <label htmlFor="chk" aria-hidden="true" onClick={() => setIsLogin(true)}>Login</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        name="pswd" 
                        placeholder="Password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button>Login</button>
                    {error && <p className="text-destructive text-xs text-center mt-2">{error}</p>}
                </form>
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
