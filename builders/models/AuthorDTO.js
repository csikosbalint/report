import ImageDTO from "./ImageDTO";

export class AuthorDTO {
  /**
   * Creates an instance of AuthorDTO.
   * @param {Object} rawAuthor - The raw author data.
   * @param {string} rawAuthor.Name - The name of the author.
   * @param {string} rawAuthor.Role - The role of the author.
   * @param {ImageDTO} rawAuthor.Avatar - The avatar of the author.
   */
  constructor(rawAuthor) {
    /**
     * @type {string} Author name
     */
    this.name = rawAuthor.Name;
    /**
     * @type {string} Author role
     */
    this.role = rawAuthor.Role;
    /**
     * @type {ImageDTO} Author avatar image
     */
    this.avatar = rawAuthor.Avatar ? new ImageDTO(rawAuthor.Avatar) : null;
  }
}