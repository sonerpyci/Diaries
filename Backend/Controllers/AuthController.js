const Service = require('../Services/Database/Authentication');

module.exports = {
    getTableName: () => {
        return Service.UTILITY.getTableName()
    },
    signup: (req, res, next) => {
        Service.UTILITY.ValidateEntry(req.body)
        .then((isValid) => {
            if (isValid) {
                Service.DATABASE_ENGINE.checkUserExists(req.body)
                .then((ifUserExists) => {
                    if (ifUserExists) {
                        let response = {status: 400, content: {success:false, message:"ERR_USER_ALREADY_EXISTS"}};
                        res.status(response.status).json(response.content);
                    }  else {
                        Service.DATABASE_ENGINE.createUser(req.body)
                        .then((user) => {
                            let response = {status: 201, content: {success:true, user:user}};
                            res.status(response.status).json(response.content);
                        }).catch((err) => {
                            let response = {status: 500, content: {success:true, message:err.message}};
                            res.status(response.status).json(response.content);
                        })
                    }
                }).catch((err) => {
                    let response = {status: 400, content: {success:false, message:err.message}};
                    return res.status(response.status).json(response.content)
                })
            } else {
                let response = {status: 400, content: {success:false, message:"ERR_USER_INVALID_INPUT"}};
                res.status(response.status).json(response.content);
            }
        }).catch((err) => {
            let response = {status: 500, content: {success:false, message:err.message}};
            return res.status(response.status).json(response.content)
        })
    }
};