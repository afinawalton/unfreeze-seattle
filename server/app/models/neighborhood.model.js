module.exports = (sequelize, Sequelize, Model) => {
    class Neighborhood extends Model {}
    Neighborhood.init({
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        restaurants: {
            type: Sequelize.ARRAY(Sequelize.JSON),
            validate: {
                isSpecificLength(value) {
                    if (value.length > 4) {
                        throw new Error('Restaurants must only have three items');
                    }
                }
            }
        },
        activities: {
            type: Sequelize.ARRAY(Sequelize.JSON),
            validate: {
                isSpecificLength(value) {
                    if (value.length > 4) {
                        throw new Error('Activities must only have three items');
                    }
                }
            }
        },
        sights: {
            type: Sequelize.ARRAY(Sequelize.JSON),
            validate: {
                isSpecificLength(value) {
                    if (value.length > 4) {
                        throw new Error('Sights must only have three items');
                    }
                }
            }
        },
    }, { 
        sequelize,
        modelName: 'neighborhood',
        timestamps: false
    });
    
    return Neighborhood;
}