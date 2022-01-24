module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        first_name: {
            type: Sequelize.STRING(50)
        },
        email: {
            type: Sequelize.STRING
        },
        birthdate: {
            type: Sequelize.DATEONLY
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
            type: Sequelize.STRING(85)
        },
        neighborhood: {
            type: Sequelize.STRING(85)
        },
        profile_pic: {
            type: Sequelize.STRING(2048)
        },
        resident_type: {
            type: Sequelize.STRING(12)
        },
        years_in_wa: {
            type: Sequelize.INTEGER
        }
    });

    return User;
}