const passport = require('passport');
const jwt = require('jsonwebtoken');
const {Strategy} = require('passport-jwt');
const jwtModule = require('./../../Modules/JwtModule');
const models = require('../../Models');
const User = models.User;

module.exports = {
    getOptions: () => {
        return {
            jwtFromRequest: jwtModule.extractJwtFromRequest,
            secretOrKey: process.env.JWT_ENCRYPTION
        };
    },
    getStrategy: (options) => {
     return new Strategy(options, (payload, done) => {
            User.findOne({
                where : models.sequelize.and(
                    {id: payload.id},
                    {status: 1},
                )
            }).then(user => {
                if(user){
                    return done(null, {
                        id: user.id,
                        name: user.username,
                        email: user.email,
                        role: user.roles,
                        preferredLanguage: user.preferredLanguage
                    });
                }
                return done("Authentication Required", false);
            }).catch(err => {
                console.error(err);
                return done(new Error("Uncaught Error! Try again later..."), null);
            });
        });
    }
}