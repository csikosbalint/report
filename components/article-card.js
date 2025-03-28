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
    "hover:underline": size !== "xs",
  });

  const maxTitleLength = {
    xs: 30,
    s: 50,
    m: 80,
    l: 80,
    xl: 110,
  };

  const renderDescription = () => {
    const maxWords = {
      xs: 0,
      s: 10,
      m: 20,
      l: 20,
      xl: 40,
    };

    if (size === "xs") return null;

    const words = description.split(" ");
    const isTruncated = words.length > maxWords[size];
    const truncatedDescription = isTruncated
      ? truncateWords(description, maxWords[size] - 1) // Subtract 1 to account for ellipsis
      : description;

    return (
      <div className="text-sm text-muted-foreground">
        <span>{truncatedDescription}</span>
        {isTruncated && (
          <>
            <span>... </span>
            <br />
            <span className="flex justify-end items-center font-semibold hover:underline">
              Read more
            </span>
          </>
        )}
      </div>
    );
  };

  return (
    <Link
      href={link}
      className="block transition-colors duration-200 hover:bg-gray-50 h-full w-full"
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
        <div className="flex-row p-2 gap-4 h-full w-full">
          <div className="w-full">
            <span className={cn(titleClass, "line-clamp-2 block")}>
              {truncateTitle(title, maxTitleLength[size])}
            </span>

            <div className="flex items-center text-xs gap-2">
              <div className="w-full h-3 rounded shrink bg-gray-100" />
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
        </div>
      )}
      {size === "m" && (
        <div className="flex p-2 gap-4 h-full w-full">
          <div className="basis-4/5 flex flex-col">
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map(({ label: tag }) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="w-full space-y-2">
              <span className={cn(titleClass, "line-clamp-2 block")}>
                {truncateTitle(title, maxTitleLength[size])}
              </span>

              <div className="flex items-center text-sm text-muted-foreground gap-2">
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
        <div className="flex p-2 gap-4 h-full w-full">
          <div className="basis-4/5 flex flex-col">
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map(({ label: tag }) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="w-full space-y-2">
              <span className={cn(titleClass, "line-clamp-2 block")}>
                {truncateTitle(title, maxTitleLength[size])}
              </span>

              <div className="flex items-center text-sm text-muted-foreground gap-2">
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
          <div className="basis-1/5 relative group h-full w-1/3 ">
            {renderImage()}
          </div>
        </div>
      )}
      {size === "xl" && (
        <div className="relative group h-full w-full">
          {renderImage()}
          <div className="absolute inset-0 bg-gray-100 bg-opacity-60 group-hover:bg-gray-500 group-hover:bg-opacity-70 transition-colors duration-200 text-black group-hover:text-white p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div></div>
            </div>
            <div>
              <h1 className={cn(titleClass)}>
                {truncateTitle(title, maxTitleLength[size])}
              </h1>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}

