module.exports = (sequelize, Sequelize, Model) => {
    class User extends Model {}
    User.init({
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // Needed to validate ability to register for the site
        birthdate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        // Allows the user to see specific content
        resident_type: {
            type: Sequelize.STRING(12),
            allowNull: false
        },
        // Determines residentType on front-end form
        years_in_wa: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    }, { 
        sequelize,
        modelName: 'user',
        timestamps: true,
        createdAt: 'account_created',
        updatedAt: false,
        deletedAt: false
    });

    class UserProfile extends Model {}
    UserProfile.init({
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: Sequelize.STRING(50)
        },
        pronouns: {
            type: Sequelize.STRING(50)
        },
        work: {
            type: Sequelize.STRING(120)
        },
        city: {
            type: Sequelize.STRING(85)
        },
        neighborhood: {
            type: Sequelize.STRING(85)
        },
        top_interest: {
            type: Sequelize.STRING(40),
            allowNull: true // for now
        },
        blurb: {
            type: Sequelize.STRING(50),
            allowNull: true // for now
        },
        other_interests: {
            type: Sequelize.ARRAY(Sequelize.TEXT)
        },
        bio: {
            type: Sequelize.STRING(300)
        },
        // Add recommendations column but only for local users
        // seattle favs? allow transplants to add to their list as
        // they explore Seattle?
        prompt_answers: {
            type: Sequelize.JSON,
            allowNull: true // for now
        },
        profile_pic: {
            type: Sequelize.STRING(2048)
        },
    }, {
        sequelize,
        modelName: 'user_profile',
        timestamps: false
    });

    User.UserProfile = User.hasOne(UserProfile, {
        foreignKey: {
            name: 'user_id',
            allowNull: false
        }
    });

    return User;
}