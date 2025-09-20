'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AvatarPanel } from './AvatarPanel'
import { Mic, MicOff, Volume2, VolumeX, RotateCcw, Minus } from 'lucide-react'
import { speakText } from '@/lib/accessibility'

interface VoiceAgentProps {
  className?: string
}

export function VoiceAgent({ className = '' }: VoiceAgentProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState('')
  const [useRealtime, setUseRealtime] = useState(true)
  
  const audioRef = useRef<HTMLAudioElement>(null)

  const connect = async () => {
    try {
      setError('')
      
      // For now, we'll use Web Speech API as the primary method
      // In production, you would try Realtime API first
      if ('speechSynthesis' in window && 'webkitSpeechRecognition' in window) {
        setIsConnected(true)
      } else {
        throw new Error('Speech recognition not supported in this browser')
      }
      
    } catch (err) {
      console.error('Connection failed:', err)
      setError(err instanceof Error ? err.message : 'Connection failed')
    }
  }

  const disconnect = () => {
    setIsConnected(false)
    setIsListening(false)
    setIsSpeaking(false)
    setTranscript('')
  }

  const startListening = () => {
    if (!isConnected) return

    // Use Web Speech API
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-SG'

      recognition.onstart = () => {
        setIsListening(true)
        console.log('Speech recognition started')
      }

      recognition.onresult = (event: any) => {
        let interimTranscript = ''
        let finalTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        if (interimTranscript) {
          setTranscript(interimTranscript)
        }
        if (finalTranscript) {
          setTranscript(finalTranscript)
          processUserInput(finalTranscript)
        }
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setError(event.error)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
        console.log('Speech recognition ended')
      }

      recognition.start()
    }
  }

  const stopListening = () => {
    setIsListening(false)
  }

  const processUserInput = async (input: string) => {
    try {
      // Simple response logic - in a real app, this would call OpenAI
      const responses = [
        "Hello! How can I help you today?",
        "That's interesting! Tell me more.",
        "I understand. Is there anything specific you'd like to know?",
        "Great question! Let me think about that.",
        "I'm here to help. What would you like to do?",
        "Wah, very good question! Let me help you with that.",
        "No problem, I can help you with that.",
        "Sure sure, I understand what you're asking."
      ]
      
      const response = responses[Math.floor(Math.random() * responses.length)]
      
      // Speak the response
      speakText(response)
      
      setIsSpeaking(true)
      setTimeout(() => setIsSpeaking(false), 3000)
      
    } catch (err) {
      console.error('Error processing input:', err)
      setError('Failed to process your message')
    }
  }

  const repeatLastMessage = () => {
    if (transcript) {
      speakText(transcript)
    }
  }

  const speakSlower = () => {
    if (transcript) {
      speakText(transcript, 0.5, 0.8)
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Avatar Panel */}
      <AvatarPanel 
        isVisible={isConnected}
        isSpeaking={isSpeaking}
        className="mx-auto"
      />

      {/* Connection Status */}
      <Card className="p-4">
        <div className="text-center space-y-4">
          {!isConnected ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Connect to Your AI Companion</h2>
              <p className="text-gray-600">
                Tap the button below to start talking with your AI assistant
              </p>
              <Button 
                onClick={connect}
                size="lg"
                className="w-full min-h-[56px] text-lg"
              >
                <Mic className="w-6 h-6 mr-2" />
                Connect & Start Talking
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-green-600">
                Connected! Ready to Chat
              </h2>
              
              {/* Transcript Display */}
              {transcript && (
                <Card className="p-4 bg-blue-50">
                  <p className="text-lg">{transcript}</p>
                </Card>
              )}
              
              {/* Control Buttons */}
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  onClick={isListening ? stopListening : startListening}
                  variant={isListening ? "destructive" : "default"}
                  size="lg"
                  className="min-h-[48px] min-w-[48px]"
                >
                  {isListening ? (
                    <MicOff className="w-6 h-6" />
                  ) : (
                    <Mic className="w-6 h-6" />
                  )}
                </Button>
                
                <Button
                  onClick={repeatLastMessage}
                  variant="outline"
                  size="lg"
                  className="min-h-[48px] min-w-[48px]"
                >
                  <RotateCcw className="w-6 h-6" />
                </Button>
                
                <Button
                  onClick={speakSlower}
                  variant="outline"
                  size="lg"
                  className="min-h-[48px] min-w-[48px]"
                >
                  <Minus className="w-6 h-6" />
                </Button>
              </div>
              
              <Button
                onClick={disconnect}
                variant="outline"
                className="w-full"
              >
                End Call
              </Button>
            </div>
          )}
          
          {/* Error Display */}
          {error && (
            <Card className="p-4 bg-red-50 border-red-200">
              <p className="text-red-600">{error}</p>
            </Card>
          )}
        </div>
      </Card>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} autoPlay />
    </div>
  )
}
