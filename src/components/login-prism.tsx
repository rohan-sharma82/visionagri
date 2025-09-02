
'use client';
import { useRef, useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Info } from 'lucide-react';

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
  const prismRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const showFace = (face: 'front' | 'back' | 'right' | 'left' | 'top' | 'bottom') => {
    if (!prismRef.current) return;
    switch (face) {
      case 'front': // Login
        prismRef.current.style.transform = 'translateZ(-125px) rotateY(0deg)';
        break;
      case 'right': // Sign up
        prismRef.current.style.transform = 'translateZ(-125px) rotateY(-90deg)';
        break;
      case 'back': // Forgot password
        prismRef.current.style.transform = 'translateZ(-125px) rotateY(-180deg)';
        break;
      case 'left': // Contact Us
        prismRef.current.style.transform = 'translateZ(-125px) rotateY(90deg)';
        break;
      case 'top': // Subscribe
        prismRef.current.style.transform = 'translateZ(-125px) rotateX(-90deg)';
        break;
      case 'bottom': // Thank you
        prismRef.current.style.transform = 'translateZ(-125px) rotateX(90deg)';
        break;
      default:
        break;
    }
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (dummyUsers[email as keyof typeof dummyUsers] && dummyUsers[email as keyof typeof dummyUsers] === password) {
      onLoginSuccess(email);
    } else {
      setError(t('dashboard.login.error'));
    }
  };

  return (
    <div className='text-center'>
      <ul className="login-prism-nav">
        <li onClick={() => showFace('front')}>Login</li>
        <li onClick={() => showFace('right')}>Sign up</li>
        <li onClick={() => showFace('back')}>Forgot password</li>
        <li onClick={() => showFace('top')}>Subscribe</li>
        <li onClick={() => showFace('left')}>Contact us</li>
      </ul>
      <div className="login-prism-wrapper">
        <div className="rec-prism" ref={prismRef}>
            {/* Login Face */}
            <div className="face face-front">
            <div className="content">
                <h2>Sign in</h2>
                <form onSubmit={handleLogin}>
                    <div className="field-wrapper">
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>e-mail</label>
                    </div>
                    <div className="field-wrapper">
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="password" 
                            autoComplete="new-password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>password</label>
                    </div>
                    {error && <p className="text-destructive text-xs text-center mt-2">{error}</p>}
                    <div className="field-wrapper">
                        <input type="submit" value="Login" />
                    </div>
                    <span className="psw" onClick={() => showFace('back')}>Forgot Password?</span>
                    <span className="signup" onClick={() => showFace('right')}>Not a user? Sign up</span>
                </form>
            </div>
            </div>
            {/* Subscribe Face */}
            <div className="face face-top">
                <div className="content">
                    <h2>Subscribe</h2>
                    <small>Enter your email so we can send you the latest updates!</small>
                    <form onSubmit={e => e.preventDefault()}>
                    <div className="field-wrapper">
                        <input type="text" name="email" placeholder="email" />
                        <label>e-mail</label>
                    </div>
                    <div className="field-wrapper">
                        <input type="submit" onClick={() => showFace('bottom')} />
                    </div>
                    </form>
                </div>
            </div>
             {/* Forgot Password Face */}
            <div className="face face-back">
                <div className="content">
                    <h2>Forgot your password?</h2>
                    <small>Enter your email so we can send you a reset link for your password</small>
                    <form onSubmit={e => e.preventDefault()}>
                    <div className="field-wrapper">
                        <input type="text" name="email" placeholder="email" />
                        <label>e-mail</label>
                    </div>
                    <div className="field-wrapper">
                        <input type="submit" onClick={() => showFace('bottom')} />
                    </div>
                    </form>
                </div>
            </div>
             {/* Sign Up Face */}
            <div className="face face-right">
                <div className="content">
                    <h2>Sign up</h2>
                    <form onSubmit={e => e.preventDefault()}>
                    <div className="field-wrapper">
                        <input type="text" name="email" placeholder="email" />
                        <label>e-mail</label>
                    </div>
                    <div className="field-wrapper">
                        <input type="password" name="password" placeholder="password" autoComplete="new-password" />
                        <label>password</label>
                    </div>
                    <div className="field-wrapper">
                        <input type="password" name="password2" placeholder="password" autoComplete="new-password" />
                        <label>re-enter password</label>
                    </div>
                    <div className="field-wrapper">
                        <input type="submit" onClick={() => showFace('bottom')} />
                    </div>
                    <span className="singin" onClick={() => showFace('front')}>Already a user? Sign in</span>
                    </form>
                </div>
            </div>
            {/* Contact Us Face */}
            <div className="face face-left">
                <div className="content">
                    <h2>Contact us</h2>
                    <form onSubmit={e => e.preventDefault()}>
                        <div className="field-wrapper">
                            <input type="text" name="name" placeholder="name" />
                            <label>Name</label>
                        </div>
                        <div className="field-wrapper">
                            <input type="text" name="email" placeholder="email" />
                            <label>e-mail</label>
                        </div>
                        <div className="field-wrapper">
                            <textarea placeholder="your message"></textarea>
                            <label>your message</label>
                        </div>
                        <div className="field-wrapper">
                            <input type="submit" onClick={() => showFace('bottom')} />
                        </div>
                    </form>
                </div>
            </div>
            {/* Thank You Face */}
            <div className="face face-bottom">
                 <div className="content">
                    <div className="thank-you-msg">
                        Thank you!
                    </div>
                </div>
            </div>
        </div>
      </div>
      <Card className="mt-4 bg-card/80 max-w-sm mx-auto">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    For Judges: Dummy Credentials
                </CardTitle>
                <CardDescription className="text-xs">
                    Use these accounts to test the dashboard with different data.
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
