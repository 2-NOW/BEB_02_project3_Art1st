export default (Sequelize, DataTypes) => {
    return Sequelize.define('website', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        site: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
    })
}