'use client';

import React, { useState } from 'react';

const SimpleTest: React.FC = () => {
  const [message, setMessage] = useState("Ready to test");

  const handleVoiceClick = () => {
    console.log("Voice button clicked!");
    setMessage("Voice button clicked!");
  };

  const handleTextClick = () => {
    console.log("Text button clicked!");
    setMessage("Text button clicked!");
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col rounded-xl bg-zinc-900 overflow-hidden">
        <div className="relative w-full aspect-video overflow-hidden flex flex-col items-center justify-center">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Simple Test</h3>
            <div className="text-white text-sm">{message}</div>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center justify-center p-4 border-t border-zinc-700 w-full">
          <div className="flex flex-row gap-4">
            <button 
              onClick={handleVoiceClick}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Test Voice Chat
            </button>
            <button 
              onClick={handleTextClick}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Test Text Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleTest;
