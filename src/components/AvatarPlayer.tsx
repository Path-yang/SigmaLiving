'use client';

import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import StreamingAvatar, { AvatarQuality, StreamingEvents, TaskType, TaskMode } from '@heygen/streaming-avatar';
import { Card, CardContent } from '@/components/ui/card';
import { User, Loader2, VideoOff, Volume2, VolumeX, AlertCircle } from 'lucide-react';

interface AvatarPlayerProps {
  avatarId: string;
  quality: 'high' | 'medium' | 'low';
  isMuted: boolean;
  onMuteToggle: () => void;
  onStopSession: () => void;
  onStatusChange: (status: string) => void;
}

export interface AvatarPlayerRef {
  startAvatar: (avatarId: string, quality: 'high' | 'medium' | 'low') => Promise<void>;
  speak: (text: string) => void;
  stopAvatar: () => void;
  toggleMute: () => void;
}

const AvatarPlayer = forwardRef<AvatarPlayerRef, AvatarPlayerProps>(
  ({ avatarId, quality, isMuted, onMuteToggle, onStopSession, onStatusChange }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const avatarRef = useRef<StreamingAvatar | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [internalStatus, setInternalStatus] = useState<string>('idle');

    const startAvatar = useCallback(async (id: string, q: 'high' | 'medium' | 'low') => {
      console.log('AvatarPlayer.startAvatar called with:', { avatarId: id, quality: q });
      setInternalStatus('connecting');
      onStatusChange('connecting');
      setError(null);

      try {
        // 1. Get session and token from our API
        console.log('Fetching HeyGen session and token...');
        const response = await fetch('/api/heygen/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ avatarId: id, quality: q }),
        });

        const rawResponse = await response.text();
        console.log('Raw response from /api/heygen/session:', rawResponse);

        if (!response.ok) {
          const errorData = JSON.parse(rawResponse);
          throw new Error(`Failed to get HeyGen session: ${response.status} - ${errorData.error || 'Unknown error'}`);
        }

        const data = JSON.parse(rawResponse);
        const { token, session_id } = data;

        if (!token) {
          throw new Error('No token received from HeyGen session API.');
        }
        console.log('Received token and session_id. Initializing StreamingAvatar SDK...');
        console.log('Token:', token.substring(0, 12) + '...');
        console.log('Session ID:', session_id ? session_id.substring(0, 12) + '...' : 'N/A');

        // 2. Initialize StreamingAvatar SDK with the session token
        if (avatarRef.current) {
          await avatarRef.current.stopAvatar(); // Stop any existing avatar session
          avatarRef.current = null;
        }

        // Initialize with the session token
        avatarRef.current = new StreamingAvatar({
          token: token,
          videoElement: videoRef.current,
        });

        // Set up event listeners
        avatarRef.current.on(StreamingEvents.STREAM_READY, (e) => {
          console.log('HeyGen Avatar Stream Ready!', e.detail.stream);
          if (videoRef.current) {
            videoRef.current.srcObject = e.detail.stream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play().catch(e => console.error("Video autoplay failed:", e));
            };
          }
          setIsConnected(true);
          setInternalStatus('ready');
          onStatusChange('ready');
          console.log("Avatar stream started successfully");
        });

        avatarRef.current.on(StreamingEvents.AVATAR_START_TALKING, () => {
          console.log('HeyGen Avatar Start Talking!');
          setIsSpeaking(true);
        });

        avatarRef.current.on(StreamingEvents.AVATAR_STOP_TALKING, () => {
          console.log('HeyGen Avatar Stop Talking!');
          setIsSpeaking(false);
        });

        avatarRef.current.on(StreamingEvents.STREAM_DISCONNECTED, () => {
          console.log('HeyGen Avatar Disconnected!');
          setIsConnected(false);
          setIsSpeaking(false);
          setInternalStatus('idle');
          onStatusChange('idle');
          avatarRef.current = null;
        });

        avatarRef.current.on(StreamingEvents.ERROR, (err) => {
          console.error('HeyGen Avatar Error:', err);
          setError(err.message || 'An unknown error occurred with the avatar.');
          setIsConnected(false);
          setIsSpeaking(false);
          setInternalStatus('error');
          onStatusChange('error');
        });

        // 3. Start the avatar stream using createStartAvatar
        console.log('Calling avatar.createStartAvatar()...');
        const sessionData = await avatarRef.current.createStartAvatar({
          avatarName: id,
          quality: q === 'high' ? AvatarQuality.High : q === 'medium' ? AvatarQuality.Medium : AvatarQuality.Low,
          language: 'English',
        });

        console.log('Avatar session created:', sessionData);

        // Set initial mute state
        if (isMuted) {
          avatarRef.current.muteInputAudio();
        } else {
          avatarRef.current.unmuteInputAudio();
        }

      } catch (err) {
        console.error('Failed to start HeyGen Avatar:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize avatar');
        setInternalStatus('error');
        onStatusChange('error');
        setIsConnected(false);
        throw err; // Re-throw to be caught by parent component
      }
    }, [isMuted, onStatusChange]);

    const speak = useCallback((text: string) => {
      if (avatarRef.current && isConnected) {
        console.log('Avatar speaking:', text);
        avatarRef.current.speak({
          text: text,
          taskType: TaskType.REPEAT,
          taskMode: TaskMode.SYNC,
        });
      } else {
        console.warn('Avatar not ready to speak:', isConnected);
      }
    }, [isConnected]);

    const stopAvatar = useCallback(async () => {
      if (avatarRef.current) {
        try {
          await avatarRef.current.stopAvatar();
        } catch (err) {
          console.error('Error stopping avatar:', err);
        }
        avatarRef.current = null;
        setIsConnected(false);
        setIsSpeaking(false);
        setInternalStatus('idle');
        onStatusChange('idle');
      }
    }, [onStatusChange]);

    const toggleMute = useCallback(() => {
      if (avatarRef.current) {
        if (isMuted) {
          avatarRef.current.unmuteInputAudio();
        } else {
          avatarRef.current.muteInputAudio();
        }
      }
    }, [isMuted]);

    useEffect(() => {
      // Cleanup on unmount
      return () => {
        if (avatarRef.current) {
          avatarRef.current.stopAvatar().catch(err => console.error('Error stopping avatar on unmount:', err));
          avatarRef.current = null;
        }
      };
    }, []);

    useImperativeHandle(ref, () => ({
      startAvatar: startAvatar,
      speak: speak,
      stopAvatar: stopAvatar,
      toggleMute: toggleMute,
    }));

    return (
      <Card className="w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-lg border">
        <CardContent className="p-0 relative">
          {isConnected ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted={isMuted}
              className="w-full h-auto rounded-xl"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
              {error ? (
                <div className="flex flex-col items-center text-red-600">
                  <AlertCircle className="w-12 h-12 mb-4" />
                  <p>Avatar Error</p>
                  <p className="text-sm text-gray-600">{error}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
                  <p>Initializing Avatar...</p>
                </div>
              )}
            </div>
          )}
          {isConnected && (
            <div className="absolute top-4 right-4">
              <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                {isSpeaking ? 'Speaking...' : 'Ready'}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);

AvatarPlayer.displayName = 'AvatarPlayer';

export default AvatarPlayer;
