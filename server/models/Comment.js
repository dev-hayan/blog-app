module.exports = (sequelize, DataTypes) => {
    const comment = sequelize.define("comment", {
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
        userName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, { timestamps: true, }
    )
    comment.associate = function (models) {
        comment.belongsTo(models.post, { foreignKey: 'postId', onDelete: 'CASCADE' })
        comment.belongsTo(models.user, {
            onUpdate: "CASCADE",
            onDelete: "CASCADE"

        })
        comment.hasMany(models.comment, { as: 'Replies', foreignKey: 'parentCommentId', onDelete: 'CASCADE' })
        comment.belongsTo(models.comment, { as: 'ParentComment', foreignKey: 'parentCommentId', onDelete: 'CASCADE' })
        comment.hasMany(models.attachment, {
            foreignKey: 'attachmenTableId',
            onDelete: "CASCADE",
            scope: {
                attachmenTableType: 'comment'
            },
        })
        comment.hasMany(models.userLike, {
            foreignKey: 'typeId',
            onDelete: "CASCADE",
            scope: {
                type: 'comment'
            },
        })
        comment.hasMany(models.userReport, {
            foreignKey: 'typeId',
            onDelete: "CASCADE",
            scope: {
                type: 'comment'
            },
        })
    }

    comment.afterDestroy(async (comment) => {
        const Attachment = sequelize.models.attachment;

        try {
            await Attachment.destroy({
                where: {
                    attachmenTableId: comment.id,
                    attachmenTableType: 'comment'
                }
            });
        } catch (error) {
            console.error('Error deleting associated attachments:', error);
        }
    });
    
    return comment
}



