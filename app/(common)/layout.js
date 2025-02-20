import { PromotionSection } from '../../components/section-promotion'
import { SettingsSection } from '../../components/section-settings'
import { NavigationSection } from '../../components/section-navigation'
import { TagsSection } from '../../components/section-tags'
import { AdWrapper } from '../../components/wrapper-ad'
import '../globals.css'
import MainHorizontalLayout from '@/components/layouts/MainHorizontalLayout'
import ContentVerticalLayout from '@/components/layouts/ContentVerticalLayout'

export default function RootLayout ({ children }) {
  const showPromotionSection = true; // This will later come from user

  return (
    <MainHorizontalLayout>
      {showPromotionSection && (
        <PromotionSection 
          text="Want a second opinion on the news that you're reading?"
          buttonText="Learn More"
          link="/learn-more"
        />
      )}
      <SettingsSection />
      <NavigationSection />
      <TagsSection />
      <ContentVerticalLayout>
        <div className='shrink-0 bg-rose-200 hidden xl:block'>
          <AdWrapper position='left' />
        </div>
        <main className='shrink px-4 py-6'>
          {children}
        </main>
        <div className='shrink-0 bg-sky-200 hidden md:block'>
          <AdWrapper position='right' />
        </div>
      </ContentVerticalLayout>
    </MainHorizontalLayout>
  )
}
