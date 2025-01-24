import { Card, CardContent } from "../../components/ui/card";
import ArticlePreview from "@/components/article-preview";
import { parse } from "node-html-parser";
import { decode } from "html-entities";

const fetchPosts = async () => {
  const posts = [];
  await Promise.all(
    process.env.BLOGGERS.split(",").map(async (blogger) => {
      const res = await fetch(
        `https://www.googleapis.com/blogger/v3/blogs/${blogger}/posts?key=${process.env.BLOGGER_API_KEY}`,
        {
          next: {
            revalidate: 5,
            tags: [`${blogger}`, "posts"],
          },
        }
      );
      const data = await res.json();
      posts.push(...data.items);
    })
  );

  return posts;
}

export default async function Home() {
  const posts = await fetchPosts();
  const validTags = ["Lorem", "Ipsum", "alma", "korte"];
  const articles = posts.map((post) => {
    return {
      title: post.title,
      image: "/placeholder.svg?height=500&width=1000",
      description: decode(parse(post.content).querySelector("h3").innerText),
      date: post.published,
      readTime: "5 min read",
      tags: post.labels.filter((label) => validTags.includes(label)),
      link: "/article/breaking-news-major-climate-agreement-reached-at-international-summit",
    };
  });

  return (
    <div className="space-y-12">
      {/* Main Article */}
      <section className="w-[var(--max-width)]">
        <ArticlePreview size="xl" {...articles[0]} />
      </section>
      {/* Featured Article */}
      <section className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <ArticlePreview size="l" {...articles[0]} />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <ArticlePreview
                key={i}
                size="m"
                showPicture={false}
                {...articles[i]}
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
            <ArticlePreview key={i} size="xs" {...articles[i]} />
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-border" />

      {/* In-Depth Analysis */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">In-Depth Analysis</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <ArticlePreview key={i} size="s" {...articles[i]} />
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
              {...articles[i]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
