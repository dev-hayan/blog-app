const { validateEmail } = require("../utils/emailValidator");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require("dotenv").config()


module.exports = (sequelize, DataTypes) => {

    const user = sequelize.define("user", {
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
        },
        isEmailConfirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        loginAttempts: { type: DataTypes.INTEGER, defaultValue: 0 },
        disableLoginUntil: {
            type: DataTypes.DATE,
        },

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
    user.associate = function (models) {
        user.hasMany(models.post, {
            foreignKey: 'userId',
            as: 'Posts',
            onDelete: 'CASCADE',
            onUpdate: "CASCADE"
        });
        user.hasMany(models.suggestion, {
            foreignKey: 'userId',
            as: 'UserSuggestions',
            onDelete: 'CASCADE',
            onUpdate: "CASCADE"

        });
        user.hasMany(models.comment, {
            foreignKey: 'userId',
            as: 'Comments',
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        })
        user.hasMany(models.userLike, {
            foreignKey: 'userId',
            onDelete: "CASCADE",
        })
        user.hasMany(models.userReport, {
            foreignKey: 'userId',
            onDelete: "CASCADE"
        })
    };

    user.prototype.genAuthToken = function () {
        const token = jwt.sign(
            { _id: this.id, name: this.firstName, lastName: this.lastName, email: this.email, isAdmin: this.isAdmin, isModerator: this.isModerator },
            process.env.JWT_PRIVATE_KEY
        );
        return token;
    }
    return user;
}



