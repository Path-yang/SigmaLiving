'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { ArrowRight } from '@/app/(marketing)/icons'

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
      <Card className={`${cardClass} p-10 transition-all duration-300 cursor-pointer group h-full rounded-3xl shadow-lg`}>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {desc}
          </p>
          <div className="flex items-center justify-center">
            <button className="enhanced-button bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg">
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
