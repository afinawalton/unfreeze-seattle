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
        birthdate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        resident_type: {
            type: Sequelize.STRING(12),
            allowNull: false
        },
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
        neighborhood: {
            type: Sequelize.STRING(85)
        },
        top_interest: {
            type: Sequelize.STRING(40),
            allowNull: true
        },
        blurb: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        other_interests: {
            type: Sequelize.ARRAY(Sequelize.TEXT)
        },
        bio: {
            type: Sequelize.STRING(300)
        },
        prompt_answers: {
            type: Sequelize.JSON,
            allowNull: true
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

    UserProfile.User = UserProfile.belongsTo(User, {
        foreignKey: {
            name: 'user_id',
            allowNull: false
        }
    });

    return { User, UserProfile };
}