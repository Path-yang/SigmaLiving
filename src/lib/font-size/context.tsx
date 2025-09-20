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
        return 'text-xs'; // 12px
      case 'medium':
        return 'text-sm'; // 14px
      case 'large':
        return 'text-base'; // 16px
      case 'extra-large':
        return 'text-lg'; // 18px
      default:
        return 'text-sm';
    }
  };

  const getFontSizeMultiplier = () => {
    switch (fontSize) {
      case 'small':
        return 0.75; // 12px
      case 'medium':
        return 0.875; // 14px
      case 'large':
        return 1; // 16px
      case 'extra-large':
        return 1.125; // 18px
      default:
        return 0.875;
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
