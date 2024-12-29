import { NextResponse } from 'next/server'

export async function GET() {
  // In a real application, this data would come from a database or external API
  const relatedStories = [
    {
      title: "Climate Change Impact on Global Ecosystems",
      excerpt: "New research reveals the far-reaching consequences of climate change on biodiversity and ecosystem stability...",
      imageSrc: "/placeholder.svg?height=200&width=400&text=Related+Story+1"
    },
    {
      title: "Renewable Energy Breakthroughs",
      excerpt: "Scientists announce major advancements in solar and wind technologies, promising more efficient and affordable clean energy...",
      imageSrc: "/placeholder.svg?height=200&width=400&text=Related+Story+2"
    },
    {
      title: "Global Efforts to Reduce Plastic Pollution",
      excerpt: "Countries worldwide implement innovative strategies to tackle the growing crisis of plastic waste in oceans...",
      imageSrc: "/placeholder.svg?height=200&width=400&text=Related+Story+3"
    }
  ];

  return NextResponse.json(relatedStories)
}

