'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const posts = await queryInterface.sequelize.query(
      `select "Posts"."id", "Users"."id" as "otherUser" from "Posts"
      left join "Users" on "Posts"."userId" != "Users"."id";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    const comments = posts.map((post, index) => ({
      postId: post.id,
      userId: post.otherUser,
      content: `Comentario de ejemplo ${index + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    return queryInterface.bulkInsert('Comments', comments, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Comments', null, {})
  }
};
