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
import { useMemoizedFn, useUnmount } from "ahooks";

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
  
  const { initAvatar, startAvatar, stopAvatar, sessionState, stream } =
    useStreamingAvatarSession();
  const { startVoiceChat } = useVoiceChat();

  const [config, setConfig] = useState<StartAvatarRequest>(DEFAULT_CONFIG);
  const [isStarting, setIsStarting] = useState(false);

  const mediaStream = useRef<HTMLVideoElement>(null);

  async function fetchAccessToken() {
    try {
      const response = await fetch("/api/get-access-token", {
        method: "POST",
      });
      const token = await response.text();

      console.log("Access Token:", token); // Log the token to verify

      return token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw error;
    }
  }

  const startSessionV2 = useMemoizedFn(async (isVoiceChat: boolean) => {
    try {
      console.log("Starting avatar session...", { isVoiceChat, config });
      setIsStarting(true);
      
      const newToken = await fetchAccessToken();
      console.log("Token received, initializing avatar...");
      
      const avatar = initAvatar(newToken);

      avatar.on(StreamingEvents.AVATAR_START_TALKING, (e) => {
        console.log("Avatar started talking", e);
      });
      avatar.on(StreamingEvents.AVATAR_STOP_TALKING, (e) => {
        console.log("Avatar stopped talking", e);
      });
      avatar.on(StreamingEvents.STREAM_DISCONNECTED, () => {
        console.log("Stream disconnected");
      });
      avatar.on(StreamingEvents.STREAM_READY, (event) => {
        console.log(">>>>> Stream ready:", event.detail);
      });
      avatar.on(StreamingEvents.USER_START, (event) => {
        console.log(">>>>> User started talking:", event);
      });
      avatar.on(StreamingEvents.USER_STOP, (event) => {
        console.log(">>>>> User stopped talking:", event);
      });
      avatar.on(StreamingEvents.USER_END_MESSAGE, (event) => {
        console.log(">>>>> User end message:", event);
      });
      avatar.on(StreamingEvents.USER_TALKING_MESSAGE, (event) => {
        console.log(">>>>> User talking message:", event);
      });
      avatar.on(StreamingEvents.AVATAR_TALKING_MESSAGE, (event) => {
        console.log(">>>>> Avatar talking message:", event);
      });
      avatar.on(StreamingEvents.AVATAR_END_MESSAGE, (event) => {
        console.log(">>>>> Avatar end message:", event);
      });

      console.log("Starting avatar with config:", config);
      await startAvatar(config);

      if (isVoiceChat) {
        console.log("Starting voice chat...");
        await startVoiceChat();
      }
      
      console.log("Avatar session started successfully");
      setIsStarting(false);
    } catch (error) {
      console.error("Error starting avatar session:", error);
      setIsStarting(false);
      throw error; // Re-throw so button handlers can catch it
    }
  });

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
                  onCloseConfig();
                  console.log("Calling startSessionV2 with isVoiceChat=true");
                  await startSessionV2(true);
                  console.log("startSessionV2 completed successfully");
                } catch (error) {
                  console.error("Error in Start Voice Chat button:", error);
                  alert(`Error starting voice chat: ${error.message}`);
                }
              }} className="px-12 py-4 text-xl">
                Start Voice Chat
              </Button>
              <Button onClick={async () => {
                try {
                  console.log("Start Text Chat button clicked");
                  onCloseConfig();
                  console.log("Calling startSessionV2 with isVoiceChat=false");
                  await startSessionV2(false);
                  console.log("startSessionV2 completed successfully");
                } catch (error) {
                  console.error("Error in Start Text Chat button:", error);
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
