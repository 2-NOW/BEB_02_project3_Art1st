export default (Sequelize, DataTypes) => {
    return Sequelize.define('artwork_hashtag', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    })
}