'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('donation_transactions', 'order_id', {type: DataTypes.INTEGER, allowNull: false});

    await queryInterface.addConstraint('donation_transactions', {
      fields: ['order_id'],
      type: 'foreign key',
      name: 'order_id',
      references: {
        table: 'orderbooks',
        field: 'id'
      }
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
