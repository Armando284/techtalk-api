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

    return queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'hashedpassword123', // Asegúrate de usar un hash real
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        password: 'hashedpassword456', // Asegúrate de usar un hash real
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Users', null, {});
  }
};
