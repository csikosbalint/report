/**
 * Represents a tag data transfer object.
 * @class
 */
export default class TagDTO {
    /**
     * Creates an instance of TagDTO.
     * @param {Object} rawTag - The raw tag data.
     * @param {string} rawTag.Label - The display label of the tag.
     */
    constructor(rawTag) {
        /**
         * @type {string}
         */
        this.label = rawTag.Label;
    }
}