import { strapi } from '@strapi/client';

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
    return articles.findOne(documentId);
}

async function rawMainPage(options) {
    return mainpage.find({ populate: {
        main: {
            populate: "*"
        },
        latests: {
            populate: "*"
        }
    } });
}

export { rawArticles, rawArticle, rawMainPage };