
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

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // In a real app, you'd want email verification.
      // For this hackathon, we disable it to make testing easier.
      // The user is logged in immediately after signing up.
    },
  });

  if (error) {
     return { error: 'Could not sign up user. This email might already be taken or the password is too weak.' };
  }

  // Manually revalidate and redirect after successful signup
  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function logout() {
    const cookieStore = cookies();
    const supabase = createServerActionClient({ cookies: () => cookieStore });
    await supabase.auth.signOut();
    redirect('/');
}
