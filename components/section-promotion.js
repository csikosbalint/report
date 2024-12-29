'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from './ui/button'

export function PromotionSection() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-primary px-4 py-3 text-primary-foreground">
      <div className="max-w-[54rem] mx-auto relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-sm font-medium">
              Want a second opinion on the news that you&apos;re reading?
            </p>
            <Button variant="secondary" size="sm">
              Learn More
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(false)}
            className="text-primary-foreground hover:text-primary-foreground/80"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

