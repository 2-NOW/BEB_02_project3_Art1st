export default (Sequelize, DataTypes) => {
    return Sequelize.define('reward_transaction', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        // to_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        action: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        transaction_hash: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
    })
}