Meteor.methods({
	//sendEmail: function(to, from, subject, text){
	//	check([to, from, subject, text], [String]);
	sendEmail: function (email, userId, subject, text) {
		check([email, userId, subject, text], [String]);
		var email = this.email;
		Accounts.sendResetPasswordEmail(userId, email)
 	}

 	/*Email.send({
                to: 'email',
                from: "graviteam@github.com",
                //replyTo: fromEmail||undefined,
                subject: "GraviTeam Member: "+this.userId+" has requested a password change!",
                text: "Hello " +this.userId+", You are trying to reset you password.\n"+Meteor.absoluteUrl()+"\n",
	}); */
});