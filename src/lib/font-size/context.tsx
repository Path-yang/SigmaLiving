"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface FontSizeContextType {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  setFontSize: (size: 'small' | 'medium' | 'large' | 'extra-large') => void;
  getFontSizeClass: () => string;
  getFontSizeMultiplier: () => number;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSizeState] = useState<'small' | 'medium' | 'large' | 'extra-large'>('medium');

  useEffect(() => {
    // Load font size from localStorage on mount
    const savedFontSize = localStorage.getItem('silversigma-font-size');
    if (savedFontSize && ['small', 'medium', 'large', 'extra-large'].includes(savedFontSize)) {
      setFontSizeState(savedFontSize as 'small' | 'medium' | 'large' | 'extra-large');
    }
  }, []);

  const setFontSize = (size: 'small' | 'medium' | 'large' | 'extra-large') => {
    setFontSizeState(size);
    localStorage.setItem('silversigma-font-size', size);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small':
        return 'text-size-small'; // 15.5px
      case 'medium':
        return 'text-size-medium'; // 16px
      case 'large':
        return 'text-size-large'; // 16.5px
      case 'extra-large':
        return 'text-size-extra-large'; // 17px
      default:
        return 'text-size-medium';
    }
  };

  const getFontSizeMultiplier = () => {
    switch (fontSize) {
      case 'small':
        return 0.96875; // 15.5px (15.5/16)
      case 'medium':
        return 1; // 16px (16/16)
      case 'large':
        return 1.03125; // 16.5px (16.5/16)
      case 'extra-large':
        return 1.0625; // 17px (17/16)
      default:
        return 1;
    }
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize, getFontSizeClass, getFontSizeMultiplier }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
}
