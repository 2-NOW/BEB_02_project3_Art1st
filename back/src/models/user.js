export default (Sequelize, DataTypes) => {
    return Sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: ''
        },
        user_id: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: ''
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: ''
        },
        balance: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: 0,
        },
        donation_balance: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: 0,
        },
        address: {
            type: DataTypes.STRING(256),
            allowNull: false,
            defaultValue: ''
        },
        private_key: {
            type: DataTypes.STRING(256),
            allowNull: false,
            defaultValue: ''
        },
        total_sales: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: 0,
        },
        // 서버계정으로 컬렉션생성후 민팅한 nft 소유주만 전환시켜주는 방법으로 해야 수수료 문제가 해결될 것 같아서 우선 이 컬럼은 주석처리 해놨습니다.
        // contractAddr: { 
        //     type: DataTypes.STRING(256),
        //     allowNull: false,
        //     defaultValue: ''
        // }
    })
}
