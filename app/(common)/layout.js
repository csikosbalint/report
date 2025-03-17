import { PromotionSection } from '../../components/section-promotion'
import { SettingsSection } from '../../components/section-settings'
import { NavigationSection } from '../../components/section-navigation'
import { TagsSection } from '../../components/section-tags'
import '../globals.css'
import { tagFilterSectionFlag, showPromotionFlag, geolocationFlag } from '@/lib/flags'

export default async function RootLayout({ children }) {
  const tagFilterSection = await tagFilterSectionFlag()
  const showPromotion = await showPromotionFlag()
  const geolocation = await geolocationFlag()
  return (
    <div className="flex flex-col h-screen w-screen min-h-screen items-center text-sm sm:text-md ">
      <div>
        {showPromotion && (
          <PromotionSection
            text="Want a second opinion on the news that you're reading?"
            buttonText="Learn More"
            link="https://example.com"
          />
        )}
      </div>
      <div>
        {geolocation && <SettingsSection />}
      </div>
      <div className="w-full">
        <NavigationSection />
      </div>
      <div>
        {tagFilterSection && <TagsSection />}
      </div>
      <div className="flex w-full max-w-[var(--max-width-total)]">
        <main className="basis-3/4">
          {children}
        </main>
        <div className="basis-1/4 hidden md:block">
        AdUnit
        </div>
      </div>
    </div>
  )
}
