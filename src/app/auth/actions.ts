
'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore });

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: 'Could not authenticate user. Please check your credentials.' };
  }

  redirect('/dashboard');
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore });

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  });

  if (error) {
     return { error: 'Could not sign up user. This email might already be taken.' };
  }

  // Right now, Supabase is configured to not require email verification for simplicity.
  // In a real app, you would show a "Check your email to verify" message here.
  // Since auto-verification is on, we'll try to log them in directly.
  
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if(loginError) {
     return { error: 'Sign up successful, but failed to log in automatically.' };
  }

  redirect('/dashboard');
}

export async function logout() {
    const cookieStore = cookies();
    const supabase = createServerActionClient({ cookies: () => cookieStore });
    await supabase.auth.signOut();
    redirect('/login');
}
