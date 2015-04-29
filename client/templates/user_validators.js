/*
 
Collaborative Campaign Tool
GRAVITEAM by SPACEBUFFS

Chris Acuna, Heather Dykstra, Sierra Flynn, Semere Ghebrecristos, Hope Sanford, Josh Weaver

user_validators handles errors and checks for email and password validity.

Version 4.0
4/28/2015

*/

trimInput = function(value) {
    return value.replace(/^\s*|\s*$/g, '');
};

isNotEmpty = function(value) {
    if (value && value !== ''){
        return true;
    }
    Session.set('alert', 'Please fill in all required fields.');
    return false;
};

isEmail = function(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        return true;
    }
    Session.set('alert', 'Please enter a valid email address.');
    return false;
};

isValidPassword = function(password) {
    if (password.length < 6) {
        Session.set('alert', 'Your password should be more than 6 characters.');
        return false;
    }
    return true;
};

areValidPasswords = function(password, confirm) {
    if (!isValidPassword(password)) {
        return false;
    }
    if (password !== confirm) {
        Session.set('alert', 'Confirm your password.');
        return false;
    }
    return true;
};

