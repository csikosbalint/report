import Image from "next/image";
import Link from "next/link";
import { cn, formatDate, formatTime, getInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { CircleUserRoundIcon } from "lucide-react";

function truncateWords(str, numWords) {
  const words = str.split(" ");
  if (words.length > numWords) {
    return words.slice(0, numWords).join(" ");
  }
  return str;
}

function truncateTitle(title, maxLength) {
  if (title.length <= maxLength) return title;
  return title.slice(0, maxLength - 1) + "…";
}

export default function ArticleCard({
  size = "m",
  title = "Article Title",
  image = "/placeholder.svg?height=500&width=1000",
  date = "Jan 13, 2024",
  readTime = "5 min read",
  tags = ["Technology", "AI", "Development"],
  description = "An interesting article about the future of technology and its impact on society...",
  showPicture = true,
  link = "/#",
  author
}) {

  const renderImage = () => {
    if (!showPicture) return <div className="hidden" />;
    const img = (
      <Image
        priority
        src={
          image?.formats?.large?.url || "/placeholder.svg?height=500&width=1000"
        }
        fill
        sizes="100%"
        style={{ objectFit: "cover" }}
        alt={image?.alternativeText || title}
      />
    );
    return img;
  };

  const titleClass = cn("font-semibold", {
    "text-sm": size === "xs",
    "text-lg": size === "s",
    "text-xl": size === "m",
    "text-2xl": size === "l",
    "text-5xl": size === "xl",
    "group-hover:underline": size !== "xs",
  });

  const maxTitleLength = {
    xs: 30,
    s: 50,
    m: 80,
    l: 80,
    xl: 110,
  };

  return (
    <Link
      href={link}
      className="block transition-colors duration-200 hover:bg-gray-100 h-full w-full group"
    >
      {size === "xs" && (<>
        <div className="relative h-full w-1/4">
          {renderImage()}
        </div>
        <span className={cn(titleClass, "line-clamp-2 block")}>
          {truncateTitle(title, maxTitleLength[size])}
        </span>
      </>)}
      {size === "s" && (
        <div className="flex flex-col gap-4 min-h-12 py-2 px-1">
          <div className="text-2xl/6 font-semibold capitalize group-hover:underline">
            {truncateTitle(title, maxTitleLength[size])}
          </div>
          <div className="flex items-center text-xs gap-2">
            <div className="shrink w-full mt-1 mr-8 h-2 bg-primary/80" />
            <div className="flex items-center gap-1 w-fit">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div className="w-fit text-nowrap">{formatDate(date, size)}</div>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 w-fit">
              <Clock className="w-4 h-4 text-muted-foreground" />
              {formatTime(readTime, size)}
            </div>
          </div>
        </div>
      )}
      {size === "m" && (
        <div className="flex gap-4 h-full w-full py-2 px-1">
          <div className="basis-4/5 flex flex-col justify-around">

            <div className="w-full space-y-2">
              <span className={cn(titleClass, "line-clamp-2")}>
                {truncateTitle(title, maxTitleLength[size])}
              </span>

              <div className="flex items-center text-sm text-muted-foreground gap-2">
                <div className="shrink w-full mt-1 mr-4 h-2 bg-primary/80" />
                <CircleUserRoundIcon className="w-4 h-4" /><div className="w-fit text-nowrap">{getInitials(author?.name)}</div>
                <span className="text-muted-foreground">•</span>
                <time className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <div className="w-fit text-nowrap">{formatDate(date, size)}</div>
                </time>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <div className="w-fit text-nowrap">{formatTime(readTime, size)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-1/5 relative group h-full w-1/3 ">
            {renderImage()}
          </div>
        </div>
      )}
      {size === "l" && (
        <div className="flex gap-4 h-full w-full pl-1">
          <div className="basis-4/5 flex flex-col pt-1">
            <div className="flex flex-col gap-1 justify-around h-full">
              <span className={cn(titleClass, "line-clamp-2")}>
                {truncateTitle(title, maxTitleLength[size])}
              </span>
              <div className="line-clamp-2">
                {description}
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground gap-2">
                <div>
                  <div className="flex flex-wrap gap-2 ">
                    {tags.map(({ label: tag }) => (
                      <Badge key={tag}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CircleUserRoundIcon className="w-5 h-5" /><div className="w-fit text-nowrap">{author?.name}</div>
                  <span>•</span>
                  <time className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <div className="w-fit text-nowrap">{formatDate(date, size)}</div>
                  </time>

                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <div className="w-fit text-nowrap">{formatTime(readTime, size)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-1/5 relative h-full w-1/3 ">
            {renderImage()}
          </div>
        </div>
      )}
      {size === "xl" && (
        <div className="relative group h-full w-full">
          {renderImage()}
          <div className="absolute inset-0 bg-gray-100/10 group-hover:bg-gray-300/30 group-hover:bg-opacity-70 transition-colors duration-200 text-white hover:underline flex flex-col justify-end">
            <div className={cn(titleClass) + " px-6 pb-2 capitalize"}>
              {truncateTitle(title, maxTitleLength[size])}
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}

