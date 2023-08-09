
module.exports = (sequelize, DataTypes) => {
    const attachments = sequelize.define('attachments', {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        attachmenTableId: DataTypes.INTEGER,
        attachmenTableType: DataTypes.STRING
    }, { timestamps: false });
    attachments.associate = function (models) {
        attachments.belongsTo(models.posts, { foreignKey: 'attachmenTableId', constraints: false });
        attachments.belongsTo(models.comments, { foreignKey: 'attachmenTableId', constraints: false });
    };

    return attachments;
}


