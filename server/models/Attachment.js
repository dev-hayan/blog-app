module.exports = (sequelize, DataTypes) => {
    const attachment = sequelize.define('attachment', {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        attachmenTableId: DataTypes.INTEGER,
        attachmenTableType: DataTypes.STRING
    }, { timestamps: false })
    attachment.associate = function (models) {
        attachment.belongsTo(models.comment, {
            foreignKey: 'attachmenTableId', onDelete: "CASCADE",

        })
        attachment.belongsTo(models.post, {
            foreignKey: 'attachmenTableId', onDelete: "CASCADE",

        })
    }
    return attachment
}


