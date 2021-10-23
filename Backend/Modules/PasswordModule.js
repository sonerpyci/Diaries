const crypto = require("crypto");

module.exports = {
    scrypt: (humanReadablePassword) => {
        return crypto.scryptSync(humanReadablePassword, process.env.CRYPTO_SALT, 64).toString('hex');
    },
    generatePassword: (passwordLength = 8, useUpperCase = true, useNumbers = true, useSpecialChars = true) => {
        let chars = 'abcdefghijklmnopqrstuvwxyz';
        let numbers = '0123456789';
        let specialChars = '!"£$%^&*()';
        let usableChars = chars
            + (useUpperCase ? chars.toUpperCase() : '')
            + (useNumbers ? numbers : '')
            + (useSpecialChars ? specialChars : '');

        let generatedPassword = '';

        for(let i = 0; i <= passwordLength; i++) {
            generatedPassword += usableChars[Math.floor(Math.random() * (usableChars.length))]
        }
        return generatedPassword;
    }



};