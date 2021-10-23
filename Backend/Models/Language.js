const models = require(".")
module.exports = (sequelize, DataTypes) => {
    const Language = sequelize.define('Language', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull : false,
            field: 'Name',
            validate: {
                notEmpty : {msg: 'Language Name cannot be empty.'}
            }
        },
        Shortcut: {
            type: DataTypes.STRING,
            allowNull : false,
            field: 'Shortcut',
            validate: {
                notEmpty : {msg: 'Language Shortcut cannot be empty.'}
            }
        },
        PhonePrefix: {
            type: DataTypes.STRING,
            allowNull : false,
            field: 'PhonePrefix',
            validate: {
                notEmpty : {msg: 'Language PhonePrefix cannot be empty.'}
            }
        },
        Status: {
            type: DataTypes.INTEGER,
            field: 'Status',
            defaultValue: 1
        }
    },{
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        tableName: 'Languages',
    });

    Language.associate = function (models) {
        Language.hasMany(models.User, {
            foreignKey: 'LanguageId',
        });
    };
    return Language;
}