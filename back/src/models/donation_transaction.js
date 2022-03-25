export default (Sequelize, DataTypes) => {
    return Sequelize.define('donation_transaction', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        // from_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // to_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // amount: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        // transaction_hash: {
        //     type: DataTypes.STRING(40),
        //     allowNull: false
        // },
    })
}