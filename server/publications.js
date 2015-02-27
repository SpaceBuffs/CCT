//Publisher
/*

*/
Meteor.publish('ActivitiesModel', function () {
   return ActivitiesModel.find({},{
   	limit: 4
   	//sort: {timeCreated: -1}
   }); 
}); 
Meteor.publish('ChatModel', function () {
   return ChatModel.find({}); 
}); 
