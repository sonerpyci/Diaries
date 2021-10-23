const JsonWebToken = require('jsonwebtoken');

module.exports = {
    CreateSign : async (payload) => {
        try {
            let err, token = await JsonWebToken.sign(payload, process.env.JWT_ENCRYPTION, {
                expiresIn: process.env.JWT_EXPIRATION
            })
            if (err) {
                return {success:false, message:err.message}
            }
            return {success:true, token:token}
        } catch (err) {
            return {success:false, err}
        }

    }



}