module.exports = (sequelize, DataTypes) => {
    const userLike = sequelize.define("userLike", {
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    }, { timestamps: false })
    userLike.associate = function (models) {
        userLike.belongsTo(models.user, {
            onDelete: 'CASCADE',
        })
        userLike.belongsTo(models.post, {
            foreignKey: 'typeId',
            onDelete: 'CASCADE',
        })
        userLike.belongsTo(models.comment, {
            foreignKey: 'typeId',
            onDelete: 'CASCADE',
        })
    }

    return userLike
}
