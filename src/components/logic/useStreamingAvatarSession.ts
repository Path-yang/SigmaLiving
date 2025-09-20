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

  const initAvatar = useCallback(
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

  const stopAvatar = useCallback(async () => {
    avatarRef.current?.off(StreamingEvents.STREAM_READY, handleStream);
    avatarRef.current?.off(StreamingEvents.STREAM_DISCONNECTED, stopAvatar);
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

  const startAvatar = useCallback(
    async (config: StartAvatarRequest) => {
      if (sessionState !== StreamingAvatarSessionState.INACTIVE) {
        throw new Error("There is already an active session");
      }

      try {
        setSessionState(StreamingAvatarSessionState.CONNECTING);
        
        if (!avatarRef.current) {
          throw new Error("Avatar is not initialized. Call initAvatar first.");
        }

        const avatar = avatarRef.current;
        avatar.on(StreamingEvents.STREAM_READY, handleStream);
        avatar.on(StreamingEvents.STREAM_DISCONNECTED, stopAvatar);
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
      } catch (error) {
        console.error("Error starting avatar:", error);
        setSessionState(StreamingAvatarSessionState.INACTIVE);
        throw error;
      }
    },
    [
      sessionState,
      setSessionState,
      avatarRef,
      handleStream,
      stopAvatar,
      setConnectionQuality,
      setIsUserTalking,
      setIsAvatarTalking,
      handleUserTalkingMessage,
      handleStreamingTalkingMessage,
      handleEndMessage,
    ],
  );

  return {
    initAvatar,
    startAvatar,
    stopAvatar,
    sessionState,
    stream,
  };
};
