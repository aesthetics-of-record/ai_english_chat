import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/lib/providers/theme-provider';
import { cn } from '@/lib/utils';
import Header from '@/components/landing-page/header';

const font = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ai-Teacher',
  description: 'ai 영어 채팅 프로그램',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko' className='rose'>
      <body className={cn(font.className, 'bg-background')}>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
