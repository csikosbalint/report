const STRAPI_API_BASE_URL = process.env.STRAPI_API_URL;

async function fetchFromStrapiAPI(endpoint, options = {}) {
  const url = `${STRAPI_API_BASE_URL}${endpoint}?populate=*`;
  const { revalidate = 0, tags = [] } = options;
  console.log(`Fetching from Strapi API: ${url}`);

  try {
    const res = await fetch(url, {
      next: {
        revalidate,
        tags,
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(5000)
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error);
    // Return empty data structure instead of throwing
    return { data: [] };
  }
}

export async function fetchPosts() {
  console.log("Fetching posts...");

  const data = await fetchFromStrapiAPI("/articles", {
    tags: ["articles"],
  });

  const posts = data.data.map(article => ({
    id: article.documentId,
    title: article.Title,
    content: article.Article,
    desciption: article.Description,
    published: article.publishedAt,
    author: {
      displayName: article.Author?.data?.attributes?.name || "Anonymous"
    },
    labels: article.Tags?.data?.map(tag => tag.attributes.name) || []
  }));

  console.log(`Fetched ${posts.length} posts.`);

  return posts;
}

export async function fetchPost({ documentId }) {
  const data = await fetchFromStrapiAPI(`/articles/${documentId}`, {
    tags: ["article", documentId],
  });

  const article = data.data;
  return {
    id: article.id,
    title: article.Title,
    content: article.Article,
    published: article.publishedAt,
    author: {
      displayName: article.Author?.data?.attributes?.name || "Anonymous"
    },
    labels: article.Tags?.data?.map(tag => tag.attributes.name) || []
  };
}