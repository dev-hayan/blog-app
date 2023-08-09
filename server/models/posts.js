module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define("posts", {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        reports: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    }, { timestamps: false });

    posts.associate = function (models) {
        posts.belongsTo(models.users)
        posts.hasMany(models.comments, { as: 'Comments', foreignKey: 'postId' });
        posts.hasMany(models.suggestions, { as: 'PostSuggestions', foreignKey: 'postId' });
        posts.hasMany(models.attachments, {
            foreignKey: 'attachmenTableId',
            constraints: false,
            scope: {
                commentableType: 'post'
            }
        });
    };

    return posts;
}





