import UrlSafeString from "url-safe-string";


/**
 * Represents an article data transfer object.
 * @class
 */
export default class ArticleDTO {
    
    /**
     * Creates an instance of ArticleDTO.
     * @param {Object} rawArticle - The raw article data.
     * @param {string} rawArticle.documentId - The unique identifier of the article.
     * @param {string} rawArticle.Title - The title of the article.
     * @param {string} rawArticle.Description - The description of the article.
     * @param {string} rawArticle.Content - The content of the article.
     * @param {string} rawArticle.publishedAt - The publication date of the article.
     */
    constructor(rawArticle) {
        /**
         * @type {string}
         */
        this.id = rawArticle.documentId;

        /**
         * @type {string}
         */
        this.title = rawArticle.Title;

        /**
         * @type {string}
         */
        this.image = "/placeholder.svg?height=500&width=1000";

        /**
         * @type {string}
         */
        this.description = rawArticle.Description;

        /**
         * @type {string}
         */
        this.author = 'Anonymous';

        /**
         * @type {string}
         */
        this.content = rawArticle.Content;

        /**
         * @type {string[]}
         */
        this.labels = ["hu", "eu", "migráció", "egészség", "család", "politika"];

        /**
         * @type {string}
         */
        this.readTime = "5 min read";

        /**
         * @type {string}
         */
        this.link = `/article/${new Date(rawArticle.publishedAt).getFullYear()}/${new Date(rawArticle.publishedAt).getMonth()}/${new Date(rawArticle.publishedAt).getDate()}/${new UrlSafeString().generate(rawArticle.Title)}/${rawArticle.documentId}`;

        /**
         * @type {Date}
         */
        this.publishedAt = new Date(rawArticle.publishedAt);
    }
}
