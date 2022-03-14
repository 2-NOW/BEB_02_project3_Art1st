export default (Sequelize, DataTypes) => {
    return Sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        donation_balance: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        private_key: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        total_sales: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    })
}