export default (Sequelize, DataTypes) => {
    return Sequelize.define('comment', {
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
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    })
}
