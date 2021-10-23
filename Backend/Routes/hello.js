const router = require('express').Router();

const Controller = require('../Controllers/HelloController');

/**
 * Tihs route will greet you!
 * @route GET /hello
 * @group Hello - Greets to World
 * @returns {object} 200 - {success:true, message:"Hello World!"}
 * @returns {Error}  default - Unexpected error
 */
router.get('/', Controller.helloWorld);

module.exports = router;