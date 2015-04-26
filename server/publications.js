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

/*
Meteor.publish('userData', function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'profile.Name':1, 'profile.missions':1, 'profile.isAdmin':1}});
});

*/
/*
Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'other': 1, 'things': 1}});
  } else {
    this.ready();
  }
});
*/
Meteor.users.allow({
    update: function(userId, doc){
        return doc._id === userId; // can update their own profile
    }
});
//-----TESTING ROLES STUFF-------

/*Meteor.publish(null, function (){ 
  return Meteor.roles.find({_id: this.user()})
})

// userIsInRole(user, roles, [group]) { };

// Check user roles before publishing sensitive data:
Meteor.publish('secrets', function (name) {
  if (Roles.userIsInRole(this.userId, 'Chris')) {
    return Meteor.secrets.find({name: name});
  } else {
    // user not authorized. do not publish.
    this.stop();
    return;
  }
});

// Prevent non-authorized users from creating new users:
Accounts.validateNewUser(function (user) {
  var loggedInUser = Meteor.user();

  if (Roles.userIsInRole(loggedInUser, 'Chris')) {
    return true;
  }

  throw new Meteor.Error(403, "Not authorized to create new users");
  });
*/
//---------TESTING ROLES STUFF END---------------
