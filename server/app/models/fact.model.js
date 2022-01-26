module.exports = (sequelize, Sequelize, Model) => {
    class Fact extends Model {}
    Fact.init({
        fact: {
            type: Sequelize.STRING,
            allowNull: false
        },
        source: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, { 
        sequelize,
        modelName: 'fact',
        timestamps: false
    });
    
    return Fact;
}