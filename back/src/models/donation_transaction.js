export default (Sequelize, DataTypes) => {
    return Sequelize.define('donation_transaction', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    })
}