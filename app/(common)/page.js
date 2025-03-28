// export const revalidate = 0

import ArticleCard from "@/components/article-card";
import { rawArticles, rawMainPage } from "@/builders/cms";
import ArticleDTO from "@/builders/models/ArticleDTO";
import MainPageDTO from "@/builders/models/MainPageDTO";
import { Badge } from "@/components/ui/badge";
import AdUnit from "@/components/ad-unit";

export default async function Home() {
  const articles = await rawArticles()
    .then(({ data }) => data.map((rawArticle) => new ArticleDTO(rawArticle)
    ))
  const mainpage = await rawMainPage()
    .then(({ data: rawMainPage }) => new MainPageDTO(rawMainPage)
    )

  const assumedTags = ['Europa', 'Világ', 'Magyarország']

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-row h-full w-full pb-4">
        <div className="basis-1/3 h-full pr-4">
          <div className="flex flex-col h-full">
            <div>
              <section className="min-h-96">
                <div className="flex flex-col">
                  {mainpage.latests
                    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
                    .slice(0, 4)
                    .map((article, index) => (
                      <div className="w-full" key={index}>
                        <ArticleCard size="s" {...article} showPicture={false} />
                      </div>
                    ))}
                </div>
              </section>
            </div>
            <div className="w-full flex-grow h-full">
              <AdUnit adSlot="8606932535" adFormat="vertical" />
            </div>
          </div>
        </div>
        <div className="basis-2/3 h-full">
          <div className="flex-col border-x border-primary px-4">
            {/* Main Article Card */}
            <section className="min-h-96">
              <div className="">
                <div className="h-96 w-full">
                  <ArticleCard size="xl" {...mainpage.main} />
                </div>
              </div>
            </section>
            {/* Latest Artciles */}
            <section className="min-h-96">
              <div className="flex flex-col">
                {mainpage.tops
                  .slice(0, 4)
                  .map((article, index) => (<div key={index}>
                    <div className="h-36 w-full">
                      <ArticleCard size="l" {...article} />
                    </div>
                    {index % 3 === 1 ? (
                      <div className="h-48 w-full">
                        <AdUnit adSlot="4289752306" adFormat="fluid" adLayoutKey="-ff+6a-x-eh+tr" />
                      </div>
                    ) : null}
                  </div>
                  ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="border-t border-primary py-4">
        <section className="min-h-48">
          <div className="flex gap-2">
            {assumedTags.map((tag, index) => <Badge key={index} variant='outline' size='large'>{tag}</Badge>)}
          </div>
          <div className="grid lg:grid-cols-2">
            {articles
              .filter((article) => article.tags.find(({ label }) => assumedTags.includes(label)))
              .slice(0, 6)
              .map((article, index) => (
                <ArticleCard key={index} size="m" {...article} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
