'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('users', [{
      uuid: 'e7369ab3-e09b-4230-94ed-6b13cc683bc0',
      name: 'Rezki Pratama',
      email: 'rezki@gmail.com',
      password: '123',
      createdAt: '2020-12-01T04:33:06.946Z',
      updatedAt: '2020-12-01T06:41:41.336Z'
    },{
      uuid: '538b6db0-e377-48c4-85c3-3b8b1cbb6337',
      name: 'Anthony',
      email: 'anthony@gmail.com',
      password: '123',
      createdAt: '2020-12-01T04:33:06.946Z',
      updatedAt: '2020-12-01T06:41:41.336Z'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete('users', null, {});
  }
};
