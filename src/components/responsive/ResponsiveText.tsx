"use client";

import React from 'react';
import { useFontSize } from '@/lib/font-size/context';

interface ResponsiveTextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: string;
}

export function ResponsiveText({
  children,
  className = '',
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  color = 'text-gray-900',
}: ResponsiveTextProps) {
  const { getFontSizeMultiplier } = useFontSize();
  const multiplier = getFontSizeMultiplier();

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };

  const responsiveSize = sizeClasses[size];
  const responsiveWeight = weightClasses[weight];

  return (
    <Component
      className={`${responsiveSize} ${responsiveWeight} ${color} ${className}`}
      style={{
        fontSize: `calc(${responsiveSize.replace('text-', '')} * ${multiplier})`,
      }}
    >
      {children}
    </Component>
  );
}
