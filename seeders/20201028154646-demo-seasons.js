'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Seasons', 
      [
        {
          name: 'Summer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Autumn',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Winter',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Spring',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], 
     {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
