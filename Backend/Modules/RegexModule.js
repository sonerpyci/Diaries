const googlePhoneNumberUtil = require('libphonenumber-js');
//import parsePhoneNumber from 'libphonenumber-js';

module.exports = {

    doesNotContainsAnySpecialChar : (value) => {
        return /^[a-zA-Z]+$/g.test(value);
    },
    checkLengthAtLeast: (value, length) => {
        let regex = new RegExp(`^.{${length},}$`, "g");
        return regex.test(value);
    },
    hasAnyWhiteSpaces: (value) => {
        return /\s/g.test(value);
    },
    isEmail: (value) => {
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    },
    isValidPhoneNumber: (phonePrefix, phoneNumber) => {
        try {
            //let phoneNumber = parsePhoneNumber(phoneNumber, phonePrefix);
            let phoneNumber = googlePhoneNumberUtil.parsePhoneNumber(phoneNumber, phonePrefix);
            if (phoneNumber) {
                return  phoneNumber.country === phonePrefix &&
                        phoneNumber.isValid() === true &&
                        phoneNumber.getType() === 'mobile';
            }
            return false;
        } catch (err) {
            console.log(err);
            return false;
        }
    }





}