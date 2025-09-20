"use client";

import InteractiveAvatar from "@/components/InteractiveAvatar";

export default function AssistantPage() {
  return (
    <div className="w-screen h-screen flex flex-col bg-black">
      {/* Full-width layout with larger video area */}
      <div className="w-full h-full flex flex-col p-4">
        <div className="w-full h-full max-w-6xl mx-auto">
          <InteractiveAvatar />
        </div>
      </div>
    </div>
  );
}
