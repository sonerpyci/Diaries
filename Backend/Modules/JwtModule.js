module.exports = {
    ExtractJwtFromRequest : (req) => {
        let token = null;
        if (req && (req.cookies || req.headers)){
            if (req.cookies['_sid']) {
                token = req.cookies['_sid'];
            } else if (req.headers.authorization) {
                let parts = req.headers.authorization.split(' ');
                if (parts.length === 2) {
                    let scheme = parts[0],
                        credentials = parts[1];

                    if (/^Bearer$/i.test(scheme)) {
                        token = credentials;
                    }
                }
            }
            return token
        } else {
            return null
        }
    }

};
