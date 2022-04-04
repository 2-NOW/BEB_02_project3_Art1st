export default (Sequelize, DataTypes) => {
    return Sequelize.define('like', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    })
}