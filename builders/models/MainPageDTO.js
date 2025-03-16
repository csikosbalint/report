import ArticleDTO from "./ArticleDTO";

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
    }
}