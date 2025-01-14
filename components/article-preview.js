import Image from "next/image"
import Link from "next/link"
import PropTypes from 'prop-types'
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from 'lucide-react';

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
  }

  const imageSize = {
    xs: { width: 60, height: 60 },
    s: { width: 280, height: 160 },
    m: { width: 200, height: 134 },
    l: { width: 800, height: 400 },
    xl: { width: 1000, height: 500 },
  }

  const renderImage = () => {
    if (!showPicture) return <div className="hidden" />;
    return (
      (<Image
        src={image}
        alt={title}
        width={imageSize[size].width}
        height={imageSize[size].height}
        className={cn("object-cover", {
          "rounded-sm": size !== "xl",
          "w-full": size === "l" || size === "xl"
        })} />)
    );
  }

  const commonLinkProps = {
    href: link,
    className: cn(
      "block transition-colors duration-200",
      size !== "xs" && "group hover:bg-gray-50",
      className
    ),
  };

  const titleClass = cn("font-semibold", {
    "text-sm": size === "xs",
    "text-lg": size === "s",
    "text-xl": size === "m",
    "text-2xl": size === "l",
    "text-3xl": size === "xl",
    "group-hover:underline": size !== "xs",
  });

  if (size === "xs") {
    return (
      (<Link
        {...commonLinkProps}
        className={cn(commonLinkProps.className, variants.xs, "bg-gray-50")}>
        {renderImage()}
        <h3 className={cn(titleClass, "line-clamp-2")}>{title}</h3>
      </Link>)
    );
  }

  if (size === "s") {
    return (
      (<Link
        {...commonLinkProps}
        className={cn(commonLinkProps.className, variants.s)}>
        <div className="p-4">
          {renderImage()}
          <h3 className={cn(titleClass, "mb-2 mt-3 line-clamp-2")}>{title}</h3>
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
              {date}
            </time>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {readTime}
            </div>
          </div>
        </div>
      </Link>)
    );
  }

  if (size === "m") {
    return (
      (<Link
        {...commonLinkProps}
        className={cn(commonLinkProps.className, variants.m)}>
        <div className="p-4 flex items-stretch gap-4">
          <div className="flex-grow space-y-2">
            <h3 className={cn(titleClass, "line-clamp-2")}>{title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-3">
              <time className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {date}
              </time>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {readTime}
              </div>
            </div>
          </div>
          <div
            className={cn({
              "w-[200px] flex-shrink-0": showPicture
            })}>
            {renderImage()}
          </div>
        </div>
      </Link>)
    );
  }

  if (size === "l") {
    return (
      (<Link
        {...commonLinkProps}
        className={cn(commonLinkProps.className, variants.l)}>
        <div className="p-6 space-y-4">
          {renderImage()}
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <time className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {date}
                </time>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {readTime}
                </div>
              </div>
            </div>
            <h2 className={titleClass}>{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </Link>)
    );
  }

  // XL size
  return (
    (<Link
      {...commonLinkProps}
      className={cn(commonLinkProps.className, variants.xl)}>
      <div className="relative">
        {renderImage()}
        <div
          className="absolute inset-0 bg-black bg-opacity-60 text-white p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white text-black">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-3 text-sm">
              <time className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {date}
              </time>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {readTime}
              </div>
            </div>
          </div>
          <div>
            <h1 className={cn(titleClass, "mb-4")}>{title}</h1>
            <p className="text-lg">{description}</p>
          </div>
        </div>
      </div>
    </Link>)
  );
}

ArticlePreview.propTypes = {
  size: PropTypes.oneOf(["xs", "s", "m", "l", "xl"]),
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  date: PropTypes.string,
  readTime: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  className: PropTypes.string,
  showPicture: PropTypes.bool,
  link: PropTypes.string.isRequired,
}

