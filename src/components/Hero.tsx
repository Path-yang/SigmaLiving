'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MessageSquareDashed, HeartHandshake, Camera } from '@/app/(marketing)/icons'

export function Hero() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 mb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 text-6xl opacity-20">
        👋
      </div>
      <div className="absolute bottom-4 left-4 text-4xl opacity-20">
        🌟
      </div>
      
      <div className="relative z-10">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Welcome to SilverCircle
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl leading-relaxed">
          A simple, friendly app to chat with your AI companion, learn hobbies, and share moments with family and friends.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/assistant">
            <Button 
              size="lg" 
              className="btn-senior-lg bg-blue-600 hover:bg-blue-700 text-white"
              data-testid="hero-cta-assistant"
            >
              <MessageSquareDashed className="w-6 h-6 mr-2" />
              Try AI Companion
            </Button>
          </Link>
          
          <Link href="/hobbies">
            <Button 
              variant="outline" 
              size="lg" 
              className="btn-senior-lg border-blue-600 text-blue-600 hover:bg-blue-50"
              data-testid="hero-cta-hobbies"
            >
              <HeartHandshake className="w-6 h-6 mr-2" />
              Explore Hobbies
            </Button>
          </Link>
        </div>
        
        {/* Feature highlights */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <MessageSquareDashed className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium">Voice & Text Chat</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <HeartHandshake className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium">Find Hobby Buddies</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Camera className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium">Share Safely</span>
          </div>
        </div>
      </div>
    </div>
  )
}
