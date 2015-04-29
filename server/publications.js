/*
 Collaborative Campaign Tool
 GRAVITEAM by SPACEBUFFS
 
 Chris Acuna, Heather Dykstra, Sierra Flynn, Semere Ghebrecristos, Hope Sanford, Josh Weaver
 
 publications.js is used to retrieve data that the user wants on teh server, and then publishit
 to be accessed by the browser.
 
 Version 4.0
 4/28/2015
 
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

