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
        setError('');
    } else {
      setError(t('dashboard.login.error'));
    }
  };

  return (
    <div className='text-center'>
        <h2 className="text-2xl font-bold mb-4">{t('dashboard.login.prism.title')}</h2>
      <div className="login-prism-wrapper">
        <div className="rec-prism" ref={prismRef}>
            {/* Login Face */}
            <div className="face face-front">
            <div className="content">
                <h2>{t('dashboard.login.prism.signIn')}</h2>
                <form onSubmit={handleLogin}>
                    <div className="field-wrapper">
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>{t('dashboard.login.prism.email')}</label>
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
                        <label>{t('dashboard.login.prism.password')}</label>
                    </div>
                    {error && <p className="text-destructive text-xs text-center mt-2">{error}</p>}
                    <div className="field-wrapper">
                        <input type="submit" value={t('dashboard.login.button')} />
                    </div>
                    <span className="psw" onClick={() => showFace('back')}>{t('dashboard.login.prism.forgotPassword')}</span>
                    <span className="signup" onClick={() => showFace('right')}>{t('dashboard.login.prism.notAUser')}</span>
                </form>
            </div>
            </div>
            {/* Subscribe Face */}
            <div className="face face-top">
                <div className="content">
                    <h2>{t('dashboard.login.prism.subscribe.title')}</h2>
                    <small>{t('dashboard.login.prism.subscribe.description')}</small>
                    <form onSubmit={e => e.preventDefault()}>
                    <div className="field-wrapper">
                        <input type="text" name="email" placeholder="email" />
                        <label>{t('dashboard.login.prism.email')}</label>
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
                    <h2>{t('dashboard.login.prism.forgot.title')}</h2>
                    <small>{t('dashboard.login.prism.forgot.description')}</small>
                    <form onSubmit={e => e.preventDefault()}>
                    <div className="field-wrapper">
                        <input type="text" name="email" placeholder="email" />
                        <label>{t('dashboard.login.prism.email')}</label>
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
                    <h2>{t('dashboard.login.prism.signUp.title')}</h2>
                    <form onSubmit={e => e.preventDefault()}>
                    <div className="field-wrapper">
                        <input type="text" name="email" placeholder="email" />
                        <label>{t('dashboard.login.prism.email')}</label>
                    </div>
                    <div className="field-wrapper">
                        <input type="password" name="password" placeholder="password" autoComplete="new-password" />
                        <label>{t('dashboard.login.prism.password')}</label>
                    </div>
                    <div className="field-wrapper">
                        <input type="password" name="password2" placeholder="password" autoComplete="new-password" />
                        <label>{t('dashboard.login.prism.reEnterPassword')}</label>
                    </div>
                    <div className="field-wrapper">
                        <input type="submit" onClick={() => showFace('bottom')} />
                    </div>
                    <span className="singin" onClick={() => showFace('front')}>{t('dashboard.login.prism.alreadyAUser')}</span>
                    </form>
                </div>
            </div>
            {/* Contact Us Face */}
            <div className="face face-left">
                <div className="content">
                    <h2>{t('dashboard.login.prism.contact.title')}</h2>
                    <form onSubmit={e => e.preventDefault()}>
                        <div className="field-wrapper">
                            <input type="text" name="name" placeholder="name" />
                            <label>{t('dashboard.login.prism.contact.name')}</label>
                        </div>
                        <div className="field-wrapper">
                            <input type="text" name="email" placeholder="email" />
                            <label>{t('dashboard.login.prism.email')}</label>
                        </div>
                        <div className="field-wrapper">
                            <textarea placeholder="your message"></textarea>
                            <label>{t('dashboard.login.prism.contact.message')}</label>
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
                        {t('dashboard.login.prism.thankYou')}
                    </div>
                </div>
            </div>
        </div>
      </div>
      <ul className="login-prism-nav">
        <li onClick={() => showFace('front')}>{t('dashboard.login.prism.nav.login')}</li>
        <li onClick={() => showFace('right')}>{t('dashboard.login.prism.nav.signUp')}</li>
        <li onClick={() => showFace('back')}>{t('dashboard.login.prism.nav.forgotPassword')}</li>
        <li onClick={() => showFace('top')}>{t('dashboard.login.prism.nav.subscribe')}</li>
        <li onClick={() => showFace('left')}>{t('dashboard.login.prism.nav.contact')}</li>
      </ul>
      <Card className="mt-4 bg-card/80 max-w-sm mx-auto">
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