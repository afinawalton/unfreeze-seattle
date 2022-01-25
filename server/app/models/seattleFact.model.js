module.exports = (sequelize, Sequelize, Model) => {
    const facts = require('./seattleFacts.json');

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