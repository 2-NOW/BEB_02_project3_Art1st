export default (Sequelize, DataTypes) => {
    return Sequelize.define('want', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    })
}