"use client";

import { useEffect } from 'react';
import { useFontSize } from '@/lib/font-size/context';

export function FontSizeBody({ children }: { children: React.ReactNode }) {
  const { fontSize } = useFontSize();

  useEffect(() => {
    // Remove existing font size classes
    document.body.classList.remove('font-size-small', 'font-size-medium', 'font-size-large', 'font-size-extra-large');
    
    // Add the current font size class
    document.body.classList.add(`font-size-${fontSize}`);
  }, [fontSize]);

  return <>{children}</>;
}
