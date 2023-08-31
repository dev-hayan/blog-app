'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('posts', ['userId']);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('posts', ['userId']);
  }
};

