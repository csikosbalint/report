import { PromotionSection } from '@/components/section-promotion'
import { SettingsSection } from '@/components/section-settings'
import { NavigationSection } from '@/components/section-navigation'
import { TagsSection } from '@/components/section-tags'
import { SectionAd } from '@/components/section-ad'
import './globals.css'

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
