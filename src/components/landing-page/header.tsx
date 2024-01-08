'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import ThemeMenuButton from '../global/theme-menu-button';
import { supabase } from '@/lib/supabase';
import MyAvatar from '../global/MyAvatar';
// import Logo from '../../../public/cypresslogo.svg';

const Header = () => {
  const [path, setPath] = useState('#products');
  const [session, setSession] = useState<any>(null);

  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setSession(session);

    return session;
  };

  useEffect(() => {
    getSession();
  }, []);
  
  return (
    <header
      className='p-4
  flex
  justify-center
  items-center
'
    >
      <Link
        href={'/'}
        className='w-full flex gap-2
    justify-left items-center'
      >
        {/* <Image
          src={Logo}
          alt="Cypress Logo"
          width={25}
          height={25}
        /> */}
        <span
          className='font-semibold
      dark:text-white
    '
        >
          Ai-English-Chat
        </span>
      </Link>

      <aside
        className='flex
    w-full
    gap-2
    justify-end
  '
      >
        <ThemeMenuButton />
        <div>
          {session ? (
            <MyAvatar />
          ) : (
            <Link href={'/login'}>
              <Button className='sm:block'>로그인</Button>
            </Link>
          )}
        </div>
      </aside>
    </header>
  );
};

export default Header;

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'group block select-none space-y-1 font-medium leading-none'
          )}
          {...props}
        >
          <div className='text-white text-sm font-medium leading-none'>
            {title}
          </div>
          <p
            className='group-hover:text-white/70
            line-clamp-2
            text-sm
            leading-snug
            text-white/40
          '
          >
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = 'ListItem';
