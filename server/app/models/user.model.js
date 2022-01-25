module.exports = (sequelize, Sequelize, Model) => {
    class User extends Model {}
    User.init({
        first_name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        birthdate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        work: {
            type: Sequelize.STRING(120)
        },
        interests: {
            type: Sequelize.ARRAY(Sequelize.TEXT)
        },
        pronouns: {
            type: Sequelize.STRING(50)
        },
        city: {
            type: Sequelize.STRING(85),
            allowNull: false
        },
        neighborhood: {
            type: Sequelize.STRING(85)
        },
        profile_pic: {
            type: Sequelize.STRING(2048)
        },
        resident_type: {
            type: Sequelize.STRING(12),
            allowNull: false
        },
        years_in_wa: {
            type: Sequelize.INTEGER,
            allowNull: false
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
        bio: {
            type: Sequelize.STRING(300)
        },
        top_interest: {
            type: Sequelize.STRING(40),
            allowNull: false
        },
        blurb: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        prompt_answers: {
            type: Sequelize.JSON,
            allowNull: false
        }
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