export default (Sequelize, DataTypes) => {
    return Sequelize.define('collaboration', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        imgURI: {
            type: DataTypes.STRING(256),
            allowNull: false,
            defaultValue: ''   
        },
        reward: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        period: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(256),
            allowNull: false,
            defaultValue: ''
        },
        desc: {
            type: DataTypes.STRING(256),
            allowNull: false,    
            defaultValue: ''
        }, 
    })
}
