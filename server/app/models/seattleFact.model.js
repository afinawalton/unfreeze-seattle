module.exports = (sequelize, Sequelize, Model) => {
    class SeattleFact extends Model {}
    SeattleFact.init({
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
        modelName: 'seattle_fact',
        timestamps: false
    });
    
    return SeattleFact;
}