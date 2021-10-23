const models = require(".")
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
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
                notEmpty : {msg: 'Role Name cannot be empty.'}
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
        tableName: 'Roles',
    });

    Role.associate = function (models) {
        Role.hasMany(models.User, {
            foreignKey: 'RoleId',
        });
    };
    return Role;
}