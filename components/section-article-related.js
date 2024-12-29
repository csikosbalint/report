import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function SectionArticleRelated({ stories }) {
  return (
    (<section className="space-y-6 mt-12">
      <h2 className="text-3xl font-bold tracking-tight">Related Stories</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story, index) => (
          <Card key={index}>
            <CardContent className="p-0">
              <Image
                src={story.imageSrc}
                width={400}
                height={200}
                alt={story.title}
                className="aspect-[2/1] object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">{story.title}</h3>
                <p className="text-sm text-muted-foreground">{story.excerpt}</p>
                <Button variant="link" className="mt-4 p-0">Read More</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>)
  );
}

