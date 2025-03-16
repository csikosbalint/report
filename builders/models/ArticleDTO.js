import UrlSafeString from "url-safe-string";
import TagDTO from "./TagDTO";
import ImageDTO from "./ImageDTO";

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
     * @param {TagDTO[]} rawArticle.Tags - The tags associated with the article.
     * @param {ImageDTO} rawArticle.Image - The image associated with the article.
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
         * @type {ImageDTO}
         */
        this.image = rawArticle.Image ? new ImageDTO(rawArticle.Image) : null;

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
         * @type {TagDTO[]}
         */
        this.tags = rawArticle?.Tags ? rawArticle?.Tags.map((tag) => new TagDTO(tag)) : [];

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
