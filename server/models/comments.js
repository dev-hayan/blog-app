

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
        parentCommentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, { timestamps: false });
    comments.associate = function (models) {
        comments.belongsTo(models.posts, { foreignKey: 'postId', onDelete: 'CASCADE' });
        comments.belongsTo(models.users);
        comments.hasMany(models.comments, { as: 'Replies', foreignKey: 'parentCommentId', onDelete: 'CASCADE' });
        comments.belongsTo(models.comments, { as: 'ParentComment', foreignKey: 'parentCommentId' });
        comments.hasMany(models.attachments, {
            foreignKey: 'attachmenTableId',
            constraints: false,
            scope: {
                commentableType: 'comment'
            },
        });
    };

    return comments
}



