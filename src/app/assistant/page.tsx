"use client";

import InteractiveAvatar from "@/components/InteractiveAvatar";
import { useI18n } from '@/lib/i18n/context';

export default function AssistantPage() {
  const { t } = useI18n();

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t.assistant.title}
        </h1>
        <p className="text-lg text-gray-600">
          Chat with your AI companion using voice or text
        </p>
      </div>
      <InteractiveAvatar />
    </div>
  );
}
