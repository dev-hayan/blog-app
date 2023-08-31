'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('userLikes', ['userId', 'typeId', 'type']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('userLikes', ['userId', 'typeId', 'type']);
  }
};