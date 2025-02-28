'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from './ui/button'

export function PromotionSection ({ text, buttonText, link }) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className='w-full p-2 text-primary-foreground bg-black justify-between items-center transition-all duration-500 ease-in-out'>
      <div className='w-full relative'>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8'>
          <p className='text-sm font-medium'>
            {text}
          </p>
          <Button variant='secondary' size='sm' onClick={() => window.location.href = link}>
            {buttonText}
          </Button>
        </div>
      </div>
      <X
        onClick={() => setIsVisible(false)}
        className='text-primary-foreground h-4 w-4 hover:cursor-pointer absolute top-2 right-2'
      />
      <span className='sr-only'>Dismiss</span>
    </div>
  )
}
