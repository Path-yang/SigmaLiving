'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { ArrowRight } from '@/app/(marketing)/icons'
import { ResponsiveText } from '@/components/responsive/ResponsiveText'

interface FeatureCardProps {
  icon: string // Change from React.ComponentType to string
  title: string
  desc: string
  href: string
  testId?: string
  cardNumber?: 1 | 2 | 3 // Add card number for background styling
}

export function FeatureCard({ icon, title, desc, href, testId, cardNumber = 1 }: FeatureCardProps) {
  const cardClass = `feature-card-${cardNumber} enhanced-card`;
  
  return (
    <Link href={href} data-testid={testId}>
      <Card className={`${cardClass} p-6 md:p-10 transition-all duration-300 cursor-pointer group h-full rounded-2xl md:rounded-3xl shadow-lg`}>
        <div className="relative z-10">
          <ResponsiveText 
            as="h3" 
            size="xl" 
            weight="bold" 
            className="text-gray-900 mb-3 md:mb-4 group-hover:text-blue-600 transition-colors"
          >
            {title}
          </ResponsiveText>
          
          <ResponsiveText 
            as="p" 
            size="base" 
            className="text-gray-700 leading-relaxed mb-6 md:mb-8"
          >
            {desc}
          </ResponsiveText>
          
          <div className="flex items-center justify-center">
            <button className="enhanced-button bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-lg shadow-lg">
              {title === 'Talk to AI' ? 'Start Chatting' : 
               title === 'Share Moments' ? 'View Feed' : 
               title === 'Learn Hobbies' ? 'Explore Hobbies' : 'Learn More'}
            </button>
          </div>
        </div>
      </Card>
    </Link>
  )
}
