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
        <main className="lg:basis-3/4">
          {children}
        </main>
        <div className="lg:basis-1/4 hidden lg:flex flex-col h-full bg-green-100">
          <div className="basis-1/2 flex-grow w-full h-full bg-rose-100">
            <Suspense fallback={<div className="w-full h-full" />}>
              <AdUnit>
                <ins className="adsbygoogle w-full h-full"
                  style={{ display: "block" }}
                  data-ad-client="ca-pub-8712767354684493"
                  data-ad-slot="8626650819"
                  data-ad-format="vertical"
                  data-full-width-responsive="true">
                </ins>
              </AdUnit>
            </Suspense>
          </div>
          <div className="basis-1/2 w-full">
            {/* <Suspense fallback={<div className="w-full" />}>
              <AdUnit>
                <ins className="adsbygoogle w-full"
                  style={{ display: "block" }}
                  data-ad-client="ca-pub-8712767354684493"
                  data-ad-slot="8606932535"
                  data-ad-format="vertical"
                  data-full-width-responsive="true">
                </ins>
              </AdUnit>
            </Suspense> */}
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
