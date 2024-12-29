import './globals.css'
import { CookieConsent } from '@/components/cookie-consent'

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body>
        <div>{children}</div>
        <CookieConsent />
      </body>
    </html>
  )
}
