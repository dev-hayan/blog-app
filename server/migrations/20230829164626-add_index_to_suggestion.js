'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('suggestions', ['userId']);
    await queryInterface.addIndex('suggestions', ['postId']);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('suggestions', ['userId']);
    await queryInterface.removeIndex('suggestions', ['postId']);
  }
};
