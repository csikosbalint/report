import { PromotionSection } from '../../components/section-promotion'
import { SettingsSection } from '../../components/section-settings'
import { NavigationSection } from '../../components/section-navigation'
import { TagsSection } from '../../components/section-tags'
import Footer from '../../components/footer'
import '../globals.css'
import AdUnit from '@/components/ad-unit'
import { Suspense } from 'react'

export default async function RootLayout({ children }) {
  const tagFilterSection = process.env.FLAG_TAGFILTER;
  const showPromotion = process.env.FLAG_PROMOTION;
  const geolocation = process.env.FLAG_GEOLOCATION;
  return (
    <div className="flex flex-col h-full w-full items-center text-sm sm:text-md">
      <div className="w-full flex justify-center bg-primary">
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
      <div className="flex w-full max-w-[var(--max-width-total)] h-full">
        <main className="xl:basis-3/4">
          {children}
        </main>
        <div className="xl:basis-1/4 hidden xl:flex flex-col h-full">
          <div className="basis-1/2 flex-grow w-full h-full">
            <AdUnit adSlot="8626650819" adFormat='vertical' />
          </div>
          <div className="basis-1/2 w-full">
            <AdUnit adSlot="8626650819" adFormat='vertical'/>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center border-t-2">
        <div className="max-w-[var(--max-width-total)]">
          <Footer />
        </div>
      </div>
    </div>
  )
}
