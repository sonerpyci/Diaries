const router = require('express').Router();
const Controller = require('../Controllers/AuthController');
const authenticator = require('../Middlewares/Authenticator');

let tableName = Controller.getTableName();

router.post('/signup', Controller.signup);
//router.post('/login', Controller.loginUser);
//router.get('/logout', Controller.logoutUser);

/*
*  TODO: AUTHORIZATION MIDDLEWARE
* router.get('/preventUsers', authenticator.authenticate, userController.preventUsers);
* router.get('/allowUsers', authenticator.authenticate,  userController.allowUsers);
*
*/
// TODO: POSSIBLE SOCKET & UTILITY ENDPOINTS TO EASE OF MANAGE ACCOUNTS
//router.get('/extend', authenticator.authenticate, userController.extendTokenExpiration);
//router.post('/recovery', userController.recovery);
//router.get('/checkRecoveryCode/:recoveryCode', userController.checkRecoveryCode);
//router.post('/resetPassword', userController.resetPassword);

module.exports = router;
