import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const BLOGGER_API_BASE_URL = "https://www.googleapis.com/blogger/v3/blogs";
const LABEL_SYNC = "sync-to-dynamodb"; // Define the special sync label
const LABEL_PUBLISHED = "published";
// Configure AWS SDK with credentials
const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const docClient = DynamoDBDocumentClient.from(dynamoClient);

async function fetchFromBloggerAPI(endpoint, options = {}) {
  const url = `${BLOGGER_API_BASE_URL}${endpoint}?key=${process.env.BLOGGER_API_KEY}`;
  const { revalidate = 5, tags = [] } = options;

  console.log(`Fetching from Blogger API: ${url}`);

  const res = await fetch(url, {
    next: {
      revalidate,
      tags,
    },
  });

  const data = await res.json();

  return data;
}

async function getMetadataFromDynamoDB(blogId, postId) {
  const getCommand = new GetCommand({
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Key: {
      blogid: blogId.toLowerCase(), // Use lowercase for primary key
      postid: postId.toLowerCase(), // Use lowercase for sort key
    },
  });

  try {
    const response = await docClient.send(getCommand);
    return response.Item;
  } catch (error) {
    console.error(`Error fetching metadata from DynamoDB: ${error}`);
    return null;
  }
}

async function createMetadataInDynamoDB(blogId, postId, postData) {
  const newMetadata = {
    blogid: blogId.toLowerCase(), // Use lowercase for primary key
    postid: postId.toLowerCase(), // Use lowercase for sort key
    createdAt: new Date().toISOString(),
    title: postData.title,
    publishedDate: postData.published,
    // Add any other metadata fields you want to initialize
  };

  const putCommand = new PutCommand({
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Item: newMetadata,
  });

  try {
    await docClient.send(putCommand);
    console.log(`Created new metadata entry for post ${postId}`);
    return newMetadata;
  } catch (error) {
    console.error(`Error creating metadata in DynamoDB: ${error}`);
    return null;
  }
}

async function mergePostWithMetadata(post, metadata) {
  if (!metadata) return post;
  return { ...post, ...metadata };
}

async function processPost(post) {
  const metadata = await getMetadataFromDynamoDB(post.blog.id, post.id);

  if (!metadata && post.labels && post.labels.includes(LABEL_SYNC)) {
    const newMetadata = await createMetadataInDynamoDB(
      post.blog.id,
      post.id,
      post
    );
    return mergePostWithMetadata(post, newMetadata);
  }

  return mergePostWithMetadata(post, metadata);
}

export async function fetchPosts() {
  console.log("Fetching posts...");

  const bloggers = process.env.BLOGGERS?.split(",") || [];
  const postsPromises = bloggers.map((blogger) =>
    fetchFromBloggerAPI(`/${blogger}/posts`, { tags: [blogger, "posts"] })
  );

  const postsData = await Promise.all(postsPromises);
  const posts = await Promise.all(
    postsData.flatMap((data) => (data.items || []).map(processPost))
  );

  console.log(`Fetched and processed ${posts.length} posts.`);

  return posts.filter(post => post.labels.includes(LABEL_PUBLISHED));
}

export async function fetchPost({ blogId, postId }) {
  const [post, metadata] = await Promise.all([
    fetchFromBloggerAPI(`/${blogId}/posts/${postId}`, {
      tags: [blogId, postId, "post"],
    }),
    getMetadataFromDynamoDB(blogId, postId),
  ]);

  if (!metadata && post.labels && post.labels.includes(LABEL_SYNC)) {
    const newMetadata = await createMetadataInDynamoDB(blogId, postId, post);
    return mergePostWithMetadata(post, newMetadata);
  }

  return mergePostWithMetadata(post, metadata);
}
