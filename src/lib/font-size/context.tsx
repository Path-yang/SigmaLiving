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
        return 'text-sm';
      case 'medium':
        return 'text-base';
      case 'large':
        return 'text-lg';
      case 'extra-large':
        return 'text-xl';
      default:
        return 'text-base';
    }
  };

  const getFontSizeMultiplier = () => {
    switch (fontSize) {
      case 'small':
        return 0.875; // 14px
      case 'medium':
        return 1; // 16px
      case 'large':
        return 1.125; // 18px
      case 'extra-large':
        return 1.25; // 20px
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
