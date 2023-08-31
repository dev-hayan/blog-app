'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('comments', ['userId']);
    await queryInterface.addIndex('comments', ['postId']);
    await queryInterface.addIndex('comments', ['parentCommentId']);


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('comments', ['userId']);
    await queryInterface.removeIndex('comments', ['postId']);
    await queryInterface.removeIndex('comments', ['parentCommentId']);
  }
};

