module.exports = (sequelize, Sequelize) => {
    
    const UserReferral = sequelize.define(" user_referrals", {
		id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER,
        },
		referred_user_id: {
            type: Sequelize.INTEGER,
        },
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: ' user_referral'
    });
    
    return UserReferral;
};