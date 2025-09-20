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
}

export function FeatureCard({ icon, title, desc, href, testId }: FeatureCardProps) {
  return (
    <Link href={href} data-testid={testId}>
      <Card className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group h-full">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
            <span className="text-2xl">{icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              {desc}
            </p>
            <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
              <span className="text-base">Learn more</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
