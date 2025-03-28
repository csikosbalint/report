import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Article from "@/components/article";
import { rawArticle, rawArticles } from "@/builders/cms";
import ArticleDTO from "@/builders/models/ArticleDTO";
import AdUnit from "@/components/ad-unit";
import ArticleCard from "@/components/article-card";
import { formatDate, formatTime, getInitials } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { Clock } from "lucide-react";

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
    <div className="border-r border-primary pr-4">
      <article className="space-y-8 p-4">
        <header>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {article.title}
          </h1>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                alt={article.author?.name}
                src={article.author?.avatar.formats.thumbnail.url}
              />
              <AvatarFallback>{getInitials(article.author?.name)}</AvatarFallback>
            </Avatar>
            <div className="w-1/2">
              <div className="flex flex-row gap-2">
                <div className="text-2xl font-semibold">{article.author?.name}</div>
                <span className="text-2xl text-muted-foreground">•</span>
                <p className="text-lg/8 text-muted-foreground font-medium">{article.author?.role}</p>
              </div>
              <div className="flex gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <div>{formatDate(article.date)}</div>
                </div>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(article.readTime)}</span>
                </div>
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
        <div className="flex justify-center">
          <Button>Share Article</Button>
          <Button variant="outline">Save for Later</Button>
        </div>
      </article>

      <div className="grid grid-cols-3 border-t border-primary p-4">
        {relateds.map((related, index) => (
          <ArticleCard key={index} size="l" {...related} />
        ))}
      </div>
    </div>
  );
}
