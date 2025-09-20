'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MessageSquareDashed, HeartHandshake, Camera } from '@/app/(marketing)/icons'
import { SilverSigmaLogo } from '@/components/SilverSigmaLogo'
import { useI18n } from '@/lib/i18n/context'

export function Hero() {
  const { t } = useI18n();

  return (
    <div className="hero-background rounded-3xl p-16 mb-16 relative overflow-hidden shadow-2xl">
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center mb-8">
          <SilverSigmaLogo 
            width={120}
            height={120}
            className="w-[120px] h-[120px]"
          />
        </div>
        <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 text-center tracking-tight">
          {t.home.title}
        </h1>
        <p className="text-xl lg:text-2xl text-gray-700 mb-12 max-w-3xl leading-relaxed text-center mx-auto">
          {t.home.subtitle}
        </p>
        
        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3 text-gray-700 bg-white/60 rounded-xl p-4 backdrop-blur-sm">
            <MessageSquareDashed className="w-6 h-6 text-blue-500" />
            <span className="text-base font-semibold">Get your own companion!</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-700 bg-white/60 rounded-xl p-4 backdrop-blur-sm">
            <HeartHandshake className="w-6 h-6 text-green-500" />
            <span className="text-base font-semibold">Find Hobby Buddies!</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-700 bg-white/60 rounded-xl p-4 backdrop-blur-sm">
            <Camera className="w-6 h-6 text-purple-500" />
            <span className="text-base font-semibold">Share Moments with friends!</span>
          </div>
        </div>
      </div>
    </div>
  )
}
