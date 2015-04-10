// server/smtp.js
Meteor.startup(function () {
	smtp = {
    	email: 'cracuna2@gmail.com',   // eg: yourname@email.com
    	password: 'your_password',   // eg: izk5eziohfervU
    	server:   'smtp.gmail.com',  // eg: mail.email.net
    	port: 25
  	}


  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.email) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port; 
 //process.env.MAIL_URL = 'smtp://your_username:your_password@smtp.gmail.com:25';

// By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for help with their account, be sure to set this to an email address that you can receive email at.
  Accounts.emailTemplates.from = 'GraviTeam <cracuna2@gmail.com>';

  // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
  Accounts.emailTemplates.siteName = 'GraviTeam';

  Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('reset-password/' + token);
  };

  // A Function that takes a user object and returns a String for the subject line of the email.
  Accounts.emailTemplates.resetPassword.subject = function(user) {
    return 'Change Password Request';
  };

});