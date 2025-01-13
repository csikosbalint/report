import Image from "next/image";
import { Card, CardContent } from "../../components/ui/card";
import Link from "next/link";
import ArticlePreview from "@/components/article-preview";

export default function Home() {
  const sampleArticle = {
    title:
      "Breaking News: Major Climate Agreement Reached at International Summit",
    image: "/placeholder.svg?height=500&width=1000",
    description:
      "Exploring how AI is revolutionizing the way we build and interact with web applications, from automated testing to intelligent user interfaces.",
    date: "Jan 13, 2024",
    readTime: "5 min read",
    tags: ["Technology", "AI", "Development"],
    link: "/article/breaking-news-major-climate-agreement-reached-at-international-summit",
  };
  return (
    <div className="space-y-12">
      {/* Featured Article */}
      <section className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <ArticlePreview size="l" {...sampleArticle} />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <ArticlePreview
                key={i}
                size="m"
                showPicture={false}
                {...sampleArticle}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-border" />

      {/* Latest News Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Latest News</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ArticlePreview key={i} size="xs" {...sampleArticle} />
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-border" />

      {/* In-Depth Analysis */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">In-Depth Analysis</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <ArticlePreview key={i} size="s" {...sampleArticle} />
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-border" />

      {/* Opinion Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Opinion</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-muted" />
                  <div>
                    <h4 className="font-semibold">Opinion Writer</h4>
                    <p className="text-sm text-muted-foreground">
                      Contributing Editor
                    </p>
                  </div>
                </div>
                <h3 className="text-lg font-bold">
                  The Future of Urban Development
                </h3>
                <p className="text-muted-foreground">
                  Exploring the challenges and opportunities in modern city
                  planning...
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-border" />

      {/* Regional News */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Regional News</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <ArticlePreview
              key={i}
              size="s"
              showPicture={false}
              {...sampleArticle}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
