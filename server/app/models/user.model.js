module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
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
        timestamps: true,
        createdAt: 'account_created',
        updatedAt: false,
        deletedAt: false
    });

    return User;
}