/**
 * Represents an image data transfer object.
 * @class
 */
export default class ImageDTO {
    /**
     * Creates an instance of ImageDTO.
     * @param {Object} rawImage - The raw image data.
     * @param {string} rawImage.mime - The MIME type of the image.
     * @param {string} rawImage.caption - The caption of the image.
     * @param {string} rawImage.hash - The hash of the image.
     * @param {Object} rawImage.formats - The different format versions of the image.
     */
    constructor(rawImage) {
        /**
         * @type {string}
         */
        this.mime = rawImage.mime;

        /**
         * @type {string}
         */
        this.caption = rawImage.caption;

        /**
         * @type {string}
         */
        this.hash = rawImage.hash;

        /**
         * @type {Object}
         */
        this.formats = {
            thumbnail: { url: rawImage.formats?.thumbnail ? process.env.CMS_BASE_URL + rawImage.formats.thumbnail.url : null },
            small: { url: rawImage.formats?.small ? process.env.CMS_BASE_URL + rawImage.formats.small.url : null },
            medium: { url: rawImage.formats?.medium ? process.env.CMS_BASE_URL + rawImage.formats.medium.url : null },
            large: { url: rawImage.formats?.large ? process.env.CMS_BASE_URL + rawImage.formats.large.url : null },
        };

        /**
         * @type {string}
         */
        this.url = rawImage.url || null;
    }
}