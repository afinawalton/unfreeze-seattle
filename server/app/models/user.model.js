module.exports = (sequelize, Sequelize, Model) => {
    const bcrypt = require('bcrypt');

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
        password: {
            type: Sequelize.STRING,
            allowNull: true
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
        deletedAt: false,
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            },
            beforeUpdate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            }
        },
        instanceMethods: {
            validPassword: (password) => {
                return bcrypt.compareSync(password, this.password);
            }
        }
    });
    User.prototype.validPassword = async (password, hash) => {
        return await bcrypt.compareSync(password, hash);
    }

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