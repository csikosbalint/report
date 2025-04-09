import ArticleDTO from "./ArticleDTO";
import TagDTO from "./TagDTO";

/**
 * Represents the main page data transfer object.
 * @class
 */
export default class MainPageDTO {

    /**
     * Creates an instance of MainPageDTO.
     * @param {Object} rawMainPage - The raw main page data.
     * @param {Object} rawMainPage.main - The main article data.
     * @param {Object[]} rawMainPage.latest - The latest articles data.
     * @param {Object[]} rawMainPage.tops - The top articles data.
     * @param {Object[]} rawMainPage.tags - The actual tags data.
     */
    constructor(rawMainPage) {
        /**
         * @type {ArticleDTO}
         */
        this.main = new ArticleDTO(rawMainPage.main);

        /**
         * @type {ArticleDTO[]}
         */
        this.latests = rawMainPage?.latests ? rawMainPage.latests.map((rawArticle) => new ArticleDTO(rawArticle)) : [];

        /**
         * @type {ArticleDTO[]}
         */
        this.tops = rawMainPage?.tops ? rawMainPage.tops.map((rawArticle) => new ArticleDTO(rawArticle)) : [];

        /**
         * @type {TagDTO[]}
         */
        this.tags = rawMainPage?.tags ? rawMainPage.tags.map((rawTag) => new TagDTO(rawTag)) : [];
    }
}