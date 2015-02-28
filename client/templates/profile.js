Template.profile.helpers({
    username: function() {return Meteor.user().username},
    email: function() {return Meteor.user().emails[0].address}
});


/*
GraviTeam.profile = {
    create : function(username, email, missions){
        ProfileModel.insert({
                               "user": username,
                               "email" : email,
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

