'use client';

import { useLocalStorage } from '@mantine/hooks';
import React, { useEffect } from 'react';
import { cn } from '../utils';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage({
    key: 'color-theme',
    defaultValue: 'blue',
  });

  useEffect(() => {
    // html 요소에 접근합니다.
    const htmlElement = document.documentElement;

    // 기존의 모든 클래스를 제거합니다.
    htmlElement.className = '';

    // 새로운 클래스를 추가합니다.
    if (theme) {
      htmlElement.classList.add(theme);
    }
  }, [theme]);

  return <>{children}</>;
}
