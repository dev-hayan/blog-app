

module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define("comments", {
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
    comments.associate = function (models) {
        comments.belongsTo(models.posts, { as: 'Post', foreignKey: 'postId' });
        comments.hasMany(models.comments, { as: 'Replies', foreignKey: 'parentCommentId' });
        comments.hasMany(models.attachments, {
            foreignKey: 'attachmenTableId',
            constraints: false,
            scope: {
                commentableType: 'comment'
            }
        });
    };

    return comments
}



