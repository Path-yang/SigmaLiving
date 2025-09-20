"use client";

import InteractiveAvatar from "@/components/InteractiveAvatar";

export default function AssistantPage() {
  return (
    <div className="w-screen h-screen flex flex-col bg-black">
      {/* Demo UI Layout - EXACT COPY */}
      <div className="w-[900px] flex flex-col items-start justify-start gap-5 mx-auto pt-4 pb-20">
        <div className="w-full">
          <InteractiveAvatar />
        </div>
      </div>
    </div>
  );
}
