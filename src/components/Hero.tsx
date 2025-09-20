'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MessageSquareDashed, HeartHandshake, Camera } from '@/app/(marketing)/icons'
import { SilverSigmaLogo } from '@/components/SilverSigmaLogo'
import { useI18n } from '@/lib/i18n/context'
import { ResponsiveText } from '@/components/responsive/ResponsiveText'
import { ResponsiveContainer } from '@/components/responsive/ResponsiveContainer'

export function Hero() {
  const { t } = useI18n();

  return (
    <div className="hero-background rounded-2xl md:rounded-3xl p-8 md:p-16 mb-12 md:mb-16 relative overflow-hidden shadow-2xl">
      <ResponsiveContainer maxWidth="6xl">
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <SilverSigmaLogo 
              width={80}
              height={80}
              className="w-20 h-20 md:w-[120px] md:h-[120px]"
            />
          </div>
          
          <ResponsiveText 
            as="h1" 
            size="4xl" 
            weight="extrabold" 
            className="text-gray-900 mb-4 md:mb-6 text-center tracking-tight"
          >
            {t.home.title}
          </ResponsiveText>
          
          <ResponsiveText 
            as="p" 
            size="lg" 
            className="text-gray-700 mb-8 md:mb-12 max-w-3xl leading-relaxed text-center mx-auto"
          >
            {t.home.subtitle}
          </ResponsiveText>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 md:space-x-3 text-gray-700 bg-white/60 rounded-xl p-3 md:p-4 backdrop-blur-sm">
              <MessageSquareDashed className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
              <ResponsiveText size="sm" weight="semibold" className="text-center">
                Get your own companion!
              </ResponsiveText>
            </div>
            <div className="flex items-center justify-center space-x-2 md:space-x-3 text-gray-700 bg-white/60 rounded-xl p-3 md:p-4 backdrop-blur-sm">
              <HeartHandshake className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
              <ResponsiveText size="sm" weight="semibold" className="text-center">
                Find Hobby Buddies!
              </ResponsiveText>
            </div>
            <div className="flex items-center justify-center space-x-2 md:space-x-3 text-gray-700 bg-white/60 rounded-xl p-3 md:p-4 backdrop-blur-sm">
              <Camera className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
              <ResponsiveText size="sm" weight="semibold" className="text-center">
                Share Moments with friends!
              </ResponsiveText>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  )
}
