"use client";

import { useFontSize } from '@/lib/font-size/context';
import { useI18n } from '@/lib/i18n/context';
import { Settings } from 'lucide-react';

export function FontSizeSelector() {
  const { fontSize, setFontSize, getFontSizeMultiplier } = useFontSize();
  const { t } = useI18n();

  const fontSizes = [
    { key: 'small' as const, label: 'Small', size: '12px' },
    { key: 'medium' as const, label: 'Medium', size: '14px' },
    { key: 'large' as const, label: 'Large', size: '16px' },
    { key: 'extra-large' as const, label: 'Extra Large', size: '18px' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Settings className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">{t.profile.settings.textSize}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {fontSizes.map((size) => (
          <button
            key={size.key}
            onClick={() => setFontSize(size.key)}
            className={`p-3 rounded-lg border-2 transition-all duration-200 ${
              fontSize === size.key
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-center">
              <div className="font-medium">{size.label}</div>
              <div className="text-sm opacity-75">{size.size}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
