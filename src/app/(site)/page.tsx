import TitleSection from '@/components/landing-page/title-section';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { randomUUID } from 'crypto';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section>
        <div className='overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center'>
          <TitleSection
            pill='✨ 당신의 영어 공부 선생님'
            title='AI + ENGLISH + CHAT'
          />
          <div
            className='bg-white
          p-[2px]
          mt-6
          rounded-xl
          bg-gradient-to-r
          from-primary
          to-foreground
          sm:w-[300px]
        '
          >
            <Link href='/dashboard'>
              <Button
                className=' w-full
            rounded-[10px]
            p-6
            text-2xl
            text-foreground
            bg-background
          '
              >
                시작하기
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
