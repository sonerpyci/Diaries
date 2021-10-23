const router = require('express').Router();
const Controller = require('../Controllers/AuthController');
const authenticator = require('../Middlewares/Authenticator');

let tableName = Controller.getTableName();

/**
 * Signup User Route.
 * @route Post auth/signup
 * @group Auth - Signup Endpoint
 * @param {string} FirstName.body.required - user's FirstName.
 * @param {string} MiddleName.body - user's MiddleName if exists.
 * @param {string} LastName.body.required - user's LastName.
 * @param {string} Username.body.required - user's Username.
 * @param {string} Password.body.required - user's Password.
 * @param {string} Email.body.required - user's Email.- eg: john@doe.com
 * @param {string} Phone.body.required - user's Phone.
 * @param {string} District.body - user's District.
 * @param {string} Province.body - user's Province.
 * @param {string} Country.body - user's Country.
 * @returns {object} 200 - {success:true, user:"{user}"}
 * @returns {Error}  default - Unexpected error
 */
router.post('/signup', Controller.Signup);

/**
 * Login User Route.
 * @route Post auth/login
 * @group Auth - Login Endpoint
 * @returns {object} 200 - {success:true, token:"{token}"}
 * @returns {Error}  default - Unexpected error
 */
router.post('/login', Controller.Login);
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
