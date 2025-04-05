'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from './ui/button'

export function PromotionSection({ text, buttonText, link }) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className='sm:max-w-[var(--max-width-total)] flex py-2 pl-2 pr-8 text-primary-foreground relative'>
      <div className='flex items-center justify-center gap-2 sm:gap-8'>
        <p className='text-sm text-wrap md:text-nowrap md:text-lg font-semibold truncate max-w-[calc(var(--max-width-total)-10rem)]'>
          {text}
        </p>
        <Button
          className="font-semibold"
          variant='secondary'
          size='sm'
          onClick={() => window.location.href = link}>
          {buttonText}
        </Button>
        <X
          onClick={() => setIsVisible(false)}
          className='text-primary-foreground font-semibold h-4 w-4 hover:cursor-pointer top-1 right-1 absolute'
        />
        <span className='sr-only'>Dismiss</span>
      </div>

    </div>
  )
}
