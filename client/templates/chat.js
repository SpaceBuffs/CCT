//chat
/**
* Templates
*/
/*
if (Meteor.isClient) {
	Template.chat.events({
		"submit .new-chatMessage": function(event){
		var chatMessage = event.target.chatMessage.value;
		var date = new Date();
		//var session = SessionsModel.find({},{sort:{"sec": -1}, limit: 1});

		var current_session = 0;
		var session_time = new Date();
		//this doesn't work?!***
		SessionsModel.find({}).forEach(function(myDocument) {
		    alert("found one!");
		    if (myDocument.sec > current_session) { 
			current_session = myDocument.sec; 
			session_time = myDocument.createdAt;
		    };
		});

		alert("session time for this message: "+session_time);
		ChatModel.insert({
			chatMessage : chatMessage,
			createdAtTime : date.toLocaleTimeString(),
			createdAtDate : date.toLocaleDateString(),
			user_name : Meteor.user().username, //**or name?
			//set session to the most recently created session in the DB
			session : session_time
		});
	       //refresh form if submit is successful
	       event.target.chatMessage.value = "";

	       return false;
	}});
};
*/
