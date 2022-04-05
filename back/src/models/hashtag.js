export default (Sequelize, DataTypes) => {
    return Sequelize.define('hashtag', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        hashtag: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    })
}