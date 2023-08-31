module.exports = (sequelize, DataTypes) => {
    const post = sequelize.define("post", {
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
    })

    post.associate = function (models) {
        post.belongsTo(models.user, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
            onUpdate: "CASCADE"
        })
        post.hasMany(models.comment, { as: 'Comments', foreignKey: 'postId', onDelete: 'CASCADE' })
        post.hasMany(models.suggestion, { as: 'PostSuggestions', foreignKey: 'postId', onDelete: 'CASCADE' })
        post.hasMany(models.attachment, {
            foreignKey: 'attachmenTableId',
            onDelete: "CASCADE",
            scope: {
                attachmenTableType: 'post'
            },
        })
        post.hasMany(models.userLike, {
            foreignKey: 'typeId',
            onDelete: "CASCADE",
            scope: {
                type: 'post'
            },
        })
        post.hasMany(models.userReport, {
            foreignKey: 'typeId',
            onDelete: "CASCADE",
            scope: {
                type: 'post'
            },
        })
    }

    post.afterDestroy(async (post) => {
        const Attachment = sequelize.models.attachment;

        try {
            await Attachment.destroy({
                where: {
                    attachmenTableId: post.id,
                    attachmenTableType: 'post'
                }
            });
        } catch (error) {
            console.error('Error deleting associated attachments:', error);
        }
    });

    return post
}





