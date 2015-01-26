// server/smtp.js
Meteor.startup(function () {
    process.env.MAIL_URL = 'smtp://your_username:your_password@smtp.gmail.com:25';
});