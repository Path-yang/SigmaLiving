"use client";

import React from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageSelector() {
  const { language, setLanguage, availableLanguages } = useI18n();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Globe className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Language</h3>
      </div>
      
      <div className="space-y-2">
        {availableLanguages.map((lang) => (
          <Button
            key={lang.code}
            variant={language === lang.code ? 'default' : 'outline'}
            onClick={() => setLanguage(lang.code)}
            className={`w-full justify-start h-auto p-4 ${
              language === lang.code
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className="text-xl mr-3">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
