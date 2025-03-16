import { Card, CardContent } from "../../components/ui/card";
import ArticleCard from "@/components/article-card";
import { rawArticles, rawMainPage } from "@/builders/cms";
import ArticleDTO from "@/builders/models/ArticleDTO";
import MainPageDTO from "@/builders/models/MainPageDTO";

export default async function Home() {
  const articles = await rawArticles()
    .then(({ data }) => data.map((rawArticle) => new ArticleDTO(rawArticle)
    ))
    const mainpage = await rawMainPage()
    .then(({ data: rawMainPage }) => new MainPageDTO(rawMainPage)
    )
    
  return (
    <div className="space-y-12 w-[var(--max-width)]">
      {/* Main Article Card */}
      <section>
          <div className="h-96 w-full">
            <ArticleCard size="xl" {...mainpage.main} />
          </div>
      </section>
      {/* Featured Article */}
      {/* <section className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            {articles
              .map((article, index) => (
                <ArticleCard
                  key={index}
                  size="m"
                  showPicture={false}
                  {...article}
                />
              ))}
          </div>
        </div>
      </section> */}
      {/* Latest Artciles */}
      <section>
        <div className="flex flex-col h-fit w-full gap-4">
          {mainpage.latests
            .sort((a, b) => b.publishedAt - a.publishedAt)
            .map((article, index) => (
              <div className="h-36 w-full" key={index}>
                <ArticleCard size="l" {...article} />
              </div>
            ))}
        </div>
      </section>

      {/* In-Depth Analysis */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">In-Depth Analysis</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {articles
            .map((article, index) => (
              <ArticleCard key={index} size="s" {...article} />
            ))}
        </div>
      </section>

      <div className="w-full h-px bg-border" />

      {/* Opinion Section */}
      {/* <section className="space-y-6">
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
      </section> */}

      <div className="w-full h-px bg-border" />

      {/* Regional News */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Regional News</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {articles
            .map((article, index) => (
              <ArticleCard
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
