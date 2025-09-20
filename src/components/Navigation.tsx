'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, MessageSquare, HeartHandshake, Camera, User } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { ResponsiveText } from '@/components/responsive/ResponsiveText';

export default function Navigation() {
  const pathname = usePathname();
  const { t } = useI18n();

  const navItems = [
    { href: '/', label: t.navigation.home, icon: Home },
    { href: '/assistant', label: t.navigation.assistant, icon: MessageSquare },
    { href: '/hobbies', label: t.navigation.hobbies, icon: HeartHandshake },
    { href: '/feed', label: t.navigation.feed, icon: Camera },
    { href: '/profile', label: t.navigation.profile, icon: User },
  ];

  return (
    <nav className="bg-white border-t shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`flex flex-col items-center gap-1 h-auto py-2 md:py-3 px-2 md:px-4 min-w-0 ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  aria-label={item.label}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  <ResponsiveText size="xs" weight="medium" className="text-center">
                    {item.label}
                  </ResponsiveText>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
