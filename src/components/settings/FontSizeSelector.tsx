"use client";

import React from 'react';
import { useFontSize } from '@/lib/font-size/context';
import { useI18n } from '@/lib/i18n/context';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export function FontSizeSelector() {
  const { fontSize, setFontSize } = useFontSize();
  const { t } = useI18n();

  const fontSizes = [
    { key: 'small', label: 'Small', description: '14px' },
    { key: 'medium', label: 'Medium', description: '16px' },
    { key: 'large', label: 'Large', description: '18px' },
    { key: 'extra-large', label: 'Extra Large', description: '20px' },
  ] as const;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Settings className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">{t.profile.settings.textSize}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {fontSizes.map((size) => (
          <Button
            key={size.key}
            variant={fontSize === size.key ? 'default' : 'outline'}
            onClick={() => setFontSize(size.key)}
            className={`h-auto p-4 flex flex-col items-center gap-2 ${
              fontSize === size.key
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className="font-medium">{size.label}</span>
            <span className="text-xs opacity-75">{size.description}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
