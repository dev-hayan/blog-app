const { validateEmail } = require("../utils/helper");
const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {

    const users = sequelize.define("users", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isLowercase: true,
            validate: {
                isEmail: true,
                customEmailValidator(value) {
                    validateEmail(value)
                },
            },
            set(value) {
                this.setDataValue('email', value.trim());
            },
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            max: 3,
            min: 20,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            max: 3,
            min: 20,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            max: 8,
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
    }, {
        timestamps: false,
        hooks: {
            beforeCreate: async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    const hashedPassword = await bcrypt.hash(user.password, 10);
                    user.password = hashedPassword;
                }
            },
        }
    });
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


