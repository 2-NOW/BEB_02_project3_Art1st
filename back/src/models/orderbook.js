export default (Sequelize, DataTypes) => {
    return Sequelize.define('orderbook', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        action: {
          type: DataTypes.ENUM('donate', 'compensate'), // 일단은 이정도 ...
          allowNull: false
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        transaction_hash: {
          type: DataTypes.STRING,
          allowNull: false
        },
        status: {
          type: DataTypes.ENUM('before', 'pending', 'complete'),
          allowNull: false
        },
        // from_id: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false
        // },
        // to_id: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false
        // }
    });
}