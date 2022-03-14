export default (Sequelize, DataTypes) => {
    return Sequelize.define('profile', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        picture: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    })
}