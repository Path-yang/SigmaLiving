"use client";

import { useEffect } from 'react';
import { useFontSize } from '@/lib/font-size/context';

export function FontSizeBody({ children }: { children: React.ReactNode }) {
  const { getFontSizeClass } = useFontSize();

  useEffect(() => {
    // Remove existing font size classes
    document.body.className = document.body.className
      .split(' ')
      .filter(c => !c.startsWith('text-size-'))
      .join(' ');
    
    // Add the current font size class
    document.body.classList.add(getFontSizeClass());
  }, [getFontSizeClass]);

  return <>{children}</>;
}
