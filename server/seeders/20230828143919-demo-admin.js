"use strict"
const faker = require('faker')
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userData = []
    for (let i = 0; i < 5; i++) {
      userData.push({
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: await bcrypt.hash("Hayan123@", 10),
        isAdmin: true
      })
    }
    await queryInterface.bulkInsert('users', userData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { isAdmin: true });
  },
}