// export const revalidate = 0

import ArticleCard from "@/components/article-card";
import { rawArticles, rawMainPage } from "@/builders/cms";
import ArticleDTO from "@/builders/models/ArticleDTO";
import MainPageDTO from "@/builders/models/MainPageDTO";
import { Badge } from "@/components/ui/badge";
import AdUnit from "@/components/ad-unit";
import { Suspense } from "react";

export default async function Home() {
  const articles = await rawArticles()
    .then(({ data }) => data.map((rawArticle) => new ArticleDTO(rawArticle)
    ))
  const mainpage = await rawMainPage()
    .then(({ data: rawMainPage }) => new MainPageDTO(rawMainPage)
    )

  const assumedTag = 'Europa'

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-row h-full w-full">
        <div className="basis-1/3 h-full">
          <div className="flex flex-col h-full">
            {/* <div>
              <h2 className="text-2xl underline font-bold tracking-tight">Legfrissebb Írások</h2>
              <section className="min-h-96">
                <div className="flex flex-col">
                  {mainpage.latests
                    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
                    .slice(0, 4)
                    .map((article, index) => (
                      <div className="w-full" key={index}>
                        <ArticleCard size="s" {...article} showPicture={false} />
                        <div className="w-5/6 mx-auto my-1 h-px bg-border" />
                      </div>
                    ))}
                </div>
              </section>
            </div> */}
            <div className="w-full flex-grow h-full bg-rose-400">
              <Suspense fallback={<div className="h-full w-full" />}>
              <AdUnit>
                <ins className="adsbygoogle h-full w-full"
                  style={{ display: "block" }}
                  data-ad-client="ca-pub-8712767354684493"
                  data-ad-slot="8626650819"
                  data-ad-format="vertical"
                  data-full-width-responsive="true">
                  </ins>
              </AdUnit>
              </Suspense>
            </div>
            <div className="w-full flex-grow h-full bg-rose-50">
              <Suspense fallback={<div className="h-full w-full" />}>
              <AdUnit>
                <ins className="adsbygoogle h-full w-full"
                  style={{ display: "block" }}
                  data-ad-client="ca-pub-8712767354684493"
                  data-ad-slot="8606932535"
                  data-ad-format="vertical"
                  data-full-width-responsive="true">
                  </ins>
              </AdUnit>
              </Suspense>
            </div>
          </div>
        </div>
        <div className="basis-2/3 h-full">
          <div className="flex-col">
            <div>
              {/* Main Article Card */}
              <section className="min-h-96">
                <div className="">
                  <div className="h-96 w-full">
                    <ArticleCard size="xl" {...mainpage.main} />
                  </div>
                </div>
              </section>
            </div>
            <div>
              {/* Latest Artciles */}
              <section className="min-h-96">
                <div className="flex flex-col">
                  {mainpage.tops
                    .slice(0, 5)
                    .map((article, index) => (
                      <div className="h-36 w-full" key={index}>
                        <ArticleCard size="l" {...article} />
                      </div>
                    ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-border" />
      <div className="">
        {/* Tag Artciles */}
        <section className="space-y-6">
          <h2 className="text-2xl underline font-bold tracking-tight">Minden, ami <Badge variant='outline' size='large'>#{assumedTag}</Badge></h2>
          <div className="grid lg:grid-cols-3">
            {articles
              .filter((article) => article.tags.find(({ label }) => label === assumedTag))
              .slice(0, 6)
              .map((article, index) => (
                <ArticleCard key={index} size="l" {...article} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
