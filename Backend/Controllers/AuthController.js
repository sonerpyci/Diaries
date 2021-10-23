const Service = require('../Services/Database/Authentication');
const JwtUtil = require('../Utils/JsonWebToken/JWTUtils');
const LanguageUtils = require('../Utils/Language/LangUtils');

const cookieConfig = {
    httpOnly: true
    /*expires: 6000,
    sameSite: true,
    signed: true,
    secure: true*/
};

module.exports = {
    getTableName: () => {
        return Service.UTILITY.getTableName()
    },
    Signup: (req, res, next) => {
        Service.UTILITY.ValidateEntry(req.body)
        .then((isValid) => {
            if (isValid) {
                Service.DATABASE_ENGINE.CheckUserExists(req.body)
                .then((ifUserExists) => {
                    if (ifUserExists) {
                        let response = {status: 400, content: {success:false, message:"ERR_USER_ALREADY_EXISTS"}};
                        res.status(response.status).json(response.content);
                    }  else {
                        Service.DATABASE_ENGINE.CreateUser(req.body)
                        .then((user) => {
                            let response = {status: 201, content: {success:true, user:user}};
                            res.status(response.status).json(response.content);
                        }).catch((err) => {
                            let response = {status: 500, content: {success:false, message:err.message}};
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
    },
    Login: (req, res, next) => {
        Service.UTILITY.ValidateEntry(req.body)
        .then((isValid) => {
            if (isValid) {
                Service.DATABASE_ENGINE.GetUserForLogin(req.body, true)
                .then((user) => {
                    if (user && Service.UTILITY.ValidatePassword(user.Password, req.body.Password)) {
                        let payload = {
                            Id: user.Id,
                            Username: user.Username,
                            Role: user.Role,
                            Language: user.Language
                        }
                        /*jwt.sign(payload, process.env.JWT_ENCRYPTION, {
                            expiresIn: process.env.JWT_EXPIRATION
                        }, (err, token) => {
                            if (err) {
                                let response = {status: 500, content: {success:true, message:err.message}};
                                res.status(response.status).json(response.content);
                            }

                        })*/
                        JwtUtil.CreateSign(payload).then(jwtSign => {
                            if (jwtSign.success) {
                                //res.cookie('_sid', jwtSign.token, cookieConfig);
                                let response = {status: 200, content: {success: true,token: jwtSign.token}};
                                res.cookie('_sid', jwtSign.token, cookieConfig).status(response.status).json(response.content);
                            } else {
                                let response = {status: 400, content: {success:false, message:"ERR_LOGIN_USER"}};
                                res.status(response.status).json(response.content);
                            }
                        }).catch(err => {
                            let response = {status: 500, content: {success:false, message:err.message}};
                        })

                    }  else {
                        let response = {status: 400, content: {success:true, message:"ERR_USER_NOT_EXIST_OR_WRONG_CREDENTIALS"}};
                        res.status(response.status).json(response.content);
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
    },
    Logout : (req, res, next) => {
        let langParam = "TR"
        if (req.user && req.user.Language)
            langParam = req.user.Language.Shortcut.toUpperCase()

        let response = {status: 200, content: {success:true, message:LanguageUtils.info_messages["003"][langParam]}};
        return res.status(response.status).clearCookie('_sid').json(response.content)
    }
};