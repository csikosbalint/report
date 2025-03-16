import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SectionArticleRelated } from "@/components/section-article-related";
import Article from "@/components/article";
import { rawArticle, rawArticles } from "@/builders/cms";
import ArticleDTO from "@/builders/models/ArticleDTO";

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

async function getRelatedStories(refArticle) {
  return [
    {
      title: "Climate Change Impact on Global Ecosystems",
      excerpt:
        "New research reveals the far-reaching consequences of climate change on biodiversity and ecosystem stability...",
      imageSrc: "/placeholder.svg?height=200&width=400&text=Related+Story+1",
    },
    {
      title: "Renewable Energy Breakthroughs",
      excerpt:
        "Scientists announce major advancements in solar and wind technologies, promising more efficient and affordable clean energy...",
      imageSrc: "/placeholder.svg?height=200&width=400&text=Related+Story+2",
    },
    {
      title: "Global Efforts to Reduce Plastic Pollution",
      excerpt:
        "Countries worldwide implement innovative strategies to tackle the growing crisis of plastic waste in oceans...",
      imageSrc: "/placeholder.svg?height=200&width=400&text=Related+Story+3",
    },
  ];
}

export default async function ArticlePage({ params }) {
  const { articlePath } = await params;
  const article = await rawArticle({
    documentId: articlePath[articlePath.length - 1]
  }).then(({ data }) => new ArticleDTO(data));
  const relatedStories = await getRelatedStories(article);
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
          <Article content={article?.content} />
        </div>
      </article>

      <div className="flex justify-center space-x-4">
        <Button>Share Article</Button>
        <Button variant="outline">Save for Later</Button>
      </div>

      <SectionArticleRelated stories={relatedStories} />
    </div>
  );
}
