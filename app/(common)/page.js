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
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-row h-full w-full">
        <div className="basis-1/3 h-full">
          <div className="flex-col h-full">
            <div className="prose">
              <h3 className="">Legnépszerűbb Írások</h3>
              {/* Top Artciles */}
              <section>
                <div className="flex flex-col gap-8">
                  {mainpage.tops
                    .map((article, index) => (
                      <div className="w-full" key={index}>
                        <ArticleCard size="s" {...article} showPicture={false} />
                        <div className="w-5/6 mx-auto my-1 h-px bg-border" />
                      </div>
                    ))}
                </div>
              </section>
            </div>
            <div className=" h-full">
              AdUnit
            </div>
          </div>
        </div>
        <div className="basis-2/3 h-full">
          <div className="flex-col">
            <div>
              {/* Main Article Card */}
              <section>
                <div className="h-96 w-full">
                  <ArticleCard size="xl" {...mainpage.main} />
                </div>
              </section>
            </div>
            <div>
              {/* Latest Artciles */}
              <section>
                <div className="flex flex-col gap-4">
                  {mainpage.latests
                    .map((article, index) => (
                      <div className="h-36 w-full" key={index}>
                        <ArticleCard size="l" {...article} />
                      </div>
                    ))}
                </div>
              </section>
            </div>
          </div>
          <div className="w-full h-px bg-border" />
        </div>
      </div>
      <div className="">
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
    </div>
  );
}
