import { Card, CardContent } from "../../components/ui/card";
import ArticlePreview from "@/components/article-preview";
import { parse } from "node-html-parser";
import { decode } from "html-entities";
import UrlSafeString from "url-safe-string";
import { fetchPosts } from "@/builders/post";
import { validTags } from "@/builders/tag";
import { LABEL_FEATURED, LABEL_INDEPTH, LABEL_LATEST, LABEL_MAIN, LABEL_REGION_EUROPE, LABEL_REGION_EUROPE_HUNGARY } from "@/builders/label";

export default async function Home() {
  const posts = await fetchPosts();
  const articles = posts.map((post) => {
    const subtitle = decode(parse(post.content).querySelector("h1")?.innerText);
    const description = decode(
      parse(post.content).querySelector("h3")?.innerText
    );
    const mainImage = decode(
      parse(post.content).querySelector("img")?.getAttribute("src")
    );
    console.log(parse(post.content).querySelector("img")?.getAttribute("src"));
    return {
      title: post.title,
      image: mainImage || "/placeholder.svg?height=500&width=1000",
      description,
      date: post.published,
      readTime: "5 min read",
      labels: post.labels,
      tags: post.labels.filter((label) => validTags.includes(label)),
      link: `/article/${new Date(post.published).getFullYear()}/${new Date(post.published).getMonth()}/${new Date(post.published).getDate()}/${new UrlSafeString().generate(post.title)}/${post.blog.id}-${post.id}`,
    };
  });

  return (
    <div className="space-y-12">
      {/* Main Article */}
      <section className="w-[var(--max-width)]">
        {articles.find((article) => article.labels.includes(LABEL_MAIN)) &&
          [articles.find((article) => article.labels.includes(LABEL_MAIN))].map(
            (article, index) => (
              <ArticlePreview key={index} size="xl" {...article} />
            )
          )}
      </section>
      {/* Featured Article */}
      <section className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            {articles
              .filter((article) => article.labels.includes(LABEL_FEATURED))
              .map((article, index) => (
                <ArticlePreview
                  key={index}
                  size="m"
                  showPicture={false}
                  {...article}
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
          {articles
            .sort((a, b) => new Date(b.published) - new Date(a.published))
            .map((article, index) => (
              <ArticlePreview key={index} size="xs" {...article} />
            ))}
        </div>
      </section>

      <div className="w-full h-px bg-border" />

      {/* In-Depth Analysis */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">In-Depth Analysis</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {articles
            .filter((article) => article.labels.includes(LABEL_INDEPTH))
            .map((article, index) => (
              <ArticlePreview key={index} size="s" {...article} />
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
          {articles
            .filter(
              (article) =>
                article.labels.includes(LABEL_REGION_EUROPE) ||
                article.labels.includes(LABEL_REGION_EUROPE_HUNGARY)
            )
            .map((article, index) => (
              <ArticlePreview
                key={index}
                size="s"
                showPicture={false}
                {...article}
              />
            ))}
        </div>
      </section>
    </div>
  );
}
