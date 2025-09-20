"use client";

import { useFontSize } from '@/lib/font-size/context';
import { Settings } from 'lucide-react';

export function FontSizeSelector() {
  const { fontSize, setFontSize } = useFontSize();

  const sizes = [
    { key: 'small', label: 'Small', value: '15.5px' },
    { key: 'medium', label: 'Medium', value: '16px' },
    { key: 'large', label: 'Large', value: '16.5px' },
    { key: 'extra-large', label: 'Extra Large', value: '17px' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Settings className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Text Size</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {sizes.map((size) => (
          <button
            key={size.key}
            onClick={() => setFontSize(size.key as 'small' | 'medium' | 'large' | 'extra-large')}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
              fontSize === size.key
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-medium">{size.label}</div>
            <div className="text-sm opacity-75">{size.value}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
