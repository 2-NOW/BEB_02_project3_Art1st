export default (Sequelize, DataTypes) => {
    return Sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: ''
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: ''
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: ''
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        donation_balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        address: {
            type: DataTypes.STRING(256),
            allowNull: false,
            defaultValue: ''
        },
        private_key: {
            type: DataTypes.STRING(256),
            allowNull: false,
            defaultValue: ''
        },
        total_sales: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        contractAddr: {
            type: DataTypes.STRING(256),
            allowNull: false,
            defaultValue: ''
        }
    })
}
