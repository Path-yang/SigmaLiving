"use client";

import InteractiveAvatar from "@/components/InteractiveAvatar";

export default function AssistantPage() {
  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Assistant
        </h1>
        <p className="text-lg text-gray-600">
          Chat with your AI companion using voice or text
        </p>
      </div>
      <InteractiveAvatar />
    </div>
  );
}
