import StreamingAvatar, {
  ConnectionQuality,
  StartAvatarRequest,
  StreamingEvents,
} from "@heygen/streaming-avatar";
import { useCallback } from "react";

import {
  StreamingAvatarSessionState,
  useStreamingAvatarContext,
} from "./context";
import { useVoiceChat } from "./useVoiceChat";
import { useMessageHistory } from "./useMessageHistory";

export const useStreamingAvatarSession = () => {
  const {
    avatarRef,
    basePath,
    sessionState,
    setSessionState,
    stream,
    setStream,
    setIsListening,
    setIsUserTalking,
    setIsAvatarTalking,
    setConnectionQuality,
    handleUserTalkingMessage,
    handleStreamingTalkingMessage,
    handleEndMessage,
    clearMessages,
  } = useStreamingAvatarContext();
  const { stopVoiceChat } = useVoiceChat();

  useMessageHistory();

  const init = useCallback(
    (token: string) => {
      avatarRef.current = new StreamingAvatar({
        token,
        basePath: basePath,
      });

      return avatarRef.current;
    },
    [basePath, avatarRef],
  );

  const handleStream = useCallback(
    ({ detail }: { detail: MediaStream }) => {
      setStream(detail);
      setSessionState(StreamingAvatarSessionState.CONNECTED);
    },
    [setSessionState, setStream],
  );

  const stop = useCallback(async () => {
    avatarRef.current?.off(StreamingEvents.STREAM_READY, handleStream);
    avatarRef.current?.off(StreamingEvents.STREAM_DISCONNECTED, stop);
    clearMessages();
    stopVoiceChat();
    setIsListening(false);
    setIsUserTalking(false);
    setIsAvatarTalking(false);
    setStream(null);
    await avatarRef.current?.stopAvatar();
    setSessionState(StreamingAvatarSessionState.INACTIVE);
  }, [
    handleStream,
    setSessionState,
    setStream,
    avatarRef,
    setIsListening,
    stopVoiceChat,
    clearMessages,
    setIsUserTalking,
    setIsAvatarTalking,
  ]);

  const start = useCallback(
    async (config: StartAvatarRequest) => {
      if (sessionState !== StreamingAvatarSessionState.INACTIVE) {
        throw new Error("There is already an active session");
      }

      try {
        console.log("Creating HeyGen session with config:", config);
        
        const response = await fetch("/api/heygen/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(config),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Session creation failed:", errorData);
          throw new Error(`Session creation failed: ${errorData.error || response.statusText}`);
        }
  
        const sessionData = await response.json();
        console.log("Session created successfully:", sessionData);
        
        if (!sessionData.token) {
          throw new Error("No token received from session API");
        }
        
        console.log("Initializing avatar with token:", sessionData.token);
        const avatar = init(sessionData.token);
  
        if (!avatar) {
          throw new Error("Avatar is not initialized");
        }
  
        setSessionState(StreamingAvatarSessionState.CONNECTING);
        avatar.on(StreamingEvents.STREAM_READY, handleStream);
        avatar.on(StreamingEvents.STREAM_DISCONNECTED, stop);
        avatar.on(
          StreamingEvents.CONNECTION_QUALITY_CHANGED,
          ({ detail }: { detail: ConnectionQuality }) =>
            setConnectionQuality(detail),
        );
        avatar.on(StreamingEvents.USER_START, () => {
          setIsUserTalking(true);
        });
        avatar.on(StreamingEvents.USER_STOP, () => {
          setIsUserTalking(false);
        });
        avatar.on(StreamingEvents.AVATAR_START_TALKING, () => {
          setIsAvatarTalking(true);
        });
        avatar.on(StreamingEvents.AVATAR_STOP_TALKING, () => {
          setIsAvatarTalking(false);
        });
        avatar.on(
          StreamingEvents.USER_TALKING_MESSAGE,
          handleUserTalkingMessage,
        );
        avatar.on(
          StreamingEvents.AVATAR_TALKING_MESSAGE,
          handleStreamingTalkingMessage,
        );
        avatar.on(StreamingEvents.USER_END_MESSAGE, handleEndMessage);
        avatar.on(
          StreamingEvents.AVATAR_END_MESSAGE,
          handleEndMessage,
        );
  
        await avatar.createStartAvatar(config);
  
        return avatar;
      } catch (error) {
        console.error("Error starting avatar session:", error);
        setSessionState(StreamingAvatarSessionState.INACTIVE);
        throw error;
      }
    },
    [
      init,
      handleStream,
      stop,
      setSessionState,
      avatarRef,
      sessionState,
      setConnectionQuality,
      setIsUserTalking,
      handleUserTalkingMessage,
      handleStreamingTalkingMessage,
      handleEndMessage,
      setIsAvatarTalking,
    ],
  );

  return {
    avatarRef,
    sessionState,
    stream,
    initAvatar: init,
    startAvatar: start,
    stopAvatar: stop,
  };
};