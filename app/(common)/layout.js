import { PromotionSection } from '../../components/section-promotion'
import { SettingsSection } from '../../components/section-settings'
import { NavigationSection } from '../../components/section-navigation'
import { TagsSection } from '../../components/section-tags'
import { AdWrapper } from '../../components/wrapper-ad'
import '../globals.css'

export default function RootLayout ({ children }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <PromotionSection />
      <SettingsSection />
      <NavigationSection />
      <TagsSection />
      <div className='max-w-[var(--max-width-total)] mx-auto w-full flex justify-between'>
        <AdWrapper position='left' />
        <main className='flex-1 max-w-[var(--max-width-content)] px-4 py-6'>
          {children}
        </main>
        <AdWrapper position='right' />
      </div>
    </div>
  )
}
