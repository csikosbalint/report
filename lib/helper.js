import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const BLOGGER_API_BASE_URL = "https://www.googleapis.com/blogger/v3/blogs";

// Configure AWS SDK with credentials
const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});
const docClient = DynamoDBDocumentClient.from(dynamoClient);

async function fetchFromBloggerAPI(endpoint, options = {}) {
  const url = `${BLOGGER_API_BASE_URL}${endpoint}?key=${process.env.BLOGGER_API_KEY}`;
  const { revalidate = 5, tags = [] } = options;

  console.log(`Fetching from Blogger API: ${url}`);
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

async function fetchMetadataFromDynamoDB(blogId, postId) {
  const command = new GetCommand({
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Key: {
      blogId: blogId,
      postId: postId,
    },
  });

  try {
    const response = await docClient.send(command);
    return response.Item;
  } catch (error) {
    console.error(`Error fetching metadata from DynamoDB: ${error}`);
    return null;
  }
}

async function mergePostWithMetadata(post, metadata) {
  if (!metadata) return post;
  return { ...post, ...metadata };
}

export async function fetchPosts() {
  console.log("Fetching posts...");
  console.time("fetchPosts");

  const bloggers = process.env.BLOGGERS?.split(",") || [];
  const postsPromises = bloggers.map((blogger) =>
    fetchFromBloggerAPI(`/${blogger}/posts`, { tags: [blogger, "posts"] })
  );

  const postsData = await Promise.all(postsPromises);
  const posts = await Promise.all(
    postsData.flatMap((data) =>
      (data.items || []).map(async (post) => {
        const metadata = await fetchMetadataFromDynamoDB(post.blog.id, post.id);
        return mergePostWithMetadata(post, metadata);
      })
    )
  );

  console.log(`Fetched and merged ${posts.length} posts.`);
  console.timeEnd("fetchPosts");

  return posts;
}

export async function fetchPost({ blogId, postId }) {
  const [post, metadata] = await Promise.all([
    fetchFromBloggerAPI(`/${blogId}/posts/${postId}`, {
      tags: [blogId, postId, "post"],
    }),
    fetchMetadataFromDynamoDB(blogId, postId),
  ]);

  return mergePostWithMetadata(post, metadata);
}
