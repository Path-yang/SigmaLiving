"use client";

import { useI18n } from '@/lib/i18n/context';
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
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
              language === lang.code
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
// Force rebuild - Sun Sep 21 05:13:27 +08 2025
