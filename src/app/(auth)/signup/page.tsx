'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Loader from '@/components/global/Loader';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MailCheck } from 'lucide-react';
import { FormSchema } from '@/lib/types';
import { actionSignUpUser } from '@/lib/server-action/auth-actions';

const SignUpFormSchema = z
  .object({
    email: z
      .string()
      .describe('Email')
      .email({ message: '유효하지 않은 이메일형식' }),
    password: z
      .string()
      .describe('Password')
      .min(6, '암호는 최소한 6글자 이상이어야 합니다.'),
    confirmPassword: z
      .string()
      .describe('Confirm Password')
      .min(6, '암호는 최소한 6글자 이상이어야 합니다.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '암호와 확인암호가 다릅니다.',
    path: ['confirmPassword'],
  });

const Signup = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState('');
  const [confirmation, setConfirmation] = useState(false);

  const codeExchangeError = useMemo(() => {
    if (!searchParams) return '';
    return searchParams.get('error_description');
  }, [searchParams]);

  const confirmationAndErrorStyles = useMemo(
    () =>
      clsx('bg-primary', {
        'bg-red-500/10': codeExchangeError,
        'border-red-500/50': codeExchangeError,
        'text-red-700': codeExchangeError,
      }),
    [codeExchangeError]
  );

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async ({ email, password }: z.infer<typeof FormSchema>) => {
    const { error } = await actionSignUpUser({ email, password });
    if (error) {
      setSubmitError(error.message);
      form.reset();
      return;
    }
    setConfirmation(true);
  };

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError('');
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full sm:justify-center sm:w-[400px]
        space-y-6 flex
        flex-col
        '
      >
        <Link
          href='/'
          className='
          w-full
          flex
          justify-left
          items-center'
        >
          {/* <Image src={Logo} alt='cypress Logo' width={50} height={50} /> */}
          <span
            className='font-semibold
          dark:text-white text-4xl first-letter:ml-2'
          >
            AI-ENGLISH-CHAT
          </span>
        </Link>
        <FormDescription
          className='
        text-foreground/60'
        >
          최고의 AI 영어 채팅 프로그램
        </FormDescription>
        {!confirmation && !codeExchangeError && (
          <>
            <FormField
              disabled={isLoading}
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='이메일' placeholder='Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='password' placeholder='비밀번호' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='비밀번호 확인'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full p-6' disabled={isLoading}>
              {!isLoading ? '회원가입' : <Loader />}
            </Button>
          </>
        )}

        {submitError && <FormMessage>{submitError}</FormMessage>}
        <span className='self-container'>
          이미 가입하셨나요 ?{' '}
          <Link href='/login' className='text-primary'>
            로그인 하러가기
          </Link>
        </span>
        {(confirmation || codeExchangeError) && (
          <>
            <Alert className={confirmationAndErrorStyles}>
              {!codeExchangeError && <MailCheck className='h-4 w-4' />}
              <AlertTitle>
                {codeExchangeError
                  ? '유효하지 않은 링크'
                  : '당신의 이메일을 확인 해 주세요.'}
              </AlertTitle>
              <AlertDescription>
                {codeExchangeError || '확인 메일을 보냈습니다.'}
              </AlertDescription>
            </Alert>
          </>
        )}
      </form>
    </Form>
  );
};

export default Signup;
