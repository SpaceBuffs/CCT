//Publisher
/*
Before it can display the data from our collection in the browser,
it have to retrieve the data that user want on the server, then “publish” it so 
it can be accessed by the browser. 
*/
Meteor.publish('ActivitiesModel', function () {
   return ActivitiesModel.find({},{
   	//limit: 4
   	//sort: {timeCreated: -1}
   }); 
}); 

Meteor.publish('ChatModel', function () {
   return ChatModel.find({}); 
}); 

Meteor.publish('SessionsModel', function () {
   return SessionsModel.find({}); 
}); 
Meteor.publish('userData', function () {
  return Meteor.users.find({fields: {'profile.Name':1, 'profile.missions':1, 'profile.isAdmin':1}});
});

Meteor.users.allow({
    update: function(userId, doc){
        return doc._id === userId; // can update their own profile
    }
});

