'use client'

import { useEffect, useRef, useState } from 'react'
import { Card } from '@/components/ui/card'

interface AvatarPanelProps {
  isVisible: boolean
  isSpeaking: boolean
  className?: string
}

export function AvatarPanel({ isVisible, isSpeaking, className = '' }: AvatarPanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if avatar providers are available
    const heygenKey = process.env.NEXT_PUBLIC_HEYGEN_API_KEY
    const didKey = process.env.NEXT_PUBLIC_DID_API_KEY

    if (!heygenKey && !didKey) {
      console.log('No avatar provider keys found, using static avatar')
      return
    }

    // Initialize avatar session if keys are available
    initializeAvatar()
  }, [])

  const initializeAvatar = async () => {
    setIsLoading(true)
    try {
      // This would integrate with HeyGen or D-ID APIs
      // For now, we'll use a placeholder
      setAvatarUrl('/api/placeholder-avatar')
    } catch (error) {
      console.error('Failed to initialize avatar:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isVisible) return null

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          {isLoading ? (
            <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse flex items-center justify-center">
              <span className="text-gray-500">Loading...</span>
            </div>
          ) : avatarUrl ? (
            <video
              ref={videoRef}
              className="w-32 h-32 rounded-full object-cover"
              autoPlay
              muted
              playsInline
            />
          ) : (
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">👋</span>
            </div>
          )}
          
          {isSpeaking && (
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold">Your AI Companion</h3>
          <p className="text-sm text-gray-600">
            {isSpeaking ? 'Speaking...' : 'Ready to chat'}
          </p>
        </div>
      </div>
    </Card>
  )
}
