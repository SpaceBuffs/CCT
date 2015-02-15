// server/smtp.js
Meteor.startup(function () {
	/* smtp = {
    	email: 'your_email',   // eg: server@gentlenode.com
    	password: 'your_password',   // eg: 3eeP1gtizk5eziohfervU
    	server:   'smtp.gmail.com',  // eg: mail.gandi.net
    	port: 25
  	}

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port; */
  process.env.MAIL_URL = 'smtp://your_username:your_password@smtp.gmail.com:25';
});