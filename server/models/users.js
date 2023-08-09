module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isModerator: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }, { timestamps: false });
    users.associate = function (models) {
        users.hasMany(models.posts, {
            foreignKey: 'userId',
            as: 'Posts',
        });
        users.hasMany(models.suggestions, {
            foreignKey: 'userId',
            as: 'UserSuggestions',
        })
    };
    return users;
}



