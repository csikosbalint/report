const STRAPI_API_BASE_URL = "http://su8ishee.ddns.net:1337/api";

async function fetchFromStrapiAPI(endpoint, options = {}) {
  const url = `${STRAPI_API_BASE_URL}${endpoint}?populate=*`;
  const { revalidate = 0, tags = [] } = options;

  console.log(`Fetching from Strapi API: ${url}`);
  console.time(`fetch-${endpoint}`);

  const res = await fetch(url, {
    next: {
      revalidate,
      tags,
    },
  });

  const data = await res.json();

  console.timeEnd(`fetch-${endpoint}`);
  return data;
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