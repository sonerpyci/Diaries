const passport = require('passport');
const jwt = require('jsonwebtoken');
const {Strategy} = require('passport-jwt');
const jwtModule = require('./../../Modules/JwtModule');
const models = require('../../Models');
const User = models.User;

module.exports = {
    getOptions: () => {
        return {
            jwtFromRequest: jwtModule.ExtractJwtFromRequest,
            secretOrKey: process.env.JWT_ENCRYPTION
        };
    },
    getStrategy: (options) => {
     return new Strategy(options, (payload, done) => {
            User.findOne({
                where : models.sequelize.and(
                    {Id: payload.Id},
                    {status: 1},
                ),
                include: [
                    {
                        model: models.Role,
                        as: 'Role',
                        required: true,
                    },
                    {
                        model: models.Language,
                        as: 'Language',
                        required: true,
                    }
                ]
            }).then(user => {
                if(user){
                    return done(null, {
                        Id: user.Id,
                        Username: user.Username,
                        Email: user.Email,
                        Role: user.Role,
                        Language: user.Language
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