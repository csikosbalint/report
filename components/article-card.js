import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

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
  className,
  showPicture = true,
  link = "/#",
}) {
  const variants = {
    xs: "flex items-center gap-3 p-2",
    s: "max-w-[280px]",
    m: "max-w-[600px]",
    l: "max-w-[800px]",
    xl: "max-w-[1000px]",
  };

  const imageSize = {
    xs: { width: 60, height: 60 },
    s: { width: 280, height: 160 },
    m: { width: 200, height: 134 },
    l: { width: 800, height: 400 },
    xl: { width: 1000, height: 500 },
  };

  const renderImage = () => {
    if (!showPicture) return <div className="hidden" />;
    const img = (
      <Image
        priority
        src={
          image?.formats?.large?.url || "/placeholder.svg?height=500&width=1000"
        }
        fill
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
    m: 70,
    l: 80,
    xl: 110,
  };

  const renderDescription = () => {
    const maxWords = {
      xs: 0,
      s: 10,
      m: 15,
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

  const formatDateAndTime = (date, readTime) => {
    if (size === "xs" || size === "s") {
      const shortDate = new Date(date).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
      const shortReadTime = readTime.replace(" read", "");
      return { shortDate, shortReadTime };
    }
    return {
      shortDate: new Date(date).toLocaleDateString(),
      shortReadTime: readTime,
    };
  };

  const { shortDate, shortReadTime } = formatDateAndTime(date, readTime);

  const content = (
    <div className="w-full">
      <span className={cn(titleClass, "line-clamp-2 block")}>
        {truncateTitle(title, maxTitleLength[size])}
      </span>
      {size !== "xs" && (
        <>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map(({ label: tag }) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center text-sm text-muted-foreground gap-3">
            <time className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {shortDate}
            </time>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {shortReadTime}
            </div>
          </div>
          {renderDescription()}
        </>
      )}
    </div>
  );

  return (
    <Link
      href={link}
      className={cn(
        "block transition-colors duration-200 hover:bg-gray-50 h-full w-full",
        variants[size],
        className
      )}
    >
      {size === "xs" && (<>
        <div className="relative h-full w-1/4">
          {renderImage()}
        </div>
        <span className={cn(titleClass, "line-clamp-2 block")}>
          {truncateTitle(title, maxTitleLength[size])}
        </span>
        {size !== "xs" && (
          <>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map(({ label: tag }) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-3">
              <time className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {shortDate}
              </time>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {shortReadTime}
              </div>
            </div>
            {renderDescription()}
          </>
        )}
      </>)}
      {size === "s" && (
        <div className="flex-row p-2 gap-4 h-full w-full">
          <div className="w-full">
            <span className={cn(titleClass, "line-clamp-2 block")}>
              {truncateTitle(title, maxTitleLength[size])}
            </span>

            <div className="flex items-center text-sm text-muted-foreground gap-3">
              <time className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {shortDate}
              </time>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {shortReadTime}
              </div>
            </div>
          </div>
        </div>
      )}
      {size === "m" && (
        <div className="p-4 flex items-stretch gap-4">
          <div className="flex-grow space-y-2">{content}</div>
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

              <div className="flex items-center text-sm text-muted-foreground gap-3">
                <time className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {shortDate}
                </time>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {shortReadTime}
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
          <div className="absolute inset-0 bg-gray-200 bg-opacity-60 group-hover:bg-gray-500 group-hover:bg-opacity-70 transition-colors duration-200 text-black group-hover:text-white p-6 flex flex-col justify-between">
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

