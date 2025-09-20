"use client";

import { useState } from "react";
import InteractiveAvatar from "@/components/InteractiveAvatar";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function AssistantPage() {
  const [showConfig, setShowConfig] = useState(false);
  console.log('AssistantPage showConfig:', showConfig);

  return (
    <div className="w-full h-screen flex flex-col bg-black relative">
      {/* Configuration Button - Top Right */}
      <div className="absolute top-4 right-4 z-50">
        <Button 
          onClick={() => {
            console.log('Button clicked, current showConfig:', showConfig);
            setShowConfig(!showConfig);
            console.log('Button clicked, new showConfig will be:', !showConfig);
          }}
          variant="outline"
          className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
        >
          <Settings className="w-4 h-4 mr-2" />
          Avatar Settings
        </Button>
      </div>

      {/* Demo UI Layout - Exact Copy */}
      <div className="w-screen h-screen flex flex-col">
        <div className="w-[900px] flex flex-col items-start justify-start gap-5 mx-auto pt-4 pb-20">
          <div className="w-full">
            <InteractiveAvatar key={showConfig ? "config-true" : "config-false"} showConfig={showConfig} onCloseConfig={() => setShowConfig(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}
