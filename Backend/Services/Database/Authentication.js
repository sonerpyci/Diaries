const models = require('../../Models');
const User = models.User;

module.exports = {
    UTILITY : {
        getTableName: () => {
            return User.tableName;
        },
        ValidateEntry: async (entry) => {
            return await User.ValidateCustom(entry);
        }
    },
    DATABASE_ENGINE : {
        checkUserExists: async (requestBody) => {
            try {
                return (await User.findOne({
                    where: {
                        [models.Sequelize.Op.or]:
                            [
                                requestBody.id ? {id: requestBody.id} : {},
                                requestBody.email ? {email: requestBody.email} : {},
                                requestBody.username ? {username: requestBody.username} : {},
                                requestBody.phone1 ? {phone1: requestBody.phone1} : {},
                            ]
                    }
                }) !== null)
            } catch (e) {
                console.log(`ERR -> Service.Authentication.DATABASE_ENGINE.checkUserExists() : ${e}`);
                throw e;
            }


        },
        getUserByWhere: async (whereOpts, limit=null, offset=null) => {
            try {
                return await User.findOne({whereOpts});
            }
            catch (e) {
                console.log(`ERR -> Service.Authentication.DATABASE_ENGINE.getUserByWhere() : ${e}`);
                throw e;
            }

        },
        createUser: async (requestBody) => {
            try {
                return await User.create({
                    firstName: requestBody.firstName,
                    middleName: requestBody.middleName,
                    lastName: requestBody.lastName,
                    username: requestBody.username,
                    password: requestBody.password,
                    email: requestBody.email,
                    phone1: requestBody.phone1,
                    phone2: requestBody.phone2,
                    address: requestBody.address,
                    district: requestBody.district,
                    province: requestBody.province,
                    postalCode: requestBody.postalCode,
                    avatar: requestBody.avatar,
                    status: requestBody.status,
                    roleId: 2 // non-admin user default
                });
            } catch (e) {
                console.log(`ERR -> Service.Authentication.DATABASE_ENGINE.createUser() : ${e}`);
                throw e;
            }
        }
    }

};