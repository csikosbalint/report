'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const hasChosen = localStorage.getItem('cookieConsentChoice')
    if (!hasChosen) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    setIsFading(true)
    localStorage.setItem('cookieConsentChoice', 'accepted')
    setTimeout(() => setIsVisible(false), 500) // Match this with the transition duration
  }

  const handleDecline = () => {
    setIsFading(true)
    localStorage.setItem('cookieConsentChoice', 'declined')
    setTimeout(() => setIsVisible(false), 500) // Match this with the transition duration
    // Here you might want to disable certain features or cookies
  }

  if (!isVisible) return null

  return (
    (<div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center p-4 transition-opacity duration-500 ease-in-out ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}>
      <div
        className="w-full max-w-[101rem] bg-slate-300 rounded-t-lg overflow-hidden">
        <Alert className="rounded-none">
          <AlertDescription
            className="flex flex-col sm:flex-row items-start justify-between gap-4 p-4">
            <div className="flex-1 text-sm">
              Unlike other news sites, we do not share or sell your data to third-parties for targeted ads. In fact, the Ground News application and website do not run any ads at all. Our application and website use cookies and similar technologies to personalize content we deliver to you and also allows us to improve your usage of our platform through analytics. These cookies help us provide the best experience possible. Learn more about cookies and preference selection{' '}
              <Link href="/cookie-preferences" className="underline">
                here
              </Link>
              .
              <br />
              <br />
              By continuing to use our application or website, you agree to our{' '}
              <Link href="/terms" className="underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </div>
            <div className="flex flex-col gap-2 mt-4 sm:mt-0">
              <Button variant="default" onClick={handleAccept} className="w-full">
                Accept
              </Button>
              <Button variant="outline" onClick={handleDecline} className="w-full">
                Decline
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>)
  );
}

