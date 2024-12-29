import Image from 'next/image'
import { Card, CardContent } from '../../components/ui/card'
import Link from 'next/link'

export default function Home () {
  return (
    <div className='space-y-12'>
      {/* Featured Article */}
      <section className='space-y-6'>
        <h1 className='text-4xl font-bold tracking-tight'>Top Stories</h1>
        <div className='grid gap-6 lg:grid-cols-2'>
          <Link href='/article/breaking-news-major-climate-agreement-reached-at-international-summit'>
            <Card>
              <CardContent className='p-0'>
                <Image
                  src='/placeholder.svg?height=400&width=800'
                  width={800}
                  height={400}
                  alt='Featured story'
                  className='aspect-[2/1] object-cover'
                />
                <div className='p-6'>
                  <h2 className='text-2xl font-bold mb-4'>
                    Breaking News: Major Climate Agreement Reached at
                    International Summit
                  </h2>
                  <p className='text-muted-foreground'>
                    World leaders have come together to sign a landmark climate
                    agreement that sets ambitious targets for reducing global
                    emissions over the next decade...
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <div className='space-y-6'>
            {[1, 2, 3].map(i => (
              <Card key={i}>
                <CardContent className='p-6'>
                  <h3 className='text-xl font-bold mb-2'>
                    Latest Updates on Global Economic Trends
                  </h3>
                  <p className='text-muted-foreground'>
                    Markets respond to new policy measures as central banks
                    adjust interest rates...
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className='w-full h-px bg-border' />

      {/* Latest News Section */}
      <section className='space-y-6'>
        <h2 className='text-3xl font-bold tracking-tight'>Latest News</h2>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i}>
              <CardContent className='p-0'>
                <Image
                  src='/placeholder.svg?height=200&width=400'
                  width={400}
                  height={200}
                  alt={`News story ${i}`}
                  className='aspect-[2/1] object-cover'
                />
                <div className='p-6'>
                  <h3 className='text-lg font-bold mb-2'>
                    Technology Advances in Renewable Energy Sector
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    New developments in solar technology promise to
                    revolutionize clean energy production...
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className='w-full h-px bg-border' />

      {/* In-Depth Analysis */}
      <section className='space-y-6'>
        <h2 className='text-3xl font-bold tracking-tight'>In-Depth Analysis</h2>
        <div className='grid gap-6 lg:grid-cols-2'>
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardContent className='p-6 space-y-4'>
                <h3 className='text-xl font-bold'>
                  Understanding Global Trade Relations
                </h3>
                <p className='text-muted-foreground'>
                  An extensive analysis of current trade policies and their
                  impact on international markets...
                </p>
                <div className='flex items-center text-sm text-muted-foreground'>
                  <span>10 min read</span>
                  <span className='mx-2'>•</span>
                  <span>Analysis</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className='w-full h-px bg-border' />

      {/* Opinion Section */}
      <section className='space-y-6'>
        <h2 className='text-3xl font-bold tracking-tight'>Opinion</h2>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardContent className='p-6 space-y-4'>
                <div className='flex items-center space-x-4'>
                  <div className='h-10 w-10 rounded-full bg-muted' />
                  <div>
                    <h4 className='font-semibold'>Opinion Writer</h4>
                    <p className='text-sm text-muted-foreground'>
                      Contributing Editor
                    </p>
                  </div>
                </div>
                <h3 className='text-lg font-bold'>
                  The Future of Urban Development
                </h3>
                <p className='text-muted-foreground'>
                  Exploring the challenges and opportunities in modern city
                  planning...
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className='w-full h-px bg-border' />

      {/* Regional News */}
      <section className='space-y-6'>
        <h2 className='text-3xl font-bold tracking-tight'>Regional News</h2>
        <div className='grid gap-6 md:grid-cols-2'>
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardContent className='p-6'>
                <h3 className='text-xl font-bold mb-2'>
                  Local Infrastructure Projects Begin
                </h3>
                <p className='text-muted-foreground mb-4'>
                  New development plans set to transform community spaces and
                  transportation networks...
                </p>
                <div className='text-sm text-muted-foreground'>
                  <span>Local News</span>
                  <span className='mx-2'>•</span>
                  <span>5 hours ago</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
