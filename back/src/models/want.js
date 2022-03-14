export default (Sequelize, DataTypes) => {
    return Sequelize.define('want', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // artwork_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
    })
}