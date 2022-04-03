export default (Sequelize, DataTypes) => {
    return Sequelize.define('profile', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        picture: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        instargram: {
            type: DataTypes.TEXT,
        },
        tweeter: {
            type: DataTypes.TEXT
        },
        facebook: {
            type: DataTypes.TEXT
        }
    })
}
