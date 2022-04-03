'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('profiles', 'instargram', {
      type: DataTypes.TEXT,
    });
    await queryInterface.addColumn('profiles', 'tweeter', {
      type: DataTypes.TEXT,
    });
    await queryInterface.addColumn('profiles', 'facebook', {
      type: DataTypes.TEXT,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
