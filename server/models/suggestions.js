module.exports = (sequelize, DataTypes) => {
    const suggestions = sequelize.define("suggestions", {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rejected: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, { timestamps: false });
    suggestions.associate = function (models) {
        suggestions.belongsTo(models.posts)
        suggestions.belongsTo(models.users)

    };
    return suggestions;
}
