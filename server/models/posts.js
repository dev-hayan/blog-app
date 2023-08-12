module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define("posts", {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isApproved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
        posts.belongsTo(models.users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        })
        posts.hasMany(models.comments, { as: 'Comments', foreignKey: 'postId', onDelete: 'CASCADE' });
        posts.hasMany(models.suggestions, { as: 'PostSuggestions', foreignKey: 'postId', onDelete: 'CASCADE' });
        posts.hasMany(models.attachments, {
            foreignKey: 'attachmenTableId',
            constraints: false,
            scope: {
                commentableType: 'post'
            },
        });
    };

    return posts;
}





