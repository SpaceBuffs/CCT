//Publisher
/*

*/

"use strict"

Meteor.publish('ActivitiesModel', function () {
   return ActivitiesModel.find({},{
   	limit: 4
   	//sort: {timeCreated: -1}
   }); 
}); 
Meteor.publish('ChatModel', function () {
   return ChatModel.find({}); 
}); 

Meteor.publish('users', function () {
    // profile is automatically published for 
    // logged-in user only so need to publish 
    // that too
    return Meteor.users.find({},{
      fields:{
        emails:1,
        //profile:1,
        roles:1
      },
      sort:{
        //"profile.name":1
      }
    })
  })

