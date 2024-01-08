'use client';

import * as React from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { IonColorPaletteSharp } from '@/icons/icons';

interface ThemeMenuButtonProps {}

const ThemeMenuButton: React.FC<ThemeMenuButtonProps> = () => {
  const [value, setValue] = useLocalStorage({
    key: 'color-theme',
    defaultValue: 'blue',
  });

  const themes = [
    'rose',
    'blue',
    'orange',
    'green',
    'purple-light',
    'purple-dark',
    'pink',
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <IonColorPaletteSharp
            color={'hsl(var(--primary))'}
            width={16}
            height={16}
          />
          <span className="sr-only">theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => {
          return (
            <DropdownMenuItem
              key={theme}
              className="flex justify-center"
              onClick={() => setValue(theme)}
            >
              <div className={cn('', theme)}>
                <div className={cn('w-5 h-5 rounded-full', 'bg-primary')} />
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeMenuButton;
