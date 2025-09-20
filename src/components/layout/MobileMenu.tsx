"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Settings, Globe } from 'lucide-react';
import { FontSizeSelector } from '@/components/settings/FontSizeSelector';
import { LanguageSelector } from '@/components/settings/LanguageSelector';
import { useI18n } from '@/lib/i18n/context';
import { ResponsiveText } from '@/components/responsive/ResponsiveText';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="md:hidden bg-gray-50/80 border-gray-200 text-gray-600 hover:bg-gray-100"
        >
          <Menu className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            <ResponsiveText size="lg" weight="semibold">
              Settings
            </ResponsiveText>
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <FontSizeSelector />
          <LanguageSelector />
        </div>
      </SheetContent>
    </Sheet>
  );
}
