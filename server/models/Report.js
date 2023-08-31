module.exports = (sequelize, DataTypes) => {
    const userReport = sequelize.define("userReport", {
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    }, { timestamps: false })
    userReport.associate = function (models) {
        userReport.belongsTo(models.user, {
            onDelete: 'CASCADE',
        })
        userReport.belongsTo(models.post, {
            foreignKey: 'typeId',
            onDelete: 'CASCADE',
        })
        userReport.belongsTo(models.comment, {
            foreignKey: 'typeId',
            onDelete: 'CASCADE',
        })
    }

    return userReport
}



