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
      <div className="flex flex-row h-fit w-full pb-4">
        <div className="hidden sm:flex sm:basis-1/3 h-full w-full pr-4">
          <div className="flex flex-col justify-between h-full gap-8">
            <div className="flex flex-col gap-4 h-fit">
              {/* Latest Articles */}
              <div className="text-4xl/10 capitalize font-extrabold px-1">A ma gondolatai</div>
              <section className="min-h-96">
                <div className="flex flex-col gap-1">
                  {mainpage.latests
                    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
                    .slice(0, 5)
                    .map((article, index) => (
                      <div className="w-full border-b border-gray-200 pb-1" key={index}>
                        <ArticleCard size="s" {...article} showPicture={false} />
                      </div>
                    ))}
                </div>
              </section>
            </div>
            <div className="w-full h-fit pl-4">
              <AdUnit adSlot="8606932535" adFormat="vertical" />
            </div>
          </div>
        </div>
        <div className="sm:basis-2/3 h-full">
          <div className="flex flex-col border-x border-primary sm:px-4 gap-8">
            {/* Main Article Card */}
            <section className="min-h-96">
              <div className="h-96 w-full">
                <ArticleCard size="xl" {...mainpage.main} />
              </div>
            </section>
            {/* Tops Artciles */}
            <section className="min-h-96">
              <div className="flex flex-col gap-8">
                {mainpage.tops
                  .slice(0, 4)
                  .map((article, index) => (<div key={index}>
                    <div className="h-36 w-full">
                      <ArticleCard size="l" {...article} />
                    </div>
                    {index % 4 === 1 ? (
                      <div className="h-48 w-full pt-4">
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
        <section className="flex flex-col gap-4 min-h-48">
          <div className="hidden md:flex gap-2 p-4">
            {assumedTags.map((tag, index) => <Badge key={index} variant='outline' size='large'>{tag}</Badge>)}
          </div>
          <div className="flex md:hidden gap-2 p-4">
            {assumedTags.map((tag, index) => <Badge key={index} variant='outline' size='default'>{tag}</Badge>)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {articles
              .filter((article) => article.tags.find(({ label }) => assumedTags.includes(label)))
              .slice(0, 9)
              .map((article, index) => (
                <div className="h-40 w-full" key={index}>
                  <ArticleCard size="m" {...article} />
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
