export default (Sequelize, DataTypes) => {
    return Sequelize.define('artwork', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        token_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // creator_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // owner_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        views: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        is_selling: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ipfsURI: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        desc: {
            type: DataTypes.STRING(40),
            allowNull: false    
        }
        
    })
}
