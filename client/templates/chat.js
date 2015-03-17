//chat
/**
* Templates
*/


Template.chat.events({
	"submit .new-chatMessage": function(event){
	var chatMessage = event.target.chatMessage.value;
	var date = new Date();
        
	ChatModel.insert({
		chatMessage : chatMessage,
		createdAtTime : date.toLocaleTimeString(),
                createdAtDate : date.toLocaleDateString(),
                user_name : Meteor.user().username
        });

       //refresh form if submit is successful
       event.target.chatMessage.value = "";

       return false;
}});


