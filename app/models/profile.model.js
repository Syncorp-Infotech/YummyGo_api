module.exports = (sequelize, Sequelize) => {

    const Profile = sequelize.define("profiles", {
        profile_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        profile_first_name: {
            type: Sequelize.STRING(150)
        },
        profile_last_name: {
            type: Sequelize.STRING(150)
        },
        profile_biz_name: Sequelize.STRING(150),
        bank_name: Sequelize.STRING(50),
        bank_acc_no: Sequelize.STRING(50),
        profile_biz_type: Sequelize.STRING(50),
        profile_biz_avg_meal_cost: Sequelize.STRING(50),
        profile_email: {
            type: Sequelize.STRING(320)
        },
        profile_contact: {
            type: Sequelize.STRING(50)
        },
        profile_dob: {
            type: Sequelize.DATE
        },
        profile_gender: {
            type: Sequelize.STRING(1)
        },
        profile_address: {
            type: Sequelize.STRING(500)
        },
        profile_location: {
            type: Sequelize.STRING(300)
        },
        profile_doc_menu: {
            type: Sequelize.STRING(600)
        },
        profile_img: Sequelize.STRING(600),
        profile_summary: Sequelize.STRING(6000),
        profile_facebook: Sequelize.STRING(300),
        profile_youtube: Sequelize.STRING(300),
        profile_instagram: Sequelize.STRING(300),
        profile_twitter: Sequelize.STRING(300),
        idprofileone: Sequelize.STRING(600),
        idprofiletwo: Sequelize.STRING(600),
        cuisine: Sequelize.STRING(600),
        categorys: Sequelize.STRING(600),
        ref_email: Sequelize.STRING(600),
        address_landmark: Sequelize.STRING(600),
        address_postal: Sequelize.STRING(600),
        business_proof_type: Sequelize.STRING(600),
        city: Sequelize.STRING(600),
        state: Sequelize.STRING(600),
        postal: Sequelize.STRING(600),
        country: Sequelize.STRING(600),
        p_country_name: Sequelize.STRING(600),
        p_state_name: Sequelize.STRING(600),
        p_city_name: Sequelize.STRING(600),
        bank_ifsc_no : Sequelize.STRING(600),
        bank_branch : Sequelize.STRING(600),
        vehicle_no : Sequelize.STRING(600),
        vehicle_type : Sequelize.STRING(600),
        profile_status: {
            type: Sequelize.STRING(1)
        },
        location_lat: Sequelize.DOUBLE,
        location_lng: Sequelize.DOUBLE,
        rating: Sequelize.DOUBLE,
        profile_pid: {
            type: Sequelize.INTEGER
        },
        role_id: {
            type: Sequelize.INTEGER
        },
        biz_id: {
            type: Sequelize.INTEGER
        },
        created_by: {
            type: Sequelize.INTEGER,
        },
        updated_by: {
            type: Sequelize.INTEGER
        }
    }, {
        underscored: true,
        tableName: 'profile'
    });

    return Profile;
};