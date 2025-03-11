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
