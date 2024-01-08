'use client';

import MyAvatar from '@/components/global/MyAvatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { useScrollIntoView } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiOrigin } from '@/configs/urls';
import ChatDialog from '@/components/chat-dialog';

const chatList = [
  { email: 'aaaapple123@naver.com', message: '안녕' },
  { email: 'aaaappleaver.com', message: '안녕2' },
  { email: 'aaaapple123', message: '안녕3' },
];

const Page = () => {
  const [session, setSession] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);

  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >({ duration: 0 });

  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setSession(session);
    // console.log(session);

    return session;
  };

  const getMessages = async () => {
    const { data, error } = await supabase
      .from('chat')
      .select('*')
      .order('id', { ascending: true });

    console.log(data);
    setMessages(data);
    return data;
  };

  useEffect(() => {
    getSession();
    getMessages();
  }, []);

  useEffect(() => {
    scrollIntoView();
  }, [messages]);

  useEffect(() => {
    const subscribedChannel = supabase
      .channel('chat-follow-up')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat',
        },
        (payload: any) => {
          if (payload.eventType === 'INSERT') {
            axios.post('/api/chat/main?id=' + payload.new.id);
          }

          getMessages();
        }
      )
      .subscribe();

    return () => {
      // 항상 구독을 하면 소켓을 해제해줘야한다.
      supabase.removeChannel(subscribedChannel);
    };
  }, []);

  if (session === null) {
    return (
      <div>
        <div className='w-full p-4'>
          <Card className='max-w-[400px] m-auto'>
            <CardHeader>
              <CardTitle>Chat</CardTitle>
              <CardDescription>
                영어 AI 봇이 영어공부를 도와줍니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <section className='flex flex-col w-full'>
                <header className='border-b dark:border-zinc-700 p-4'>
                  <h2 className='text-xl font-bold flex items-center gap-2'>
                    <div className='flex gap-4 items-center'>
                      <MyAvatar />
                      <span className='text-xs text-red-600 block'>
                        로그인이 필요합니다 ....
                      </span>
                    </div>
                  </h2>
                </header>
                <main className='flex-1 overflow-auto p-4 min-h-[400px] max-h-[400px] scrollbar'></main>
                <footer className='border-t dark:border-zinc-700 p-4'>
                  <form className='flex items-center gap-2'>
                    <Textarea
                      className='flex-1'
                      name='message'
                      placeholder='메시지를 입력하세요...'
                      // value={value}
                      // onChange={onChange}
                      // disabled={loadding}
                    />
                    <Button type='submit'>보내기</Button>
                  </form>
                </footer>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full p-4'>
      <Card className='max-w-[400px] m-auto'>
        <CardHeader>
          <CardTitle>Chat</CardTitle>
          <CardDescription>영어 AI 봇이 영어공부를 도와줍니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <section className='flex flex-col w-full'>
            <header className='border-b dark:border-zinc-700 p-4'>
              <h2 className='text-xl font-bold flex items-center gap-2'>
                <div className='flex gap-4 items-center'>
                  <MyAvatar />
                  <span className='text-xs text-green-600 block'>Online</span>
                </div>
              </h2>
            </header>
            <main
              className='flex-1 overflow-auto p-4 min-h-[400px] max-h-[400px] scrollbar'
              ref={scrollableRef}
            >
              {messages.map((chat: any) => {
                return (
                  <>
                    {chat.email === session.user.email ? (
                      chat.ai ? (
                        <div className='mt-4 mb-4'>
                          <div className='text-end text-xs opacity-60 mb-1'>
                            {chat.email}
                          </div>
                          <ChatDialog chat={chat}>
                            <div
                              key={chat.id}
                              className='flex items-end justify-end relative'
                            >
                              <div className='rounded-lg bg-primary p-2'>
                                <p className='text-sm'>{chat.message}</p>
                              </div>

                              <div className='absolute w-2 h-2 bg-green-600 rounded-full top-0' />
                            </div>
                          </ChatDialog>
                        </div>
                      ) : (
                        <div className='mt-4 mb-4'>
                          <div className='text-end text-xs opacity-60 mb-1'>
                            {chat.email}
                          </div>
                          <ChatDialog chat={chat}>
                            <div
                              key={chat.id}
                              className='flex items-end justify-end relative'
                            >
                              <div className='rounded-lg bg-primary p-2'>
                                <p className='text-sm'>{chat.message}</p>
                              </div>

                              <div className='absolute w-2 h-2 bg-orange-500 rounded-full top-0' />
                            </div>
                          </ChatDialog>
                        </div>
                      )
                    ) : chat.ai ? (
                      <div className='mt-4 mb-4'>
                        <div className='text-start text-xs opacity-60 mb-1'>
                          {chat.email}
                        </div>
                        <ChatDialog chat={chat}>
                          <div
                            key={chat.id}
                            className='flex items-end gap-2 relative'
                          >
                            <div className='rounded-lg bg-zinc-700 p-2'>
                              <p className='text-sm'>{chat.message}</p>
                            </div>

                            <div className='absolute w-2 h-2 bg-green-600 rounded-full top-0' />
                          </div>
                        </ChatDialog>
                      </div>
                    ) : (
                      <div className='mt-4 mb-4'>
                        <div className='text-start text-xs opacity-60 mb-1'>
                          {chat.email}
                        </div>
                        <ChatDialog chat={chat}>
                          <div
                            key={chat.id}
                            className='flex items-end gap-2 relative'
                          >
                            <div className='rounded-lg bg-zinc-700 p-2'>
                              <p className='text-sm'>{chat.message}</p>
                            </div>

                            <div className='absolute w-2 h-2 bg-orange-500 rounded-full top-0' />
                          </div>
                        </ChatDialog>
                      </div>
                    )}
                  </>
                );
              })}
              <div ref={targetRef} />
            </main>
            <footer className='border-t dark:border-zinc-700 p-4'>
              <form
                className='flex items-center gap-2'
                onSubmit={async (e: any) => {
                  e.preventDefault();
                  const message = e.target.message.value;
                  //   console.log(message);

                  const data = await supabase.from('chat').insert({
                    email: session.user.email,
                    message: message,
                  });

                  e.target.reset();
                }}
              >
                <Textarea
                  className='flex-1'
                  name='message'
                  placeholder='메시지를 입력하세요...'
                />
                <Button type='submit'>보내기</Button>
              </form>
            </footer>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
