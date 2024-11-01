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
      'SELECT "id", "userId" FROM "Posts";',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    const comments = await queryInterface.sequelize.query(
      'SELECT "id", "userId" FROM "Comments";',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    const postsLikes = posts.map((post) => ({
      userId: post.userId,
      likeable_type: 'post',
      likeable_id: post.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    const commentsLikes = comments.map((comment) => ({
      userId: comment.userId,
      likeable_type: 'comment',
      likeable_id: comment.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    return queryInterface.bulkInsert('Likes', [...postsLikes, ...commentsLikes], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Likes', null, {})
  }
};
