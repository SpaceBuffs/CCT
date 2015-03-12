//chat
/**
* Templates
*/

Template.chat.events({
	"submit .new-chatMessage": function(event){
	var chatMessage = event.target.chatMessage.value;
	
	ChatModel.insert({
		chatMessage : chatMessage,
		createdAt : new Date(),
                user_name : Meteor.user().username
        });

       //refresh form if submit is successful
       event.target.chatMessage.value = "";

       return false;
}});


