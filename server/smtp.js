// server/smtp.js
Meteor.startup(function () {
	smtp = {
    	email: 'cracuna2@gmail.com',   // eg: yourname@email.com
    	password: '69592onixz2',   // eg: izk5eziohfervU
    	server:   'smtp.gmail.com',  // eg: mail.email.net
    	port: 25
  	}

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.email) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port; 
  //process.env.MAIL_URL = 'smtp://your_username:your_password@smtp.gmail.com:25';
});