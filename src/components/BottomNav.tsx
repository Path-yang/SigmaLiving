'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Mic, HeartHandshake, PlusSquare, UserRound } from '@/app/(marketing)/icons'

const navItems = [
  { 
    href: '/', 
    icon: Home, 
    label: 'Home',
    testId: 'nav-home'
  },
  { 
    href: '/assistant', 
    icon: Mic, 
    label: 'Assistant',
    testId: 'nav-assistant'
  },
  { 
    href: '/hobbies', 
    icon: HeartHandshake, 
    label: 'Hobbies',
    testId: 'nav-hobbies'
  },
  { 
    href: '/feed?compose=1', 
    icon: PlusSquare, 
    label: 'Post',
    testId: 'nav-post'
  },
  { 
    href: '/feed/me', 
    icon: UserRound, 
    label: 'Profile',
    testId: 'nav-profile'
  },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50 safe-area-bottom hidden lg:hidden">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || 
            (item.href === '/feed/me' && pathname.startsWith('/profile')) ||
            (item.href === '/feed?compose=1' && pathname === '/feed')
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center space-y-1 p-3 rounded-lg transition-colors tap-target ${
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
              aria-label={item.label}
              data-testid={item.testId}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
