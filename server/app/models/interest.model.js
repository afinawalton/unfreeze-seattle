module.exports = (sequelize, Sequelize, Model) => {
    class Interest extends Model {}
    Interest.init({
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, { 
        sequelize,
        modelName: 'interest',
        timestamps: false
    });
    
    return Interest;
}