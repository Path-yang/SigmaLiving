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

  const mediaStream = useRef<HTMLVideoElement>(null);

  async function createSession() {
    try {
      console.log("Creating HeyGen session with config:", config);
      
      const response = await fetch("/api/heygen/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatarId: config.avatarName,
          quality: config.quality,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Session creation failed:", errorData);
        throw new Error(`Session creation failed: ${errorData.error || response.statusText}`);
      }

      const sessionData = await response.json();
      console.log("Session created successfully:", sessionData);
      
      return sessionData;
    } catch (error) {
      console.error("Error creating session:", error);
      throw error;
    }
  }

  const startSessionV2 = useMemoizedFn(async (isVoiceChat: boolean) => {
    try {
      console.log("Starting avatar session...");
      const sessionData = await createSession();
      
      if (!sessionData.token) {
        throw new Error("No token received from session API");
      }
      
      console.log("Initializing avatar with token:", sessionData.token);
      const avatar = initAvatar(sessionData.token);

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
        console.log(">>>>> Avatar session connected successfully!");
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
        console.log(">>>>> Avatar talking message:", event);      });
      avatar.on(StreamingEvents.AVATAR_END_MESSAGE, (event) => {
        console.log(">>>>> Avatar end message:", event);
      });

      console.log("Starting avatar with config:", config);
      await startAvatar(config);
      console.log("Avatar start command sent, waiting for stream...");

      if (isVoiceChat) {
        await startVoiceChat();
      }
    } catch (error) {
      console.error("Error starting avatar session:", error);
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
          ) : sessionState === StreamingAvatarSessionState.CONNECTING ? (
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
          ) : sessionState === StreamingAvatarSessionState.INACTIVE ? (
            <div className="flex flex-row gap-8">
              <Button onClick={async () => {
                onCloseConfig();
                await startSessionV2(true);
              }} className="px-12 py-4 text-xl">
                Start Voice Chat
              </Button>
              <Button onClick={async () => {
                onCloseConfig();
                await startSessionV2(false);
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
