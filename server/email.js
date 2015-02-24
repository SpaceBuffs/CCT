Meteor.methods({
	//sendEmail: function(to, from, subject, text){
	//	check([to, from, subject, text], [String]);
	'forgotPasswordEmail': function (email, userId, subject, text, callback) {
		check([email, userId, subject, text], [String]);
		var email = this.email;
		var userId = this.userId;
		Accounts.sendResetPasswordEmail(userId, email)
		if (typeof callback !== 'undefined'){
			callback();
		}

/*
 		Email.send({
                to: 'email',
                from: "graviteam@github.com",
                //replyTo: fromEmail||undefined,
                subject: "GraviTeam has sent a message!",
                text: "Hello " +this.userId+", You are awesome.\n"+Meteor.absoluteUrl()+"\n",
			});
		}*/
	}
});