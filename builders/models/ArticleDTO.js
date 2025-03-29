import TagDTO from "./TagDTO";
import ImageDTO from "./ImageDTO";
import { AuthorDTO } from "./AuthorDTO";

const calculateReadTime = content => {
    const wordsPerMinute = 140;
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
}
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
     * @param {string} rawArticle.createdAt - The publication date of the article.
     * @param {TagDTO[]} rawArticle.Tags - The tags associated with the article.
     * @param {ImageDTO} rawArticle.Image - The image associated with the article.
     * @param {AuthorDTO} rawArticle.Author - The author of the article.
     * @returns {ArticleDTO}
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
         * @type {number}
         */
        this.readTime = calculateReadTime(rawArticle.Content);

        /**
         * @type {string}
         */
        this.link = `/article/${new Date(rawArticle.createdAt).getFullYear()}/${new Date(rawArticle.createdAt).getMonth()}/${new Date(rawArticle.createdAt).getDate()}/${encodeURI(rawArticle.Title.replace(/[\.,-\/#!$%' "^&*;:{}=_`~()?]/g, '-'))}/${rawArticle.documentId}`;

        /**
         * @type {Date}
         */
        this.date = new Date(rawArticle.createdAt);

        /**
         * @type {AuthorDTO}
         */
        this.author = rawArticle.Author ? new AuthorDTO(rawArticle.Author) : null;
    }
}
