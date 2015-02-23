Meteor.methods({
	//sendEmail: function(to, from, subject, text){
	//	check([to, from, subject, text], [String]);
	'sendMessage': function (toId, msg) {
    	if (Meteor.isServer)
  		sendMessage(this.userId, toId, msg);
 	}
});