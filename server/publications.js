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