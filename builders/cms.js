import { strapi } from '@strapi/client';

const client = strapi({ baseURL: process.env.STRAPI_API_BASE_URL });
const articles = client.collection('articles');

async function rawArticles(options) {
    return articles.find({ locale: options?.locale });
}

async function rawArticle({documentId}) {
    return articles.findOne(documentId);
}

export { rawArticles, rawArticle };