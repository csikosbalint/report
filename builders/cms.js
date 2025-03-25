import { strapi } from '@strapi/client';
import { Tag } from 'lucide-react';

const client = strapi({ baseURL: process.env.CMS_BASE_URL + '/api' });
const articles = client.collection('articles');
const mainpage = client.single('main-page');

const defaultOptions = {
    populate: '*'
};

async function rawArticles(options) {
    return articles.find({ ...defaultOptions, ...options });
}

async function rawArticle({ documentId }) {
    return articles.findOne(documentId, {
        populate: {
            Author: {
                populate: "*"
            },
            Tags: {
                populate: "*"
            }
        },
    });
}

async function rawMainPage(options) {
    return mainpage.find({
        ...options,
        populate: {
            main: {
                populate: "*"
            },
            latests: {
                populate: "*"
            },
            tops: {
                populate: "*"
            }
        }
    });
}

export { rawArticles, rawArticle, rawMainPage };