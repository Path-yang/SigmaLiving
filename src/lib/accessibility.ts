// Accessibility helpers for seniors
export const textSizes = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl'
} as const

export const tapTargets = {
  sm: 'min-h-[32px] min-w-[32px]',
  base: 'min-h-[44px] min-w-[44px]',
  lg: 'min-h-[48px] min-w-[48px]',
  xl: 'min-h-[56px] min-w-[56px]'
} as const

export const highContrast = {
  primary: 'text-blue-900 bg-blue-100',
  secondary: 'text-gray-900 bg-gray-100',
  success: 'text-green-900 bg-green-100',
  warning: 'text-yellow-900 bg-yellow-100',
  error: 'text-red-900 bg-red-100'
} as const

export function getTextSizeClass(size: keyof typeof textSizes = 'base') {
  return textSizes[size]
}

export function getTapTargetClass(size: keyof typeof tapTargets = 'base') {
  return tapTargets[size]
}

export function getHighContrastClass(type: keyof typeof highContrast = 'primary') {
  return highContrast[type]
}

// Speech synthesis helper
export function speakText(text: string, rate: number = 0.8, pitch: number = 1) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = rate
    utterance.pitch = pitch
    utterance.volume = 1
    speechSynthesis.speak(utterance)
  }
}

// Focus management
export function focusElement(elementId: string) {
  if (typeof window !== 'undefined') {
    const element = document.getElementById(elementId)
    if (element) {
      element.focus()
    }
  }
}

// Announce to screen readers
export function announceToScreenReader(message: string) {
  if (typeof window !== 'undefined') {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement)
      }
    }, 1000)
  }
}
