//chat
//chat
/**
* Templates
*/


/*
Template.messages.helpers({
	messages: function() {
	return Messages.find({}, { sort: { time: -1}});
	}
})

Template.input.events = {
	'keydown input#message' : function (event) {
		if (event.which == 13) { // 13 is the enter key event
			if (Meteor.user())
				var name = Meteor.user().profile.name;
			else
				var name = 'Anonymous';
			var message = document.getElementById('message');
			if (message.value != '') {
				Messages.insert({
					name: name,
					message: message.value,
					time: Date.now(),
			});

			document.getElementById('message').value = '';
			message.value = '';
			}
		}
	}
}
* */

/*
 Template.chatMessage.helpers({
    username: function() {return Meteor.user().username}
	});
    * 
GraviTeam.chatMessage = {
  create : function(chatMessage){
    ChatModel.insert({
	"chatMessage" : chatMessage,
	"createdAt:" : createdAt,
    "user_name" : Meteor.user().username
        });
  },
  delete : function(chatMessage){
	ChatModel.remove({"_id" : chatMessage});
  }
}*/

Template.chat.events({
	"submit .new-chatMessage": function(event){
	var chatMessage = event.target.chatMessage.value;
	
	ChatModel.insert({
		chatMessage: chatMessage,
		createdAt : new Date(),
        user_name : Meteor.user().username
        });

       //refresh form if submit is successful
       event.target.chatMessage.value = "";

       //alert("Chat pushed!");
       return false;
  }});
