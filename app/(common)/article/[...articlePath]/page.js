import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SectionArticleRelated } from "@/components/section-article-related";
import { fetchPost, fetchPosts } from "@/lib/helper";
import { decode } from "html-entities";
import parse from "node-html-parser";

export async function generateStaticParams() {
  const articles = await fetchPosts();
  return articles.map((post) => ({
    articlePath: [
      `${new Date(post.published).getFullYear()}`,
      `${new Date(post.published).getMonth()}`,
      `${new Date(post.published).getDate()}`,
      `${post.blog.id}-${post.id}`,
    ],
  }));
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
  const article = await fetchPost({
    blogId: articlePath[articlePath.length - 1].split("-")[0],
    postId: articlePath[articlePath.length - 1].split("-")[1],
  });
  const relatedStories = await getRelatedStories(article);
  const description = parse(article.content).querySelector("h3").innerText;
  const content = parse(article.content).querySelectorAll(':not(h3)').join("");
  return (
    <div>
      <article className="space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {article.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {description}
          </p>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="John Doe"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-muted-foreground">
                Environmental Correspondent
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <time dateTime="2023-12-29">December 29, 2023</time>
            <span>•</span>
            <span>10 min read</span>
          </div>
        </header>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: decode(content ) }}
        ></div>
      </article>

      <div className="flex justify-center space-x-4">
        <Button>Share Article</Button>
        <Button variant="outline">Save for Later</Button>
      </div>

      <SectionArticleRelated stories={relatedStories} />
    </div>
  );
}
