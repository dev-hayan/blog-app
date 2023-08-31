module.exports = (sequelize, DataTypes) => {
    const suggestion = sequelize.define("suggestion", {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isRejected: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        reply: {
            type: DataTypes.TEXT,
        },
        post_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isReplaced: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }

    }, { timestamps: false })
    suggestion.associate = function (models) {
        suggestion.belongsTo(models.post, { foreignKey: 'postId', onDelete: 'CASCADE' })
        suggestion.belongsTo(models.user, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
            onUpdate: "CASCADE"
        })

    }
    return suggestion
}
