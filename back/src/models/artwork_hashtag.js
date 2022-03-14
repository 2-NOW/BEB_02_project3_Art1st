export default (Sequelize, DataTypes) => {
    return Sequelize.define('artwork_hashtag', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        // artwork_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // hashtag_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
    })
}