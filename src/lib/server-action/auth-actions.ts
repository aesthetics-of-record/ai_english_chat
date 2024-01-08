'use server';

import { z } from 'zod';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { FormSchema } from '../types';
import { cookies } from 'next/headers';

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (response.error) {
    return { error: { message: '잘못된 이메일/암호 입니다.' } };
  }

  return response;
}

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email);

  if (data?.length)
    return { error: { message: '이미 회원가입 된 유저입니다.', data } };
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  });
  return response;
}
