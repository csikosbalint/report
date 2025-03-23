import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Article from "@/components/article";
import { rawArticle, rawArticles } from "@/builders/cms";
import ArticleDTO from "@/builders/models/ArticleDTO";
import AdUnit from "@/components/ad-unit";
import ArticleCard from "@/components/article-card";

export async function generateStaticParams() {
  return await rawArticles()
    .then(({ data }) => data.map((rawArticle) => ({
      articlePath: [
        `${new Date(rawArticle.publishedAt).getFullYear()}`,
        `${new Date(rawArticle.publishedAt).getMonth()}`,
        `${new Date(rawArticle.publishedAt).getDate()}`,
        `${rawArticle.documentId}`,
      ],
    })
    ))
}

/**
 * Retrieves related stories for a given article
 * @param {ArticleDTO} article - The article to find related stories for
 * @returns {Promise<ArticleDTO[]>} A promise that resolves to an array of related articles
 */
async function getRelatedStories(article) {
    const articles = await rawArticles()
      .then(({ data }) => data.map((rawArticle) => new ArticleDTO(rawArticle)
      ))
  return articles
  .filter(art => art.id !== article.id)
  .filter(art => art.tags.find(({label}) => article.tags.some(tag => tag.label === label)))
  .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  .slice(0, 3)
}

export default async function ArticlePage({ params }) {
  const { articlePath } = await params;
  const article = await rawArticle({
    documentId: articlePath[articlePath.length - 1]
  }).then(({ data }) => new ArticleDTO(data));
  const relateds = await getRelatedStories(article);
  return (
    <div>
      <article className="space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {article.title}
          </h1>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                alt={article.author.displayName}
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{article.author.displayName}</p>
              <p className="text-sm text-muted-foreground">
                Internal Analyst
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <time dateTime="2023-12-29">{new Date(article.published).toDateString()}</time>
            <span>•</span>
            <span>10 min read</span>
          </div>
        </header>

        <div>
          <Article article={article}>
            <AdUnit
              adSlot="1392126224"
              adFormat="fluid"
              adLayout="in-article"
              className="text-center"
            />
          </Article>
        </div>
      </article>

      <div className="flex justify-center space-x-4">
        <Button>Share Article</Button>
        <Button variant="outline">Save for Later</Button>
      </div>


      <div className="grid grid-cols-3">
      {relateds.map((related, index) => (
        <ArticleCard key={index} size="l" {...related}/>
      ))}
      </div>
    </div>
  );
}
