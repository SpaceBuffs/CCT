Template.profile.helpers({
    username: function() {return Meteor.user().username},
    email: function() {return Meteor.user().emails[0].address},
    accountType: function() {return Meteor.users.find({}, {fields: {'accountType':1}})},
    missions: function() {return Meteor.users.find({}, {fields: {'missions':1}})}
        
});

//Meteor.users.insert({ accountType: "scientist"};

/*
Meteor.users = {
    create : function(missions, accountType){
        users.insert({
                               "accountType": accountType,
                               "missions": missions,
                               });
    },
 
    new_date : function(user_id, new_username){
        ProfileModel.update({"_id" : user_id},
                               {$set : { "username" : new_username }});
    },
    new_duration : function(user_id, new_email){
        ProfileModel.update({"_id" : user_id},
                               {$set : { "email" : new_email }});
    },
    new_duration : function(user_id, new_mission){
        ProfileModel.update({"_id" : user_id},
                            {$set : { "missions" : new_misssions }});
    }
}
*/

