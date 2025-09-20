import {
  AvatarQuality,
  StreamingEvents,
  VoiceChatTransport,
  VoiceEmotion,
  StartAvatarRequest,
  STTProvider,
  ElevenLabsModel,
} from "@heygen/streaming-avatar";
import { useEffect, useRef, useState } from "react";
import { useUnmount } from "ahooks";

import { Button } from "@/components/ui/button";
import { AvatarConfig } from "./AvatarConfig";
import { AvatarVideo } from "./AvatarSession/AvatarVideo";
import { useStreamingAvatarSession } from "./logic/useStreamingAvatarSession";
import { AvatarControls } from "./AvatarSession/AvatarControls";
import { useVoiceChat } from "./logic/useVoiceChat";
import { StreamingAvatarProvider, StreamingAvatarSessionState } from "./logic";
import { LoadingIcon } from "./Icons";
import { MessageHistory } from "./AvatarSession/MessageHistory";

import { AVATARS } from "@/app/lib/constants";

const DEFAULT_CONFIG: StartAvatarRequest = {
  quality: AvatarQuality.Low,
  avatarName: AVATARS[0].avatar_id,
  knowledgeId: undefined,
  voice: {
    rate: 1.5,
    emotion: VoiceEmotion.EXCITED,
    model: ElevenLabsModel.eleven_flash_v2_5,
  },
  language: "en",
  voiceChatTransport: VoiceChatTransport.WEBSOCKET,
  sttSettings: {
    provider: STTProvider.DEEPGRAM,
  },
};

interface InteractiveAvatarProps {
  showConfig?: boolean;
  onCloseConfig?: () => void;
}

function InteractiveAvatar({ showConfig = false, onCloseConfig }: InteractiveAvatarProps) {
  console.log('InteractiveAvatar showConfig:', showConfig);
  
  // Force re-render when showConfig changes
  useEffect(() => {
    console.log('InteractiveAvatar useEffect - showConfig changed to:', showConfig);
  }, [showConfig]);
  const { startAvatar, stopAvatar, sessionState, stream } =
    useStreamingAvatarSession();
  const { startVoiceChat } = useVoiceChat();

  const [config, setConfig] = useState<StartAvatarRequest>(DEFAULT_CONFIG);
  const [isStarting, setIsStarting] = useState(false);

  const mediaStream = useRef<HTMLVideoElement>(null);

  const startSession = async (isVoiceChat: boolean) => {
    try {
      console.log("Starting avatar session...", { isVoiceChat, config });
      const avatar = await startAvatar(config);
      console.log("Avatar start command sent, waiting for stream...");

      if (isVoiceChat) {
        await startVoiceChat();
      }
    } catch (error) {
      console.error("Error starting avatar session:", error);
      setIsStarting(false);
      throw error; // Re-throw so button handlers can catch it
    }
  };

  useUnmount(() => {
    stopAvatar();
  });

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
      };
    }
  }, [mediaStream, stream]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col w-full h-full overflow-hidden">
        {console.log('Rendering showConfig:', showConfig), showConfig ? (
            <div className="flex items-center justify-center w-full h-full">
              <div className="relative">
                <AvatarConfig config={config} onConfigChange={setConfig} onClose={onCloseConfig} />
              </div>
            </div>
          ) : sessionState === StreamingAvatarSessionState.CONNECTED ? (
            <AvatarVideo ref={mediaStream} />
          ) : sessionState === StreamingAvatarSessionState.CONNECTING || isStarting ? (
            <div className="flex items-center justify-center h-64 text-white text-lg">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                <div>Connecting to avatar...</div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-3 items-center justify-center p-4 border-t border-zinc-700 w-full">
          {sessionState === StreamingAvatarSessionState.CONNECTED ? (
            <AvatarControls />
          ) : sessionState === StreamingAvatarSessionState.CONNECTING ? (
            <LoadingIcon />
          ) : sessionState === StreamingAvatarSessionState.INACTIVE && !isStarting ? (
            <div className="flex flex-row gap-8">
              <Button onClick={async () => {
                try {
                  console.log("Start Voice Chat button clicked");
                  setIsStarting(true);
                  onCloseConfig();
                  console.log("Calling startSession with isVoiceChat=true");
                  await startSession(true);
                  console.log("startSession completed successfully");
                } catch (error) {
                  console.error("Error in Start Voice Chat button:", error);
                  setIsStarting(false);
                  alert(`Error starting voice chat: ${error.message}`);
                }
              }} className="px-12 py-4 text-xl">
                Start Voice Chat
              </Button>
              <Button onClick={async () => {
                try {
                  console.log("Start Text Chat button clicked");
                  setIsStarting(true);
                  onCloseConfig();
                  console.log("Calling startSession with isVoiceChat=false");
                  await startSession(false);
                  console.log("startSession completed successfully");
                } catch (error) {
                  console.error("Error in Start Text Chat button:", error);
                  setIsStarting(false);
                  alert(`Error starting text chat: ${error.message}`);
                }
              }} className="px-12 py-4 text-xl">
                Start Text Chat
              </Button>
            </div>
          ) : (
            <LoadingIcon />
          )}
        </div>
      </div>
  );
}

export default function InteractiveAvatarWrapper({ showConfig, onCloseConfig }) {
  return (
    <StreamingAvatarProvider>
      <InteractiveAvatar showConfig={showConfig} onCloseConfig={onCloseConfig} />
    </StreamingAvatarProvider>
  );
}