
'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { profiles } from '@/lib/schema';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore });

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, message: 'login.error.invalidCredentials' };
  }
  
  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function signup(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('full_name') as string;
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore });

  // Sign up the user
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
     return { success: false, message: 'login.error.signupFailed' };
  }

  if (data.user) {
    // Create a corresponding profile in the public.profiles table
    try {
      await db.insert(profiles).values({
        id: data.user.id,
        email: data.user.email,
        full_name: fullName,
      });
    } catch (dbError) {
      console.error('Error creating profile:', dbError);
      // Optional: handle profile creation error, e.g., by deleting the auth user
      // For now, we'll just log it. The user will exist in auth but not have a profile.
      return { success: false, message: 'login.error.profileCreation' };
    }
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function logout() {
    const cookieStore = cookies();
    const supabase = createServerActionClient({ cookies: () => cookieStore });
    await supabase.auth.signOut();
    revalidatePath('/', 'layout');
}
