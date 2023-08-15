module.exports = (sequelize, DataTypes) => {
    const suggestions = sequelize.define("suggestions", {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rejected: {
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
        }
    }, { timestamps: false })
    suggestions.associate = function (models) {
        suggestions.belongsTo(models.posts, { foreignKey: 'postId', onDelete: 'CASCADE' })
        suggestions.belongsTo(models.users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        })

    }
    return suggestions
}
