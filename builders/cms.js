import { strapi } from '@strapi/client';

const client = strapi({ baseURL: process.env.CMS_BASE_URL + '/api' });
const articles = client.collection('articles');
const mainpage = client.single('main-page');

const defaultOptions = {
    populate: '*'
};

/**
 * Fetches articles from the Strapi CMS.
 * @param {Object} options - Query options (see Strapi's documentation).
 * @returns {Promise<Object[]>} - A promise resolving to an array of articles.
 */
async function rawArticles(options) {
    return articles.find({ ...defaultOptions, ...options });
}

/**
 * Fetches an article from the Strapi CMS.
 * @param {{ documentId: string }} params - Parameters.
 * @param {string} params.documentId - The document ID of the article.
 * @returns {Promise<Object>} - A promise resolving to the article.
 */
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

/**
 * Fetches the main page data from the Strapi CMS.
 * @param {Object} [options] - Query options (see Strapi's documentation).
 * @returns {Promise<Object>} - A promise resolving to the main page data.
 */
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