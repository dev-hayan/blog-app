'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('userReports', ['userId', 'typeId', 'type']);
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('userReports', ['userId', 'typeId', 'type']);
  }
};