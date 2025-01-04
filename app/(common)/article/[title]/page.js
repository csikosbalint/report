import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SectionArticleRelated } from '@/components/section-article-related'

async function getRelatedStories () {
  return [
    {
      title: 'Climate Change Impact on Global Ecosystems',
      excerpt:
        'New research reveals the far-reaching consequences of climate change on biodiversity and ecosystem stability...',
      imageSrc: '/placeholder.svg?height=200&width=400&text=Related+Story+1'
    },
    {
      title: 'Renewable Energy Breakthroughs',
      excerpt:
        'Scientists announce major advancements in solar and wind technologies, promising more efficient and affordable clean energy...',
      imageSrc: '/placeholder.svg?height=200&width=400&text=Related+Story+2'
    },
    {
      title: 'Global Efforts to Reduce Plastic Pollution',
      excerpt:
        'Countries worldwide implement innovative strategies to tackle the growing crisis of plastic waste in oceans...',
      imageSrc: '/placeholder.svg?height=200&width=400&text=Related+Story+3'
    }
  ]
}

export default async function ArticlePage ({ params }) {
  const relatedStories = await getRelatedStories()

  return (
    <div>
      <article className='space-y-8'>
        <header className='space-y-4'>
          <h1 className='text-4xl font-bold tracking-tight lg:text-5xl'>
            Breaking News: Major Climate Agreement Reached at International
            Summit
          </h1>
          <p className='text-xl text-muted-foreground'>
            World leaders have come together to sign a landmark climate
            agreement that sets ambitious targets for reducing global emissions
            over the next decade.
          </p>
          <div className='flex items-center space-x-4'>
            <Avatar>
              <AvatarImage
                src='/placeholder.svg?height=40&width=40'
                alt='John Doe'
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className='font-semibold'>John Doe</p>
              <p className='text-sm text-muted-foreground'>
                Environmental Correspondent
              </p>
            </div>
          </div>
          <div className='flex items-center space-x-4 text-sm text-muted-foreground'>
            <time dateTime='2023-12-29'>December 29, 2023</time>
            <span>•</span>
            <span>10 min read</span>
          </div>
        </header>

        <Image
          src='/placeholder.svg?height=600&width=1200'
          width={1200}
          height={600}
          alt='Climate Summit'
          className='aspect-[2/1] object-cover rounded-lg'
        />

        <div className='prose prose-lg max-w-none'>
          <p>
            In a historic move that promises to reshape global efforts to combat
            climate change, world leaders from over 190 countries have signed a
            groundbreaking agreement at the International Climate Summit held in
            Geneva, Switzerland. The accord, dubbed the "Geneva Climate Pact,"
            sets forth the most ambitious and comprehensive plan to date for
            reducing greenhouse gas emissions and transitioning to renewable
            energy sources.
          </p>

          <h2>Key Points of the Agreement</h2>
          <ul>
            <li>
              A commitment to reduce global carbon emissions by 50% by 2030,
              compared to 2005 levels.
            </li>
            <li>
              A pledge to achieve net-zero emissions by 2050 for developed
              nations, and by 2060 for developing countries.
            </li>
            <li>
              The establishment of a $100 billion annual fund to assist
              developing nations in their transition to clean energy.
            </li>
            <li>
              A ban on new coal-fired power plants, effective immediately for
              developed nations and by 2025 for developing countries.
            </li>
            <li>
              A global carbon pricing mechanism to be implemented by 2025.
            </li>
          </ul>

          <h2>Reactions from World Leaders</h2>
          <p>
            The signing of the Geneva Climate Pact has been met with widespread
            approval and optimism from leaders around the world. U.S. President
            Jane Smith hailed the agreement as "a turning point in our fight
            against climate change," while Chinese Premier Li Wei called it "a
            balanced and fair approach that considers the needs of both
            developed and developing nations."
          </p>

          <p>
            However, some critics argue that the targets, while ambitious, may
            not be sufficient to prevent the worst effects of climate change.
            Environmental groups have called for even more aggressive measures,
            particularly in the short term.
          </p>

          <h2>Implementation Challenges</h2>
          <p>
            While the agreement marks a significant step forward, experts warn
            that implementing its provisions will require unprecedented levels
            of international cooperation and domestic policy changes. Key
            challenges include:
          </p>

          <ul>
            <li>
              Overcoming political resistance in countries heavily dependent on
              fossil fuels.
            </li>
            <li>Developing and scaling up new clean energy technologies.</li>
            <li>
              Ensuring equitable distribution of the costs and benefits of the
              transition to a low-carbon economy.
            </li>
            <li>
              Monitoring and enforcing compliance with the agreement's
              provisions.
            </li>
          </ul>

          <h2>What's Next?</h2>
          <p>
            In the coming months, countries will begin the process of ratifying
            the agreement and incorporating its targets into their national
            climate plans. A series of follow-up meetings have been scheduled to
            work out the details of implementation, particularly regarding the
            carbon pricing mechanism and the distribution of the climate fund.
          </p>

          <p>
            As the world embarks on this ambitious journey to combat climate
            change, the success of the Geneva Climate Pact will ultimately
            depend on the commitment and actions of governments, businesses, and
            individuals around the globe. The next few years will be crucial in
            determining whether this historic agreement can truly turn the tide
            in the fight against global warming.
          </p>
        </div>
      </article>

      <div className='flex justify-center space-x-4'>
        <Button>Share Article</Button>
        <Button variant='outline'>Save for Later</Button>
      </div>

      <SectionArticleRelated stories={relatedStories} />
    </div>
  )
}
