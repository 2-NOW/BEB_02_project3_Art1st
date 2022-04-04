'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('artworks', 'price', {
      type: Sequelize.STRING(100)
    });
    await queryInterface.changeColumn('orderbooks', 'amount', {
      type: Sequelize.STRING(100)
    });
    await queryInterface.changeColumn('users', 'balance', {
      type: Sequelize.STRING(100)
    });
    await queryInterface.changeColumn('users', 'donation_balance', {
      type: Sequelize.STRING(100)
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
