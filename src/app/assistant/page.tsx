"use client";

import InteractiveAvatar from "@/components/InteractiveAvatar";
import { useI18n } from '@/lib/i18n/context';
import { ResponsiveText } from '@/components/responsive/ResponsiveText';

export default function AssistantPage() {
  const { t } = useI18n();

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <ResponsiveText as="h1" size="3xl" weight="bold" className="text-gray-900 mb-2">
          {t.assistant.title}
        </ResponsiveText>
        <ResponsiveText as="p" size="lg" className="text-gray-600">
          Chat with your AI companion using voice or text
        </ResponsiveText>
      </div>
      <InteractiveAvatar />
    </div>
  );
}
