'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Type } from 'lucide-react'

export function TextScaleToggle() {
  const [textScale, setTextScale] = useState<'normal' | 'xl'>('normal')

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('textScale') as 'normal' | 'xl' | null
    if (saved) {
      setTextScale(saved)
      document.documentElement.setAttribute('data-textscale', saved)
    } else {
      document.documentElement.setAttribute('data-textscale', 'normal')
    }
  }, [])

  const toggleTextScale = () => {
    const newScale = textScale === 'normal' ? 'xl' : 'normal'
    setTextScale(newScale)
    document.documentElement.setAttribute('data-textscale', newScale)
    localStorage.setItem('textScale', newScale)
  }

  return (
    <Button
      onClick={toggleTextScale}
      variant="outline"
      size="sm"
      className="tap-target"
      aria-label={`Current text size: ${textScale}. Click to change.`}
    >
      <Type className="w-4 h-4 mr-2" />
      <span className="text-sm font-medium">
        A{textScale === 'xl' ? 'A' : ''}
      </span>
    </Button>
  )
}
