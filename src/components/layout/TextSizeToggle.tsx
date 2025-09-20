'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Type } from 'lucide-react'

export function TextSizeToggle() {
  const [textSize, setTextSize] = useState<'base' | 'lg' | 'xl'>('base')

  useEffect(() => {
    // Apply text size to html element
    const html = document.documentElement
    html.setAttribute('data-textscale', textSize)
  }, [textSize])

  const cycleTextSize = () => {
    const sizes: ('base' | 'lg' | 'xl')[] = ['base', 'lg', 'xl']
    const currentIndex = sizes.indexOf(textSize)
    const nextIndex = (currentIndex + 1) % sizes.length
    setTextSize(sizes[nextIndex])
  }

  return (
    <Button
      onClick={cycleTextSize}
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 z-40 tap-target"
      aria-label={`Current text size: ${textSize}. Click to change.`}
    >
      <Type className="w-4 h-4 mr-2" />
      <span className="text-sm">A{textSize === 'lg' ? 'A' : textSize === 'xl' ? 'AA' : ''}</span>
    </Button>
  )
}
