const regexModule = require("../Modules/RegexModule");
const passwordModule = require("../Modules/PasswordModule");
//const converter = require("../Modules/turkishToEnglish")
const models = require(".");
const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        FirstName: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'FirstName',
            validate: {
                notEmpty: {msg: 'User firstName cannot be empty.'}
            }
        },
        MiddleName: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'MiddleName',
            validate: {
                notEmpty: {msg: 'User middleName cannot be empty.'}
            }
        },
        LastName: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'LastName',
            validate: {
                notEmpty: {msg: 'User lastName cannot be empty.'}
            }
        },
        Username: {
            type: DataTypes.STRING,
            field: 'Username'
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Password',
            validate: {
                notEmpty: {msg: 'User Password cannot be empty.'},
            }
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            field: 'Email'
        },
        Phone: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Phone',
            validate: {
                notEmpty: {msg: 'User Phone cannot be empty.'},
            }
        },
        District: {
            type: DataTypes.INTEGER,
            field: 'District',
            allowNull: true
        },
        Province: {
            type: DataTypes.INTEGER,
            field: 'Province',
            allowNull: true
        },
        Country: {
            type: DataTypes.INTEGER,
            field: 'Country',
            allowNull: true
        },
        PreferredLanguage: {
            type: DataTypes.INTEGER,
            field: 'PreferredLanguage',
            defaultValue: 1,
            allowNull: false
        },
        Status: {
            type: DataTypes.INTEGER,
            field: 'Status',
            allowNull: true,
            defaultValue: 1
        },
        LastLogin: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'LastLogin'
        },
        RegisteredAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'RegisteredAt',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        RoleId: {
            field: 'RoleId',
            type: DataTypes.INTEGER
        },
        LanguageId: {
            field: 'LanguageId',
            type: DataTypes.INTEGER
        },
        RecoveryCode: {
            type: DataTypes.STRING,
            field: "RecoveryCode",
            allowNull: true,
            defaultValue: null
        }
    }, {
        hooks: {
            beforeCreate: async (user) => {
                try {
                    user.password = await passwordModule.scrypt(user.password);
                } catch (err) {
                    console.log(err.message);
                    throw {message: 'Encryption Error.'};
                }
            }
        },
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        tableName: 'Users',
        indexes: [
            {unique:true, fields:['Email']},
            {unique:true, fields:['Phone']},
            {unique:true, fields:['Username']}
        ]
    });
    User.associate = function (models) {
        User.belongsTo(models.Role, {
            foreignKey: 'RoleId',
            targetKey: 'Id'
        });
        User.belongsTo(models.Language, {
            foreignKey: 'LanguageId',
            targetKey: 'Id'
        });
    };

    User.ValidateCustom = async (user) => {
                // firstName Validation
        return  true;/*regexModule.checkLengthAtLeast(user.firstName, 2) &&
                regexModule.doesNotContainsAnySpecialChar(user.firstName) &&
                // lastName Validation
                regexModule.checkLengthAtLeast(user.lastName, 2) &&
                regexModule.doesNotContainsAnySpecialChar(user.lastName) &&
                // middleName Validation if exists else pass true
                (user.middleName ? regexModule.doesNotContainsAnySpecialChar(user.middleName) : true) &&
                regexModule.checkLengthAtLeast(user.password, 8) &&
                regexModule.hasAnyWhiteSpaces(user.password) &&
                // email Validation
                regexModule.isEmail(user.email) //&&
                // phoneNumber verification
                //regexModule.isValidPhoneNumber(user.phonePrefix, user.phoneNumber)*/
    };
    return User;
};