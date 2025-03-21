import { PromotionSection } from '../../components/section-promotion'
import { SettingsSection } from '../../components/section-settings'
import { NavigationSection } from '../../components/section-navigation'
import { TagsSection } from '../../components/section-tags'
import Footer from '../../components/footer'
import '../globals.css'
import AdUnit from '@/components/ad-unit'

export default async function RootLayout({ children }) {
  const tagFilterSection = process.env.FLAG_TAGFILTER;
  const showPromotion = process.env.FLAG_PROMOTION;
  const geolocation = process.env.FLAG_GEOLOCATION;
  return (
    <div className="flex flex-col h-screen w-screen min-h-screen items-center text-sm sm:text-md ">
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
      <div className="flex w-full max-w-[var(--max-width-total)]">
        <main className="basis-3/4">
          {children}
        </main>
        <div className="basis-1/4 hidden md:block">
          {/* <AdUnit /> */}
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
