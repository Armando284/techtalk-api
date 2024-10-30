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
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM "Users";',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    const posts = users.map((user, index) => ({
      title: `Post de ejemplo ${index + 1}`,
      content: 'Este es el contenido del post de ejemplo.',
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert('Posts', posts, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
