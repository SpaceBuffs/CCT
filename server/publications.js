//Publisher
/*

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

Meteor.publish(null, function() {
    if(this.userID) {
        return Meteor.users.find({_id: this.userID},
                                 {fields: {'isAdmin':1}});
    }
});

Meteor.publish(null, function() {
    if(this.userID) {
        return Meteor.users.find({_id: this.userID},
                                {fields: {'missions':1}});
    }
});

Meteor.publish(null, function() {
    if(this.userID) {
        return Meteor.users.find({_id: this.userID},
                                {fields: {'name':1}});
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