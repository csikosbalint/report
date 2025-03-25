import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Article from "@/components/article";
import { rawArticle, rawArticles } from "@/builders/cms";
import ArticleDTO from "@/builders/models/ArticleDTO";
import AdUnit from "@/components/ad-unit";
import ArticleCard from "@/components/article-card";
import { formatDate, formatTime, getInitials } from "@/lib/utils";

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
    .filter(art => art.tags.find(({ label }) => article.tags.some(tag => tag.label === label)))
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
                alt={article.author.name}
                src={article.author.avatar?.formats?.thumbnail?.url}
              />
              <AvatarFallback>{getInitials(article.author.name)}</AvatarFallback>
            </Avatar>
            <div className="w-1/2">
              <div className="flex flex-row gap-2 text-xl font-semibold">
                <p>{article.author.name}</p>
                <span className="text-muted-foreground">•</span>
                <p className="text-muted-foreground font-medium">{article.author.role}</p>
              </div>
              <div className="flex gap-2 text-sm">
                <time dateTime="2023-12-29">{formatDate(article.publishedAt)}</time>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{formatTime(article.readTime)}</span>
              </div>

            </div>
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
          <ArticleCard key={index} size="l" {...related} />
        ))}
      </div>
    </div>
  );
}
