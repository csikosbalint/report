import { Plus, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export async function TagsSection() {
  const tags = [
    "Israel-Hamas Conflict",
    "European Politics",
    "Newspaper Front Pages",
    "European Economy",
    "Russia Politics",
    "UK Politics",
    "Christmas",
    "New Year",
    "Crime",
    "Vladimir Putin",
  ];

  return (
    <div className="w-full sticky top-16 z-10 bg-background border-b">
      <div className="max-w-[var(--max-width-total)] mx-auto">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4 py-2 p-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <TrendingUp className="h-4 w-4" />
              <span className="sr-only">Trending</span>
            </Button>
            {tags.map((tag) => (
              <Button
                key={tag}
                variant="outline"
                size="sm"
                className="rounded-full flex items-center"
              >
                <span className="mr-1">{tag}</span>
                <Plus className="h-4 w-4" />
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
