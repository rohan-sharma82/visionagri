
'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
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
  
  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore });
  const origin = new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002');


  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin.origin}/auth/callback`,
    },
  });

  if (error) {
     return { error: 'Could not sign up user. This email might already be taken or the password is too weak.' };
  }

  revalidatePath('/', 'layout');
  // We don't redirect here. The user needs to verify their email first.
  // The user will be redirected from the /auth/callback route after successful verification.
  return { error: null, data: 'Confirmation link has been sent to your email address. Please verify to log in.' };
}

export async function logout() {
    const cookieStore = cookies();
    const supabase = createServerActionClient({ cookies: () => cookieStore });
    await supabase.auth.signOut();
    redirect('/login');
}
