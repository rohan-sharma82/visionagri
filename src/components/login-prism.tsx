
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

type Face = 'login' | 'signup' | 'forgotPassword' | 'subscribe' | 'contact' | 'thankyou';


export default function LoginPrism({ onLoginSuccess }: LoginPrismProps) {
  const { t } = useTranslation();
  const prismRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const showFace = (face: Face) => {
    if (!prismRef.current) return;
    switch (face) {
        case 'login':
            prismRef.current.style.transform = 'translateZ(-125px) rotateY(0deg)';
            break;
        case 'signup':
            prismRef.current.style.transform = 'translateZ(-125px) rotateY(-90deg)';
            break;
        case 'forgotPassword':
            prismRef.current.style.transform = 'translateZ(-125px) rotateY(-180deg)';
            break;
        case 'subscribe':
            prismRef.current.style.transform = 'translateZ(-125px) rotateX(-90deg)';
            break;
        case 'contact':
            prismRef.current.style.transform = 'translateZ(-125px) rotateY(90deg)';
            break;
        case 'thankyou':
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
        <h2 className="text-2xl font-bold mb-4">{t('dashboard.login.title')}</h2>
      
        <ul className="login-prism-nav">
            <li onClick={() => showFace('login')}>{t('dashboard.login.prism.nav.login')}</li>
            <li onClick={() => showFace('signup')}>{t('dashboard.login.prism.nav.signup')}</li>
            <li onClick={() => showFace('forgotPassword')}>{t('dashboard.login.prism.nav.forgotPassword')}</li>
            <li onClick={() => showFace('subscribe')}>{t('dashboard.login.prism.nav.subscribe')}</li>
            <li onClick={() => showFace('contact')}>{t('dashboard.login.prism.nav.contactUs')}</li>
        </ul>

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
                                name="email" 
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
                        <span className="psw" onClick={() => showFace('forgotPassword')}>{t('dashboard.login.prism.forgotLink')}</span>
                        <span className="signup" onClick={() => showFace('signup')}>{t('dashboard.login.prism.signupLink')}</span>
                    </form>
                </div>
            </div>

            {/* Subscribe Face */}
            <div className="face face-top">
                <div className="content">
                    <h2>{t('dashboard.login.prism.subscribeTitle')}</h2>
                    <small>{t('dashboard.login.prism.subscribeDescription')}</small>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="field-wrapper">
                            <input type="text" name="email" placeholder="email" />
                            <label>{t('dashboard.login.prism.email')}</label>
                        </div>
                        <div className="field-wrapper">
                            <input type="submit" onClick={() => showFace('thankyou')} />
                        </div>
                    </form>
                </div>
            </div>
            
            {/* Forgot Password Face */}
            <div className="face face-back">
                <div className="content">
                    <h2>{t('dashboard.login.prism.forgotTitle')}</h2>
                    <small>{t('dashboard.login.prism.forgotDescription')}</small>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="field-wrapper">
                            <input type="text" name="email" placeholder="email" />
                            <label>{t('dashboard.login.prism.email')}</label>
                        </div>
                        <div className="field-wrapper">
                            <input type="submit" onClick={() => showFace('thankyou')} />
                        </div>
                    </form>
                </div>
            </div>

            {/* Sign Up Face */}
            <div className="face face-right">
                <div className="content">
                    <h2>{t('dashboard.login.prism.signUp')}</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
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
                            <label>{t('dashboard.login.prism.reenterPassword')}</label>
                        </div>
                        <div className="field-wrapper">
                            <input type="submit" onClick={() => showFace('thankyou')} />
                        </div>
                        <span className="singin" onClick={() => showFace('login')}>{t('dashboard.login.prism.signInLink')}</span>
                    </form>
                </div>
            </div>

            {/* Contact Us Face */}
            <div className="face face-left">
                <div className="content">
                    <h2>{t('dashboard.login.prism.contactTitle')}</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="field-wrapper">
                            <input type="text" name="name" placeholder="name" />
                            <label>{t('dashboard.login.prism.name')}</label>
                        </div>
                        <div className="field-wrapper">
                            <input type="text" name="email" placeholder="email" />
                            <label>{t('dashboard.login.prism.email')}</label>
                        </div>
                        <div className="field-wrapper">
                            <textarea placeholder="your message" rows={1}></textarea>
                            <label>{t('dashboard.login.prism.message')}</label>
                        </div>
                        <div className="field-wrapper">
                            <input type="submit" onClick={() => showFace('thankyou')} />
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
      
      <Card className="mt-8 bg-card/80 max-w-sm mx-auto">
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
