'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from './ui/button'

export function PromotionSection () {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className='max-w-[var(--max-width-total)] flex w-full p-2 text-primary-foreground bg-primary justify-between items-center relative'>
      <div className='w-full'>
        <div className='flex items-center justify-center gap-2 sm:gap-8'>
          <p className='text-sm font-medium'>
            Want a second opinion on the news that you&apos;re reading?
          </p>
          <Button variant='secondary' size='sm'>
            Learn More
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
