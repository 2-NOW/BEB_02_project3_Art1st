export default (Sequelize, DataTypes) => {
    return Sequelize.define('vote', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },       
    })
}
