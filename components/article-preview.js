import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
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

export default function ArticlePreview({
  size = "m",
  title,
  image,
  date = "Jan 13, 2024",
  readTime = "5 min read",
  tags = ["Technology", "AI", "Development"],
  description = "An interesting article about the future of technology and its impact on society...",
  className,
  showPicture = true,
  link,
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
        src={
          image ||
          `https://via.placeholder.com/${imageSize[size].width}x${imageSize[size].height}`
        }
        alt={title}
        width={imageSize[size].width}
        height={imageSize[size].height}
        className={cn("object-cover", {
          "rounded-sm": size !== "xl",
          "w-full": size === "l" || size === "xl",
        })}
        style={size === "xl" ? { objectPosition: "center" } : {}}
      />
    );
    return img;
  };

  const titleClass = cn("font-semibold", {
    "text-sm": size === "xs",
    "text-lg": size === "s",
    "text-xl": size === "m",
    "text-2xl": size === "l",
    "text-3xl": size === "xl",
    "hover:underline": size !== "xs",
  });

  const maxTitleLength = {
    xs: 30,
    s: 50,
    m: 70,
    l: 90,
    xl: 110,
  };

  const renderDescription = () => {
    const maxWords = {
      xs: 0,
      s: 10,
      m: 20,
      l: 30,
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
            <span className="inline-flex items-center text-primary hover:underline">
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
    return { shortDate: date, shortReadTime: readTime };
  };

  const { shortDate, shortReadTime } = formatDateAndTime(date, readTime);

  const content = (
    <>
      {renderImage()}
      <span className={cn(titleClass, "line-clamp-2 block")}>
        {truncateTitle(title, maxTitleLength[size])}
      </span>
      {size !== "xs" && (
        <>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
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
    </>
  );

  return (
    <Link
      href={link}
      className={cn(
        "block transition-colors duration-200 hover:bg-gray-50",
        variants[size],
        className
      )}
    >
      {size === "xs" && content}
      {size === "s" && <div className="p-4">{content}</div>}
      {size === "m" && (
        <div className="p-4 flex items-stretch gap-4">
          <div className="flex-grow space-y-2">{content}</div>
        </div>
      )}
      {size === "l" && (
        <div className="p-6 space-y-4">
          <div className="flex flex-col space-y-4">{content}</div>
        </div>
      )}
      {size === "xl" && (
        <div className="relative group">
          {renderImage()}
          <div className="absolute inset-0 bg-gray-200 bg-opacity-60 group-hover:bg-gray-700 group-hover:bg-opacity-70 transition-colors duration-200 text-black group-hover:text-white p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-white text-black group-hover:bg-gray-200 group-hover:text-gray-800"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-3 text-sm">
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

ArticlePreview.propTypes = {
  size: PropTypes.oneOf(["xs", "s", "m", "l", "xl"]),
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  date: PropTypes.string,
  readTime: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  className: PropTypes.string,
  showPicture: PropTypes.bool,
  link: PropTypes.string.isRequired,
};
